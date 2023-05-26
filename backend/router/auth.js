const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate");


require('../db/conn');
const User = require("../model/userSchema");

const {blogSchema ,Blog} = require("../model/blogSchema");
const {commentSchema, Comment} = require("../model/commentSchema");

// router.get('/', (req, res) => {
//     res.send(`Hello world from the server rotuer js`);
// });

// register route

router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword} = req.body;
    
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Plz filled the field properly" });
    }

    try {

        const userExist = await User.findOne({ email: email });

        if (userExist) {
             return res.status(422).json({ error: "Email already Exist" });
        } else if (password != cpassword) {
             return res.status(422).json({ error: "password are not matching" });
        } else {
             const user = new User({ name, email, phone, work, password, cpassword });
            await user.save();
            res.status(201).json({ message: "user registered successfuly" });
        }
        
  
    } catch (err) {
        console.log(err);
    }

});

// login route 

router.post('/signin', async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({error:"Plz Filled the data"})
        }

        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);   

        if (!isMatch) {
            res.status(400).json({ error: "Invalid Credientials " });
        } else {
             // need to genereate the token and stored cookie after the password match 
            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly:true
            });
            
            res.json({ message: "user Signin Successfully" });
        }
        } else {
             res.status(400).json({ error: "Invalid Credientials " });
        }

    } catch (err) {
        console.log(err);
    }
});


// dashboard route 

router.get('/Dashboard', authenticate ,(req, res) => {
    res.send(req.rootUser);
});


// Logout route

router.get('/logout', (req, res) => {
    console.log(`Hello my Logout Page`);
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send('User lOgout');
});


// Blog writing blog

router.post('/writeblog', authenticate, async (req, res) =>{

    const { title, content, topic} = req.body;
    
    if (!title || !content || !topic) {
        return res.status(422).json({ error: "Plz filled the field properly" });
    }

    try{

        const blog = new Blog({ title, content, topic}); 
        const foundUser = await User.findOne({ _id: req.rootUser._id });
        foundUser.blogs.push(blog);
        await foundUser.save();
        await blog.save();
        res.status(201).json({ message: "blog saved successfuly" });
    
  
    } catch (err) {
        console.log(err);
    }
});


// all blogs route

router.get("/blog", async (req, res) => {
    try{
        const allBlogs = await Blog.find({});
        if(allBlogs){
            res.send(allBlogs);
        }else{
            return res.status(422).json({ error: "No blogs" });
        }
    } catch (err) {
        console.log(err);
    }
    
});


// specific blog route

router.get("/blog/:blogId", async (req, res) =>{
    const blogId = req.params.blogId;
    
    if (!blogId) {
        return res.status(422).json({ error: "id not given" });
    }
    try{
        const blog = await Blog.findOne({_id: blogId});
        if(blog){
            res.send(blog);
        }else{
            return res.status(422).json({ error: "No blog found with this id" });
        }
    } catch (err) {
        console.log(err);
    }
});


//delete a blog

router.post("/blogDelete", authenticate, async (req, res) =>{
    // res.send("hello");
    const blogId = req.body.blogId;
    const userId = req.userID;

    if (!blogId || !userId) {
        return res.status(422).json({ error: "id not given" });
    }
    try{
        const user = await User.findOne({_id: userId});
        if(user){
            let i;
            for(i=0; i<user.blogs.length; i++) {
                if(user.blogs[i]._id == blogId){
                    break;
                }
            };
            if(i == user.blogs.length)
                return res.status(422).json({ error: "Deletion unsuccessful" });
            user.blogs.splice(i, 1);
            const done = await user.save();
            if(done){
                const blog = await Blog.deleteOne({_id: blogId});
                if(blog){
                    res.send("Successfully deleted the corresponding blog.");
                }else{
                    return res.status(422).json({ error: "Deletion unsuccessful" });
                }
            }else{
                return res.status(422).json({ error: "Deletion unsuccessful" });
            }
        }else{
            return res.status(422).json({ error: "Deletion unsuccessful" });
        }
    } catch (err) {
        console.log(err);
    }
});


//write a comment

router.post("/comment", authenticate, async (req, res) => {
    const {blogId, comment} = req.body; 
    const userId = req.userID;

    if(!userId || !blogId || !comment){
        return res.status(422).json({ error: "all feilds not given" });
    }
    try {
        const blog = await Blog.findOne({_id: blogId});
        const user = await User.findOne({_id: userId});
        const name = user.name;
        const cmt = new Comment({ comment, blogId, userId, userName:name});
        if(blog && user && cmt){
            blog.comments.push(cmt);
            user.comments.push(cmt);
            done1 = await blog.save();
            done2 = await user.save();
            done3 = await cmt.save();
            if(done1 && done2 && done3){
                res.send("Comment added successfully")
            }else{
                return res.status(422).json({ error: "Unable to add comment" });
            }
        }else{
            return res.status(422).json({ error: "Unable to add comment" });
        }
    } catch (err) {
        console.log(err);
    }
});


