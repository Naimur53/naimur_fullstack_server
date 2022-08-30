const mongoose = require('mongoose')

// main schema 
const bannerSchema = new mongoose.Schema({
    heading: String,
    describe: String,
    img: String,

})

module.exports = mongoose.models.banner || mongoose.model("banner", bannerSchema);