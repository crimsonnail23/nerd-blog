const express = require('express');
//insert const routes here.
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//insert app.user(routes) here to turn on routes.

sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log(`listening to ${PORT}`));

})