import fetch from 'node-fetch';

export const config = {
    runtime: 'nodejs',
};

export default async function handler(request, response) {
    // Set CORS headers early
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (request.method === 'OPTIONS') {
        return response.status(200).end();
    }

    try {
        // Safe query parsing
        const query = request.query || {};
        let { pair, days } = query;

        if (!pair || !days) {
            const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
            if (!pair) pair = url.searchParams.get('pair');
            if (!days) days = url.searchParams.get('days');
        }

        if (!pair || !days) {
            return response.status(400).json({ error: 'Missing pair or days parameter' });
        }

        // Add 1 to days as per initial requirement usually saw in previous convos or just to be safe?
        // No, user request was "pair=USD-BRL&days=30".

        console.log(`Fetching: https://economia.awesomeapi.com.br/json/daily/${pair}/${days}`);

        const awesomeApiResponse = await fetch(`https://economia.awesomeapi.com.br/json/daily/${pair}/${days}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; FinZapBot/1.0; +https://www.junny.com.br)'
            }
        });

        if (!awesomeApiResponse.ok) {
            const errorText = await awesomeApiResponse.text();
            console.error(`Upstream error: ${awesomeApiResponse.status} - ${errorText}`);
            throw new Error(`Upstream API error: ${awesomeApiResponse.status} ${awesomeApiResponse.statusText} - ${errorText.substring(0, 100)}`);
        }

        const data = await awesomeApiResponse.json();

        response.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

        return response.status(200).json(data);
    } catch (error) {
        console.error('Proxy error trace:', error);
        return response.status(500).json({
            error: 'Failed to fetch data',
            details: error.message,
            stack: error.stack
        });
    }
}
