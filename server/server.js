require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());


app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`))