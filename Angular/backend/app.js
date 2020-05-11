const express = require("express");
const app = express();
const Post = require("./models/post");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postRoutes = require('./routes/posts');
mongoose
  .connect(
    "mongodb://localhost:27017/MyPosts?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });	

// Lets attach the body-parser middleware
// bodyParser.json() -> this will tell only to process json type data from the request body
app.use(bodyParser.json());
//another example showing body-parser can process other types of body other than json
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

/*
app.post("/api/posts", (req, res, next) => {
  const post = req.body;

  // we still need to send the response as we dont want client be waiting and timeout
  res.status(201).json({
    message: "Post added successfully oho",
  });
});*/

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  post.save();

  console.log(post);
  res.status(201).json({
    message: "Post added successfully ahem",
  });
});

/*
app.get("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents,
    });
  });
});*/

app.get('/api/posts/:id', (req, res, next) => {
  Post.findById(req.params.id)
  .then(post => {
  if(post){
  res.status(200).json(post);
  }
  else{
  res.status(404).json({
  message: 'post not found'
  });
  }
  
  });
  });
  

app.put('/api/posts/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
    });
  
  Post.updateOne({_id: req.params.id}, post)
  .then(updatedPost => {
  res.status(201).json({
  message: 'Post Added !!',
  postId: updatedPost._id
  });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});


/*app.post({});
app.get({});
app.put({});
app.delete({});*/
/*
app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "fadf12421l",
      title: "First server-side post",
      content: "This is coming from the server",
    },
    {
      id: "ksajflaj132",
      title: "Second server-side post",
      content: "This is coming from the server!",
    },
  ];

res.status(200).json({
    message: "Posts fetched succesfully!",
    posts: posts,
  });
});*/



module.exports = app;
//app.use('/api/posts', postRoutes);

