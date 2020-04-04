const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/*app.use((req,res,next) =>{
  console.log('First middleware');
  next();
});*/
app.use(bodyParser.json())
app.use((req,res,next) =>{
  res.setHeader("Access-Control-Allow-Origin",
  "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin,X-Requested-With,Content-Type,Access");
  res.setHeader("Access-Control-Allow-Methods",
  "POST,GET,PATCH,PUT,DELETE");
  next();
})

app.post('/api/post',(req,res,next) =>{
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: "Post Added Successfully"
  })
})


app.use('/api/post', (req,res,next) =>{
  postList = [
    {
      id: 'hiuj1234',
      title: "First Post",
      content: "Hi I\'m Joy Sharma"
    },
    {
      id: 'jkgh1235',
      title: "Second Post",
      content: "I am a data science enthusiastic"
    }
  ];

  res.status(200).json({
    message: "Posts fetched successfully",
    posts: postList
  })
});

module.exports = app;
