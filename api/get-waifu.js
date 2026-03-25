export default async function handler(req, res) {
    const { type = 'sfw', cat = 'waifu' } = req.query;

    try {
        // Decide if we need the 'many' endpoint based on the Request Method
        const isMany = req.method === 'POST';
        const targetPath = isMany ? `many/${type}/${cat}` : `${type}/${cat}`;
        
        const apiRes = await fetch(`https://api.waifu.pics/${targetPath}`, {
            method: req.method,
            headers: { 'Content-Type': 'application/json' },
            // If it's POST, we send an empty object {} in the body as required by the source
            body: isMany ? JSON.stringify(req.body || {}) : null
        });

        const data = await apiRes.json();
        
        // Send the data (either 'url' or 'files' array) back to your site
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Connection to AnimeGif Source Failed" });
    }
}
