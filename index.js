import express from "express";
import jwt from "jsonwebtoken";

const app = express();

const PORT = 5000;

const secretkey = "secretkey";

app.get("/", (req, res) => {
  res.json({ message: "sample" });
});

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    username: "Arjun",
    email: "arjun@gmail.com",
  };
  jwt.sign({ user }, secretkey, { expiresIn: "300s" }, (err, token) => {
    res.json({
      token,
    });
  });
});

app.post("/profile",verifyToken,(req,res)=>{
 jwt.verify(req.token,secretkey,(err,authData)=>{
  console.log(req.token);
  if(err){
    res.json({
      message:"Token invalid"
    })
  }else{
    res.json({
      message:"Token accessed",
      authData
    })
  }
 })
})

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  console.log(req.headers);

  if (bearerHeader) {
    console.log(bearerHeader);
    const bearer = bearerHeader.split(' ');
    console.log(bearer.length);
    if (bearer.length === 2) {
      const token = bearer[1];
      console.log(token); // Verify if the token is correctly extracted
      req.token = token; // Assign the token to the request if needed
      next();
    } else {
      res.status(403).json({
        result: 'Token is not valid',
      });
    }
  } else {
    res.status(403).json({
      result: 'Token is not provided',
    });
  }
}

app.listen(PORT, () => {
  console.log("server started in 5000");
});

export default app;

// "test": "echo \"Error: no test specified\" && exit 1",
