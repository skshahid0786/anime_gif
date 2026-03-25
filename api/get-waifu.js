export default async function handler(req, res) {
    const { type = 'sfw', cat = 'waifu' } = req.query;

    try {
        // If it's a POST request (for "many" images), we talk to the /many endpoint
        const endpoint = req.method === 'POST' ? `many/${type}/${cat}` : `${type}/${cat}`;
        
        const apiRes = await fetch(`https://api.waifu.pics/${endpoint}`, {
            method: req.method,
            headers: { 'Content-Type': 'application/json' },
            body: req.method === 'POST' ? JSON.stringify(req.body) : null
        });
        
        const data = await apiRes.json();

        // If it's the gallery (many), we return the list of files
        if (data.files) {
            return res.status(200).json({ files: data.files });
        }

        // If it's a single image, we proxy the bytes to hide the source
        const imageRes = await fetch(data.url);
        const buffer = Buffer.from(await imageRes.arrayBuffer());

        res.setHeader('Content-Type', 'image/gif');
        res.status(200).send(buffer);
    } catch (error) {
        res.status(500).json({ error: "AnimeGif Engine Error" });
    }
}
