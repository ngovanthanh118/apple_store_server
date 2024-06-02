const express = require('express');
const searchRouter = express.Router();
const SearchController = require('../controllers/searchController');

searchRouter.get('/', SearchController.findProductByName)

module.exports = searchRouter;