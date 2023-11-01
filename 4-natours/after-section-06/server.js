const mongoose = require('mongoose');
const dotenv = require('dotenv');
// dotenv.config = require({ path: '.config.env' });
const app = require('./app');

const DB = 'mongodb+srv://Bunthai:Bunthai1pass@cluster0.l0dcnf5.mongodb.net/?retryWrites=true'

mongoose.connect(DB,{
})
.then(() =>{
  console.log("db is connected successful!");
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
