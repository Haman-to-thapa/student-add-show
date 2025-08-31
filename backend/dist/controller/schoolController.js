"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchools = exports.addSchool = void 0;
const db_1 = require("../config/db");
const addSchool = async (req, res) => {
    try {
        const { name, address, city, state, contact, email_id } = req.body;
        const image = req.file ? `/schoolImages/${req.file.filename}` : null;
        await db_1.db.execute("INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)", [name, address, city, state, contact, image, email_id]);
        res.status(201).json({ message: "School added successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database insert failed" });
    }
};
exports.addSchool = addSchool;
const getSchools = async (req, res) => {
    try {
        const [rows] = await db_1.db.query("SELECT id, name, address, city, image FROM schools");
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database fetch failed" });
    }
};
exports.getSchools = getSchools;
