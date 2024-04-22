const express = require('express');
const app = express();
require('dotenv').config();
var bodyParser = require('body-parser')
const PORT = process.env.PORT || 4000;
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(express.json());
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swaggerOptions.js');

app.use(cors());




// Enable CORS for all routes
app.use(cors());
app.use(errorHandler);

const userRoute = require('./routes/userRoute');
const todoRoute = require('./routes/todoRoute');
app.use('/api' , todoRoute);
app.use('/user', userRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)));



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});



module.exports = app;
//module.exports = swaggerUi.setup(swaggerJsdoc, options);