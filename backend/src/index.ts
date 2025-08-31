import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import schoolRoutes from './routes/schoolRoutes'
import path = require('path')

dotenv.config()

const app = express()
app.use(cors({
  origin: "https://student-add-show-1.onrender.com",
  credentials: true
}));



app.use(express.json())

app.use("/schoolImages", express.static(path.join(__dirname, "../uploads/schoolImages")));

app.use("/api/schools", schoolRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`))