const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/Tour');
const Review = require('../../models/Review');
const User = require('../../models/User');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

// IMPORT DATA IN DB
const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/tours.json`,
    'utf-8'
  )
);
const users = JSON.parse(
  fs.readFileSync(
    `${__dirname}/users.json`,
    'utf-8'
  )
);
const reviews = JSON.parse(
  fs.readFileSync(
    `${__dirname}/reviews.json`,
    'utf-8'
  )
);

const importData = async () => {
  try {
    await Tour.create(tours);
    await Review.create(reviews);
    await User.create(users, {
      validateBeforeSave: false,
    });
    console.log('Data successfully loaded!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data successfully deleted!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
