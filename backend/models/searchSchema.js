const mongoose = require('mongoose')

//Creating searched keyword schema
const searchKeywordsSchema = new mongoose.Schema({
    keyword:{
        type:String,
        required:true
    },

    searchDate:{
        type:Date,
        default:Date.now
    }
})

//Exporting schema
module.exports = mongoose.model('searched_keywords', searchKeywordsSchema)