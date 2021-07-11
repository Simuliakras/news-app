const mongoose = require('mongoose')

//Creating article data schema
const articleDetailsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    url: {
        type: String,
        required: true
    },

    publishDate: {
        type: String,
        required: true
    },

    searchDate: {
        type: Date,
        default: Date.now
    }

})

//Exporting schema
module.exports = mongoose.model('clicked_articles_details', articleDetailsSchema)