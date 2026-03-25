const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/generate', async (req, res) => {
    try {
        const response = await axios.get('https://api.waifu.pics/sfw/waifu');
        res.json({
            success: true,
            image_url: response.data.url,
            owner: "BlissCraft",
            timestamp: new Date().toLocaleTimeString()
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Source Offline" });
    }
});

app.listen(PORT, () => console.log(`Server live on port ${PORT}`));

