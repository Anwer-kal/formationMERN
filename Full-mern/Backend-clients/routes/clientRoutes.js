const express = require('express');
const {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
  getClientCount,
} = require('../controllers/clientController'); 

const router = express.Router();

router.post('/client', createClient); 
router.get('/clients', getAllClients); 
router.get('/client/:id', getClientById); 
router.put('/client/:id', updateClient); 
router.delete('/client/:id', deleteClient); 
router.get('/clients/count', getClientCount); 

module.exports = router;
