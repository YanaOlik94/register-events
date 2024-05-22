const app = require('./app');
const sequelize = require('./config/db');
const port = 3000;


sequelize.sync();


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
