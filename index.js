const express = require('express');
const cors = require('cors');
const routes = require('./api/routes')

//config
const app = express();

app.use(cors());
app.use(express.json());

app.use('/v1', routes)

const PORT= process.env.PORT || 3333;
app.listen(PORT, () => {console.log(`ヽ(^o^)丿 Server Running on http://localhost:${PORT}`)});