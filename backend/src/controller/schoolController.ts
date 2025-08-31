import {Request, Response} from 'express'
import { db } from '../config/db'



export const addSchool = async (req:Request, res:Response) => {
    console.log("Body:", req.body);
  console.log("File:", req.file);
  try {
    const { name, address, city, state, contact, email_id } = req.body;
    const image = req.file ? `/schoolImages/${req.file.filename}` : null;

     await db.execute(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, image, email_id]
    );

    res.status(201).json({ message: "School added successfully" });
    
  } catch (error) {
       console.error(error);
    res.status(500).json({ error: "Database insert failed" });
  
  }
}


export const getSchools = async (req:Request, res:Response) => {
    try {
    const [rows] = await db.query("SELECT id, name, address, city, image FROM schools");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database fetch failed" });
  }
}