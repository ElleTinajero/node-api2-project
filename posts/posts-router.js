const express = require("express")
const posts = require("../data/db")

const router = express.Router()

router.get("/posts", (req, res) => {
    // console.log(req.query) //what is this for again???
    posts.find(req.query) //calling find function from db
        .then((posts) => { //once posts is found then return a status code okat
            res.status(200).json(posts)//status code
        })
        .catch((error) => { //if not return this error
            console.log(error)
            res.status(500).json({
                message: "Error retrieving data",
            })
        })
})

module.exports = router