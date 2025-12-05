export const config = {
    runtime: 'nodejs',
};

export default async function handler(request, response) {
    // Set CORS headers early to ensure they are present for all responses
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (request.method === 'OPTIONS') {
        return response.status(200).end();
    }

    try {
        // Safe query parsing - Vercel usually provides request.query, but we fallback safely
        const query = request.query || {};
        let { pair, days } = query;

        // Fallback for manual parsing if query is empty (unlikely in Node runtime but safe)
        if (!pair || !days) {
            const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
            if (!pair) pair = url.searchParams.get('pair');
            if (!days) days = url.searchParams.get('days');
        }

        if (!pair || !days) {
            return response.status(400).json({ error: 'Missing pair or days parameter' });
        }

        const awesomeApiResponse = await fetch(`https://economia.awesomeapi.com.br/json/daily/${pair}/${days}`);

        if (!awesomeApiResponse.ok) {
            throw new Error(`Upstream API error: ${awesomeApiResponse.status} ${awesomeApiResponse.statusText}`);
        }

        const data = await awesomeApiResponse.json();

        response.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate'); // Cache for 1 hour

        return response.status(200).json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        // Return error details to help debugging
        return response.status(500).json({
            error: 'Failed to fetch data',
            details: error.message
        });
    }
}
