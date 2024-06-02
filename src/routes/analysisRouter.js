const express = require('express');
const analysisRouter = express.Router();

const AnalysisController = require('../controllers/analysisController');

analysisRouter.get('/process', AnalysisController.processAnalysis)

module.exports = analysisRouter;