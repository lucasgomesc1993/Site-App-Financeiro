export default async function handler(request, response) {
    const { pair, days } = request.query;

    if (!pair || !days) {
        return response.status(400).json({ error: 'Missing pair or days parameter' });
    }

    try {
        const awesomeApiResponse = await fetch(`https://economia.awesomeapi.com.br/json/daily/${pair}/${days}`);

        if (!awesomeApiResponse.ok) {
            throw new Error(`Upstream API error: ${awesomeApiResponse.status}`);
        }

        const data = await awesomeApiResponse.json();

        // Set CORS headers just in case, though same-origin usage doesn't strictly need it
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate'); // Cache for 1 hour

        return response.status(200).json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        return response.status(500).json({ error: 'Failed to fetch data' });
    }
}
