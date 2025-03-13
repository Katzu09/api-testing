const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/skin/:id', async (req, res) => {
    const { id } = req.params;
    if (isNaN(id) || id < 0 || id > 312) {
        return res.status(400).json({ error: 'Invalid skin ID. ID must be between 0 and 312.' });
    }
    try {
        const imageUrl = `https://assets.open.mp/assets/images/skins/${id}.png`;
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');

        res.set('Content-Type', 'image/png');
        res.send(buffer);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch the image.' });
    }
});

app.listen(3001, () => {
    console.log('API berjalan pada http://localhost:3001');
});
