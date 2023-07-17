// imports express
const express = require('express')
const Post = require('./models/Post')

//creates express router used to create path sfor our database 
const router = express.Router();

//creating APi routes
router.get('/posts', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
})

//post a new blog routes
router.post('/posts', async (req, res) =>{
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    })
    await post.save();
    res.send(post)
})

//get single post by id

router.get('/posts/:id', async (req, res) =>{
    try {
        const post = await Post.findOne({ _id: req.params.id})
        res.send(post) 
    } catch (error) {
        res.status(404)
        res.send({error: "post doesnt exits"})
    }
    
})

// get single post by title
router.get('/posts/:title', async (req, res) =>{
    const post = await Post.findOne({ title: req.params.title})
    res.send(post)
})


//updating a post by id

router.patch('/posts/:id', async (req, res) => {

    try {
        //saving particuler id to postß
        const post = await Post.findOne({ _id: req.params.id})
        if(req.body.title){
            post.title = req.body.title
        }
        if(req.body.content){
            post.content = req.body.content
        }
        if(req.body.image){
            post.image = req.body.image
        }
        if(req.body.tags){
            post.tags = post.tag.concat(req.body.tags)
        }

        await post.save()
        res.send(post)

    } catch (error) {
        res.status(404)
        res.send({error: "post doesnt exits"})
    }
    
})

//delete a post by id
router.delete("/posts/:id", async (req, res) => {
	try {
		await Post.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})

//exports router 
module.exports = router