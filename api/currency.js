export const config = {
    runtime: 'edge',
};

export default async function handler(request) {
    // Handle CORS for OPTIONS request
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
        const pair = url.searchParams.get('pair');
        const days = url.searchParams.get('days');

        if (!pair || !days) {
            return new Response(
                JSON.stringify({ error: 'Missing pair or days parameter' }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                }
            );
        }

        console.log(`[Edge] Fetching: https://economia.awesomeapi.com.br/json/daily/${pair}/${days}`);

        const awesomeApiResponse = await fetch(`https://economia.awesomeapi.com.br/json/daily/${pair}/${days}`, {
            headers: {
                // Use a standard generic Chrome User-Agent to avoid blocking
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json'
            }
        });

        if (!awesomeApiResponse.ok) {
            const errorText = await awesomeApiResponse.text();
            throw new Error(`Upstream API error: ${awesomeApiResponse.status} ${awesomeApiResponse.statusText} - ${errorText.substring(0, 100)}`);
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

    } catch (error) {
        console.error('[Edge] Proxy error:', error);
        return new Response(
            JSON.stringify({
                error: 'Failed to fetch data',
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
