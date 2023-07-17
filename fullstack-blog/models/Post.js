//importing mongose
const mongoose = require("mongoose")


//creating our schema which is used like a constructor in mongose use to build a replica of how our object should look like to stor our data
const schema = mongoose.Schema({
	title: String,
	content: String,
    date: {
        type:Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    image: String,
    tags: [String]
})


//exporting the schema using the model method on mongose that takes two attributes the name of the model and the schema
module.exports = mongoose.model("Post", schema)