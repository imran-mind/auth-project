const express = require('express');
const usersController = require('../controllers/usersController');
const validateUser = require('../utils/userValidate');
const ensureAuthenticate = require('../utils/auth');
const routes = express.Router();

routes.post('/register',
    validateUser.userRegisterValidation,
    usersController.registerUser);

routes.post('/login',
    validateUser.userLoginValidation,
    usersController.loginUser);

routes.get('/users',
    ensureAuthenticate,
    usersController.getUsers)

module.exports = routes;