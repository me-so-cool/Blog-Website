import express from "express";
import cors from "cors";
import postRoutes from "../api/routes/posts.js"
import authRoutes from "../api/routes/auth.js"
import userRoutes from "../api/routes/user.js"
import cookieParser from "cookie-parser"
import multer from "multer"

const app = express()

app.use(cors({
    origin: 'http://localhost:5173', // replace with your client's origin
    credentials: true,
}))

app.use(express.json())
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../client/public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  if (!req.file) {
    return res.status(400).json("No file was uploaded.");
}
    const file = req.file;
    res.status(200).json(file.filename);
  });

app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/posts",postRoutes)


app.listen(8800, ()=> {
    console.log("Connected!")
})