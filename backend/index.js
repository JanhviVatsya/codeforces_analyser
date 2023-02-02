const express = require('express');
const { cacheAllData, getProblems } = require('./utils/utils');

const app = express();

app.post('/scrape', (req, res) => {
    const handle = req.body.handle
    const password = req.body.password

    //puppeteer stuff
})

app.get('/cache_data', (req, res) => {
    cacheAllData();
    res.redirect('/')
})

app.get('/', async (req, res) => {
   res.send('Caching and Scraping Server')
})

const port = process.env.SERVER_PORT | 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
