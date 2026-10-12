import express from 'express';

const app = express();

const port = process.env.APP_PORT || 3000;
app.listen(port, (error) => {
  if (error) {
    return console.error(error);
  } else {
    console.log(`Server is running on port: ${port}`);
  }
});
