const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const app = express();
const usermodel = require('./models/user_project');
const postmodel = require('./models/post');
const CookieParser = require('cookie-parser');
const upload = require('./config/multerconfig');

app.set("view engine","ejs");
app.use(CookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.get('/',function(req,res){
    res.render("index_project");
})

app.get('/profile/upload',(req,res)=>{
    res.render("profile_upload");
})

app.post('/upload',isLoggedin,upload.single("image"), async(req,res)=>{
   let user = await usermodel.findOne({email:req.user.email});
   user.profilepic = req.file.filename;
   await user.save()
   res.redirect("/profile");
})

app.post('/register',async(req,res)=>{
    let {username,name,email,age,password} = req.body;

    let user = await usermodel.findOne({email});
    if(user) return res.status(500).send("User already registered");

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {

            let newuser = await usermodel.create({username,name,age,email,password:hash});

            let token = jwt.sign({email: email, userid: newuser._id},"sabhhfbhs");
            res.cookie("token",token);
            res.send("registered");
        });

    });
})

app.get('/login',(req,res)=>{
    res.render("login");
})

app.get('/profile',isLoggedin,async(req,res)=>{
    let user = await usermodel.findOne({email:req.user.email}).populate("posts");
    // console.log(user);
    res.render("profile",{user});
})
app.get('/like/:id',isLoggedin,async(req,res)=>{
    let post = await postmodel.findOne({_id:req.params.id}).populate("user");

    if(post.likes.indexOf(req.user.email)===-1){
        post.likes.push(req.user.email);
    }else{
        post.likes.splice(post.likes.indexOf(req.user.email),1)
    }
    
    await post.save();
    // console.log(user);
    res.redirect("/profile");
})

app.get('/edit/:id',isLoggedin,async(req,res)=>{
    let post = await postmodel.findOne({_id:req.params.id}).populate("user");
    res.render("edit_project",{post});
})
app.get('/home',isLoggedin,async(req,res)=>{
    let post = await postmodel.find().populate("user");
    // res.send(post);
    // post.forEach(post => {
    //     console.log(post.user.name);
    //     console.log(post.content);
    //     console.log()
    // })
    res.render("home",{post});
})
app.get('/likes/:id',isLoggedin,async(req,res)=>{
    let post = await postmodel.findOne({_id:req.params.id}).populate("user");

    if(post.likes.indexOf(req.user.email)===-1){
        post.likes.push(req.user.email);
    }else{
        post.likes.splice(post.likes.indexOf(req.user.email),1)
    }
    
    await post.save();
    res.redirect("/home");
})

app.post('/update/:id',isLoggedin,async(req,res)=>{
    let post = await postmodel.findOneAndUpdate({_id:req.params.id},{content: req.body.content});
    res.redirect("/profile");
})


app.post('/post',isLoggedin,async(req,res)=>{
    let user = await usermodel.findOne({email:req.user.email});
    let post = await postmodel.create({user:user._id,content:req.body.content})
    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
})

app.post('/login',async(req,res)=>{
    let {email,password} = req.body;

    let user = await usermodel.findOne({email});
    if(!user) return res.send("Something is wrong");

    bcrypt.compare(password, user.password, function(err, result) {
        if(result){
            let token = jwt.sign({email: user.email},"sabhhfbhs");
            res.cookie("token",token);
            res.status(200).redirect("profile");
        } 
        else    res.redirect("/login");
    });
})

app.get('/logout',(req,res)=>{
    res.cookie("token","");
    res.redirect('/login');

})



function isLoggedin(req,res,next){
    if(req.cookies.token === "") res.redirect('/login');
    else{
        let data = jwt.verify(req.cookies.token,"sabhhfbhs");
        req.user = data;
    }
    next();
}

app.listen(3000);