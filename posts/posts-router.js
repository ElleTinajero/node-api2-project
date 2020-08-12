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

router.get("/posts/:id", (req, res) => {
    posts.findById(req.params.id)
        .then((user) => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({
                    message: "user not found",
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Post not found"
            })
        })
})

router.get("/posts/:id/comments", (req, res) => {
    posts.findCommentById(req.params.id)
    .then((comments) => {
        res.json(comments)
    })
    .catch(() => {
        console.log(error)
        res.status(500).json({
            message: "Could not get post comments",
        })
    })
})

router.post("/posts", (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({
            message: "Missing user title or contents",
        })
    }
    posts.insert(req.body)
    .then((post) => {
        res.status(201).json(post)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: "Error adding the post",
        })
    })
})

// router.post("/posts/:id/comments", (req, res) => {
//     if (!req.body.text) {
//           return res.status(400).json({
//             message: "Need a value for text",
//         })
//     }
//     posts.insertComment(req.params.id, {
//         text: req.body.text
//     })
//         .then((comment) => {
//             res.status(201).json(comment)
//         })
//         .catch((error) => {
//             console.log(error)
//             res.status(500).json({
//                 message: "Could not create comment",
//             })
//         })
// })

router.put("/posts/:id", (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({
            message: "Missing title or contents"
        })
    }

    posts.update(req.params.id, req.body)
        .then((post) => {
            if(post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: "The post could not be found"
                })
            }
        })

        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error updating the post"
            })
        })
})

router.delete("/posts/:id", (req, res) => {
    posts.remove(req.params.id) 
        .then((count) => {
            if (count > 0) {
                res.status(200).json({
                    message: "The user has been nuked",
                })
            } else {
                res.status(404).json({
                    message: "The user could not be found",
                })
            }
        })

        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error removing the post",
            })
        })
})

module.exports = router