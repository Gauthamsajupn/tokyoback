const userRouter = require('../model/signup')
module.exports={
   create: async (req,res)=>{
        try{
          console.log("Body:",{body: req.body});
          const result = await userRouter.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
          });
          console.log("Result:",result);
          res.status(201).json(result)
        }catch(error){
          console.log("Error at Routes/userRouter.js create ::::", error);
          res.status(400).send(error.message);
        }
   },

   login: async (req, res)=> {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                error:"Email and Password are required"
            });
        }
        const result = await userRouter.findOne({email, password});
        if (!result){
            res.status(401).send("Username or password is incorrect");
        } else {
            res.status(200).send("User logged in successfully");
        }
        
    } catch (error) {
        console.log("Error at Routes/userRouter.js login ::::", error);
        res.status(500).send("Internal server error");
    }
},
list: async (req, res) => {
  try {
      const result = await userRouter.find({});
      console.log({result});
      const users = [];
      for (const element of result) {
          let user = {};
          user._id = element._id;
          user.username = element.username;
          user.email = element.email;
          users.push(user);
      }
      res.status(201).json(users);
  } catch (error) {
      console.log("Error at Routes/userRouter.js list::", error);
      res.status(400).send(error.message);
  }
},
}







// const express = require("express");
// const router = express.Router();
// const User = require("../model/signup")


// router.post('/signup', async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const existingUser = await User.findOne({ email });
  
//       if (existingUser) {
//         return res.json('exist');
//       }
  
//       const newUser = new User({ email, password });
//       await newUser.save();
  
//       return res.json('notexist');
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json('error');
//     }
//   });

//   router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const existingUser = await User.findOne({ email });
  
//       if (!existingUser) {
//         return res.json('notexist');
//       }
  
//       // For simplicity, this example compares the passwords directly.
//       // In production, use a secure method like bcrypt for password comparison.
//       if (existingUser.password === password) {
//         return res.json('exist');
//       } else {
//         return res.json('notexist');
//       }
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json('error');
//     }
//   });

//   module.exports=router