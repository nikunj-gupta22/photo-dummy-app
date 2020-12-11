
 const express=require("express");
 const app=express();
 const fs=require('fs').promises;

 var multer=require('multer');
const PORT=process.env.PORT||4541;
 const { Users ,db} = require("./db");

 const upload=multer({dest:'uploads/'});

 app.use('/images', express.static(__dirname + '/images'))
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));
 app.set("view engine","ejs");
 app.use(express.static('public'));

  app.get('/',(req,res)=>{
    res.render('index');
  });

  app.post('/signup',upload.single('avatar'),async(req,res)=>{
     console.log('req.body',req.body);
     console.log('req.file',req.file);

     const oldPath=__dirname + "/uploads/"+req.file.filename;
    const newPath=__dirname+"/images/"+ 'avatar_'+req.body.username+"."+req.file.mimetype.split('/').pop();
     
    await  fs.rename(oldPath,newPath);

       const user=await Users.create({
         username:req.body.username,
         password:req.body.password,
         email:req.body.email,
         avatar:"/images/"+ 'avatar_'+req.body.username+"."+req.file.mimetype.split('/').pop()
     })
     console.log(user);
        res.render('login');
  })

app.get('/login',(req,res)=>{
  res.render('login');
})
app.post('/login',async(req,res)=>{

       const user=await Users.findOne({
         where:{
        username:req.body.UserName
        }
       })
   console.log(user.avatar);
  
      res.render('home',{profile:"/images/avatar_jatin.png"});
})

app.get('/allpost',async(req,res)=>{

  let everypost=await Users.findAll();
  res.render('allpost',{'userphoto':everypost});
})


  db.sync().then(()=>{

  app.listen(PORT,()=>{
    console.log("server is up on port 4541");
})

 }).catch(console.error);
 



































