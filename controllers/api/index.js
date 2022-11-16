const router = require('express').Router();

const userRoutes = require('./user-routes.js');

// will add '/api/users to the appropriate endpoints.
router.use('/users', userRoutes);

module.exports = router;