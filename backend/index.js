const express = require('express');
const { cacheAllData, getProblem } = require('./utils/utils');

const app = express();

app.post('/scrape', (req, res) => {
    const handle = req.body.handle
    const password = req.body.password

    //puppeteer stuff
})

app.get('/', async (req, res) => {
   cacheAllData()
   const data = await getProblem(['Graph Coloring', 'A+B?'])
   res.send(data)
})

const port = process.env.SERVER_PORT | 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
