const express = require('express');
const cors = require('cors');
const router = require('./routes');

const port = 5000;
const app = express();

app.use(cors());

app.use(router);

app.listen(port, () => console.log(`Server was working on port ${port}`));
