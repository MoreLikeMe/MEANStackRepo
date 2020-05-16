const Post = require('../model/post');

const express = require("express");

const router = express.Router();


router.post("",(req,res,next) =>{
  const post = new Post({
    title : req.body.title,
    content: req.body.content
  });
  console.log(post);
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post Added Successfully",
      postId: createdPost._id
    })
  })

})

router.get('/:id', (req,res,next) => {
    Post.findById(req.params.id).then(post => {
      if(post){
        res.status(200).json(post);
      } else{
        res.status(404).json({message: 'Post Not Found!'});
      }
    })
});

router.put('/:id', (req,res,next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });

  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(post);
    res.status(200).json({message: 'Updated Successfully'});
  })

})

router.delete('/:id', (req,res,next) =>{

  Post.deleteOne({
    _id: req.params.id
  })
  .then(result => {
    console.log(req.params.id);
    res.status(201).json({
      message: "Post Deleted Successfully"
    })
  })
})


router.use("", (req,res,next) =>{
  /*postList = [
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
  ];*/

  Post.find()
    .then(documents => {
      res.status(200).json({
        message: "Posts fetched successfully",
        posts: documents
      })
    });

    /*res.status(200).json({
      message: "Posts fetched successfully",
      posts: postList
    })*/
});


module.exports = router;
