export default async function handler(req, res) {
    const { type = 'sfw', cat = 'waifu' } = req.query;
    try {
        const isMany = req.method === 'POST';
        const targetPath = isMany ? `many/${type}/${cat}` : `${type}/${cat}`;
        const apiRes = await fetch(`https://api.waifu.pics/${targetPath}`, {
            method: req.method,
            headers: { 'Content-Type': 'application/json' },
            body: isMany ? JSON.stringify({}) : null
        });
        const data = await apiRes.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Connection Failed" });
    }
}
