const express = require('express')
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const banner = require('./models/banner');
const card = require('./models/card');
//middle ware
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.icikx.mongodb.net/myjob?retryWrites=true&w=majority`;

mongoose.connect(uri, () => {
    console.log('connect', uri);
}, e => console.log(e))


async function run() {
    try {
        app.get('/banner', async (req, res) => {
            const result = await banner.findOne({})
            res.json(result)
        })
        app.put('/banner', async (req, res) => {
            console.log(req.body);
            try {

                const result = await banner.findByIdAndUpdate(req.body._id, { ...req.body });
                res.json(result)
            }
            catch (e) {
                res.status(400).json({ error: e })

            }
            console.log(result);
        })
        app.get('/addCard', async (req, res) => {
            const result = await card.find({})
            res.json(result)
        })
        app.post('/addCard', async (req, res) => {
            console.log(req.body);
            const result = await card.create(req.body);
            console.log(result);
            res.json({ tor: 'main khai' })
        })
        app.delete('/addCard', async (req, res) => {
            // console.log(req.q);
            const { id } = req.query;
            console.log(id);
            try {

                const result = await card.findByIdAndDelete(id);
                res.json(result)
            } catch (e) {
                res.status(400).json({ error: e })
            }
            // console.log(result);
        })
    }
    catch (e) {

    }
}


run().catch(console.dir);
// default 
app.get('/', async (req, res) => {
    res.send('server is runing  ');
})
app.listen(port, () => {
    console.log('server is running at port', port);
})
