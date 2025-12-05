export const config = {
    runtime: 'edge',
};

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function getPastDate(days) {
    const date = new Date();
    date.setDate(date.getDate() - parseInt(days));
    return formatDate(date);
}

export default async function handler(request) {
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        });
    }

    try {
        const url = new URL(request.url);
        const pair = url.searchParams.get('pair'); // e.g., 'USD-BRL'
        let days = url.searchParams.get('days');

        if (!pair || !days) {
            return new Response(
                JSON.stringify({ error: 'Missing pair or days parameter' }),
                { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
            );
        }

        // Ensure days is a valid integer
        days = parseInt(days, 10);
        if (isNaN(days) || days <= 0) days = 30; // Default fallback

        const [from, to] = pair.split('-');

        console.log(`[Edge] Primary Fetch: https://economia.awesomeapi.com.br/json/daily/${pair}/${days}`);

        try {
            const awesomeApiResponse = await fetch(`https://economia.awesomeapi.com.br/json/daily/${pair}/${days}`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'application/json'
                }
            });

            if (!awesomeApiResponse.ok) {
                const errText = await awesomeApiResponse.text();
                throw new Error(`Status ${awesomeApiResponse.status}: ${errText}`);
            }

            const data = await awesomeApiResponse.json();
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 's-maxage=3600, stale-while-revalidate',
                },
            });

        } catch (primaryError) {
            console.warn(`[Edge] Primary API failed. Switching to Fallback (Frankfurter). Error: ${primaryError.message}`);

            try {
                // Fallback: Frankfurter API
                const startDate = getPastDate(days);
                const endDate = formatDate(new Date()); // today
                const fallbackUrl = `https://api.frankfurter.app/${startDate}..${endDate}?from=${from}&to=${to}`;

                console.log(`[Edge] Fallback Fetch: ${fallbackUrl}`);

                const fallbackRes = await fetch(fallbackUrl, {
                    headers: { 'User-Agent': 'FinZap/1.0' }
                });

                if (!fallbackRes.ok) {
                    throw new Error(`Fallback API also failed: ${fallbackRes.status} ${fallbackRes.statusText}`);
                }

                const fallbackData = await fallbackRes.json();

                const rates = fallbackData.rates || {};
                const transformedData = Object.entries(rates).map(([dateStr, rateObj]) => {
                    const val = rateObj[to];

                    if (val === undefined || val === null) return null;

                    // Create a timestamp at noon UTC for that day
                    const timestamp = Math.floor(new Date(dateStr).getTime() / 1000).toString();
                    return {
                        bid: val.toString(),
                        ask: val.toString(),
                        timestamp: timestamp,
                        high: val.toString(),
                        low: val.toString(),
                        name: `${from}/${to}`,
                        code: from,
                        codein: to
                    };
                }).filter(item => item !== null);

                transformedData.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));

                return new Response(JSON.stringify(transformedData), {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
                    },
                });
            } catch (fallbackError) {
                console.error(`[Edge] Fallback failed too: ${fallbackError.message}`);
                throw fallbackError; // Re-throw to be caught by outer catch
            }
        }

    } catch (error) {
        console.error('[Edge] All providers failed:', error);
        return new Response(
            JSON.stringify({
                error: 'Failed to fetch data from all providers',
                details: error.message,
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }
        );
    }
}
