const mongoose = require('mongoose')

// main schema 
const cardSchema = new mongoose.Schema({
    heading: String,
    describe: String,
    icon: String,

})

module.exports = mongoose.models.card || mongoose.model("card", cardSchema);