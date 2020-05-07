const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase()
  })
  .then(() => {
    console.log("Added single recipe to database");
    return Recipe.create({
      title: "Beef Stew",
      level: "Easy Peasy",
      ingredients: ["beef", "stew"],
      cuisine: "Basic",
      dishType: "main_course",
      image:
        "https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/The-Best-Beef-Stew_EXPS_TOHON19_242973_E06_11_2b.jpg",
      duration: 20,
      creator: "me"
    });
  })
  .then(() => {
    console.log("Added many recipes to the database");
    return Recipe.insertMany(data)
  })
  .then(() => {
    console.log("Disconnected from the database");
    return mongoose.disconnect()
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
