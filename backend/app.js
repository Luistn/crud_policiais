require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

module.exports = { app, db };
