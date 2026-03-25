export default async function handler(req, res) {
    // Get parameters from the URL (e.g., /api/get-waifu?type=sfw&cat=waifu)
    const { type = 'sfw', cat = 'waifu' } = req.query;

    try {
        // Your API acts as a middleman to waifu.pics
        const response = await fetch(`https://api.waifu.pics/${type}/${cat}`);
        const data = await response.json();

        // You can now inject your own data here!
        res.status(200).json({
            url: data.url,
            owner: "Shahid",
            timestamp: new Date().toLocaleString()
        });
    } catch (error) {
        res.status(500).json({ error: "API Error" });
    }
}
