import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import schoolRoutes from './routes/schoolRoutes'
import path  from 'path'
import fs from 'fs'

dotenv.config()

const app = express()
app.use(cors({ origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, }));


app.use(express.json())

app.use("/schoolImages", express.static(path.join(__dirname, "../uploads/schoolImages")));

const uploadDir = path.join(__dirname, "../uploads/schoolImages");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use("/api/schools", schoolRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`))