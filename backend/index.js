const express = require('express')

const app = express();

app.post('/scrape', (req, res) => {
    const handle = req.body.handle
    const password = req.body.password

    //puppeteer stuff
})


app.listen(3001, ()=>{
    console.log('Server listening on port 3001')
})
