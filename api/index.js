import express from "express";
import authRoutes from "./routes/auth.routes.js";
import postsRoutes from "./routes/posts.routes.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors";

const app = express();

// Habilita el CORS antes de definir las rutas
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);

app.listen(8000, () => {
  console.log("Connected!");
});
