const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('Uncaught Exception! 💥 Shutting down...');

  process.exit(1);
});

const app = require('./app');

const DB = process.env.DB_HOST.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(DB).then(console.log('DB connection successful!')).catch();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection! 💥 Shutting down...');

  server.close(() => {
    process.exit(1);
  });
});