//delete a comment

router.post("/commentDelete", async (req, res) =>{
    const commentId = req.body.commentId;

    if (!commentId) {
        return res.status(422).json({ error: "id not given" });
    }
    try{
        const comment = await Comment.findOneAndDelete({_id: commentId});
        const user = await User.findOne({_id: comment.userId});
        const blog = await Blog.findOne({_id: comment.blogId});
        if(user && blog && comment){
            let i;
            for(i=0; i<user.comments.length; i++) {
                if(user.comments[i]._id == commentId){
                    break;
                }
            };
            if(i == user.comments.length)
                return res.status(422).json({ error: "Deletion unsuccessful" });
                user.comments.splice(i, 1);
                const done1 = await user.save();

            for(i=0; i<blog.comments.length; i++) {
                if(blog.comments[i]._id == commentId){
                    break;
                }
            };
            if(i == blog.comments.length)
                return res.status(422).json({ error: "Deletion unsuccessful" });
            blog.comments.splice(i, 1);
            const done2 = await blog.save();

            if(done1 && done2){
                res.send("Deletion Successful");
            }else{
                return res.status(422).json({ error: "Deletion unsuccessful" });
            }
        }else{
            return res.status(422).json({ error: "Deletion unsuccessful" });
        }
    } catch (err) {
        console.log(err);
    }
});


// like/dislike a blog

router.post("/like", authenticate, async (req, res) => {
    const blogId = req.body.blogId;
    const userId = req.userID;
    if (!blogId || !userId) {
        return res.status(422).json({ error: "id not given" });
    }
    try{
        const blog = await Blog.findOne({_id : blogId});
        const user = await User.findOne({_id : userId});
        if(user && blog){
            if(blog.likes == 0){
                blog.likes++;
                user.likedBlogs.push(blogId);
                blog.likedUsers.push(userId);
                user.save();
                blog.save();
                res.send("liked");
                return 0;
            }
            let i;
            for(i=0; i<user.likedBlogs.length; i++){
                if(user.likedBlogs[i] == blogId){
                    break;
                }
            }
            if(i == user.likedBlogs.length){
                blog.likes++;
                blog.likedUsers.push(userId);
                user.likedBlogs.push(blogId);
                user.save();
                blog.save();
                res.send("liked");
            }else{
                blog.likes--;
                const index = blog.likedUsers.indexOf(userId);
                blog.likedUsers.splice(index, 1);
                user.likedBlogs.splice(i, 1);
                user.save();
                blog.save();
                res.send("disliked");
            }
        }else{
            return res.status(422).json({ error: "not able to like" });
        }
    }catch (err) {
        console.log(err);
    }
});


//user deletion 

router.post("/userDelete", async (req, res) => {
    const userId = req.body.userId;
    if (!userId) {
        return res.status(422).json({ error: "id not given" });
    }
    try{
        const user = await User.findOneAndDelete({_id : userId});
        if(user){
            user.blogs.forEach(async blog => {
                await Blog.deleteOne({_id : blog._id});
            });
            user.comments.forEach(async comment => {
                await Comment.deleteOne({_id : comment._id});
            });
            res.send("Deletion successfull");
        }else{
            return res.status(422).json({ error: "Deletion unsuccessful" });
        }
    }catch (err) {
        console.log(err);
    }
});


// edit a blog

router.post("/editBlog", authenticate, async (req, res) => {
    const {blogId, title, content, topic} = req.body;
    if (!blogId || !title || !content || !topic) {
        return res.status(422).json({ error: "id not given" });
    }
    try{
        const blog = await Blog.findOne({_id: blogId});
        const user = req.rootUser;
        if(blog){
            blog.title = title;
            blog.content = content;
            blog.topic = topic;
            const done1 = await blog.save();
            let i;
            for(i = 0; i<user.blogs.length; i++){
                if(user.blogs[i]._id == blogId){
                    break;
                }
            }
            user.blogs[i].title = title;
            user.blogs[i].content = content;
            user.blogs[i].topic = topic;
            const done2 = await user.save();
            if(done1 && done2){
                res.send("blog edit successfull");
            }else{
                return res.status(422).json({ error: "blog edit unsuccessfull" });
            }
        }else{
            return res.status(422).json({ error: "No blog found with this id" });
        }
    } catch (err) {
        console.log(err);
    }
});


// for user authentication on readblog route

router.get("/authenticate/:blogId", authenticate, async (req, res) => {
    const comments = req.rootUser.comments;
    const blogs = req.rootUser.blogs;
    const commentIds = [];
    const userId = req.userID;
    const blogId = req.params.blogId;
    for(let i=0; i<comments.length; i++){
        commentIds.push(comments[i]._id);
    }
    let blog = 0;
    for(i=0;i<blogs.length;i++){
        if(blogs[i]._id == blogId){
            blog = 1;
            break;
        }
    }
    res.send({commentIds : commentIds, userId : userId, blog : blog});
});


module.exports = router;

