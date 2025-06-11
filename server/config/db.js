//connect to mongoose
const mongoose = require('mongoose');

mongoose.set("strictQuery",false);

const mongoDB = process.env.ATLAS_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

module.exports = main;