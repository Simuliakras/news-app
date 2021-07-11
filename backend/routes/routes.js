const express = require('express')
const router = express.Router()

//Including mongoose Schemas
const searchSchemaCopy = require('../models/searchSchema')
const articleDetailsSchemaCopy = require('../models/articleDetailsSchema')

//Getting POST for search keyword from front-end app
router.post('/search', async (request, response) => {

    //Saving keyword in to schema
    const searchKeyword = new searchSchemaCopy({
        keyword: request.body.keyword
    })

    //Saving keyword to database and catching errors if any
    searchKeyword.save()
        .then(data => {
            response.json(data)
        })
        .catch(error => {
            response.json(error)
        })
})

//Getting POST for article details from front-end app
router.post('/articleDetails', async (request, response) => {

    //Saving article details in to schema
    const articleDetails = new articleDetailsSchemaCopy({
        title: request.body.title,
        description: request.body.description,
        url: request.body.url,
        publishDate: request.body.publishDate
    })

    //Saving article details to database and catching errors if any
    articleDetails.save()
        .then(data => {
            response.json(data)
        })
        .catch(error => {
            response.json(error)
        })
})

module.exports = router