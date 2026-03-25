export default async function handler(req, res) {
    const { type = 'sfw', cat = 'waifu' } = req.query;

    try {
        // 1. Get the JSON from the original API
        const apiRes = await fetch(`https://api.waifu.pics/${type}/${cat}`);
        const data = await apiRes.json();

        // 2. Fetch the actual image data from i.waifu.pics
        const imageRes = await fetch(data.url);
        const arrayBuffer = await imageRes.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // 3. Set the header so the browser knows it's an image
        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader('Cache-Control', 's-maxage=86400'); // Cache for 24 hours
        
        // 4. Send the actual image bytes
        res.status(200).send(buffer);
    } catch (error) {
        res.status(500).send("Error loading image");
    }
}
