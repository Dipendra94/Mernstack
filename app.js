require('dotenv').config()
const express = require('express');
const connectToDatabase = require('./database');
const Blog = require('./model/blogModel');

const app = express()
app.use(express.json())
 const {multer,storage} = require('./middleware/multerConfig');
const upload = multer ({storage : storage})
connectToDatabase()

app.get("/", (req, res) => {
    res.req("This is Home page")
})

app.get("/about", (req, res) => {
    res.status(200).json({
        message: "Hello i am Dipendra karki"
    })
})




app.post("/blog",upload.single('image'), async (req, res) => {
    const { title, description, image, subtitle } = req.body
    if (!title || !description || !subtitle || !image) {
        res.status(400).json({
            message: "Enter the following details"
        })
    }
    // console.log(req.body)
    await Blog.create({
        title: title,
        description: description,
        subtitle: subtitle,
        image: image
    })
    res.status(200).json({
        message: "Blog api hit successfully"
    })
})
app.listen(process.env.PORT, () => {
    console.log("Good Night Dipendra")
})





// require('dotenv').config()
// const express = require('express')
// const connectToDatabase = require('./database')

// const app = express() 
// app.use(express.json())
// const {multer,storage} = require('./middleware/multerConfig')
// const upload = multer({storage : storage })

// connectToDatabase()

// app.get("/",(req,res)=>{
//     res.status(200).json({
//         hello : "This is home page"
//     })
// })

// app.post("/blog",upload.single('image'), (req,res)=>{
//     console.log(req.body)
//     res.status(200).json({
//         message : "Blog api hit successfully"
//     })
// })

// app.listen(process.env.PORT,()=>{
//     console.log("NodeJs project has started")
// })

