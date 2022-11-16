const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
//const helpers = require('./utils/helpers');

const sess = {
    secret: 'Superman is Clark Kent',
    cooke: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const app = express();
//app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


const PORT = process.env.PORT || 3001;
//const hbs = exphbs.create({ helpers });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sess));

//turn the routes on. 
app.use(routes);

sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log(`listening to ${PORT}`));

})