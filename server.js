const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("./auth");
const path = require("path")

dotenv.config();
const PORT = process.env.PORT ? process.env.PORT : 3200;

const app = express();
app.use(cors());

app.use(bodyParser.json());


const connectToDB = () => {
  return mongoose.connect(process.env.MONGO_URI||'mongodb://localhost:27017/users', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
};

connectToDB();
console.log("mongoDB connected");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

validateEmail = ( email ) => {
let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

if ( re.test(email) ) {
      return true
  }
  else {
      return false
  }
}

app.post("/register", async (req, res) => {
  try {
    const { name, email, password, repeatPassword } = req.body;
    if(!validateEmail(email)){
      return res.send({error:"Incorrect email address"})
    };
    if (name.length < 2 || name.length > 8)
      return res.send({
        error:
          "the name must be atleast 2 characters and lass than 8 characters",
      });
    if (password !== repeatPassword)
      return res.send({
        error: "this passwords didnt match! ",
      });
    const user = await User.findOne({ email });
    if (user) {
      return res.send({ error: "this email already exist!" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: passwordHash,
    });
    await newUser.save();
    res.send({ message: "register successfuly" });
  } catch (err) {
    return res.send({ error: "register fail" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.send({ error: "This user does not exist!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send({ error: "Incorrect password" });
    }
    const payload = { id: user._id, name: user.name };
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });
    res.send({ token, name: user.name });
  } catch (err) {
    return res.send({ error: "login fail" });
  }
});

app.get("/verify", auth, (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.send(false);
    jwt.verify(token, process.env.JWT_KEY, async (err, verified) => {
      if (err) return res.send(false);

      const user = await User.findById(verified.id);
      if (!user) return res.send(false);

      return res.send(true);
    });
  } catch (err) {
    res.send({ error: err.message });
  }
});

if(process.env.NODE_ENV==='production'){
  app.use(express.static('client/build'));
  app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','build','index.html'))   
  })
}

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
