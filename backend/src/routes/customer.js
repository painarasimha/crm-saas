const express = require('express');
const router = express.Router();
const {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customerController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect); // All routes below require authentication

router.get('/', getCustomers); // Get all customers
router.get('/:id', getCustomerById); // Get customer by ID
router.post('/', createCustomer); // Create customer
router.put('/:id', updateCustomer); // Update customer
router.delete('/:id', deleteCustomer); // Delete customer

module.exports = router;
