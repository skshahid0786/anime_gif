export default async function handler(req, res) {
    const { type = 'sfw', cat } = req.query;

    // Simplified Mood Lists
    const sfwMoods = ['waifu', 'neko', 'shinobu', 'megumin', 'happy', 'wink', 'dance', 'smile'];
    const nsfwMoods = ['waifu', 'neko', 'trap', 'blowjob'];

    // If no category is selected, pick a random mood based on the type
    const finalCat = cat || (type === 'sfw' 
        ? sfwMoods[Math.floor(Math.random() * sfwMoods.length)] 
        : nsfwMoods[Math.floor(Math.random() * nsfwMoods.length)]);

    try {
        const apiRes = await fetch(`https://api.waifu.pics/${type}/${finalCat}`);
        const data = await apiRes.json();
        
        // Return simple JSON
        res.status(200).json({
            url: data.url,
            type: type,
            mood: finalCat
        });
    } catch (error) {
        res.status(500).json({ error: "AnimeGif Offline" });
    }
}
