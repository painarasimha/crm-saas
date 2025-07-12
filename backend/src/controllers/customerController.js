const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all customers
const getCustomers = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany({
      where: { organizationId: req.user.organizationId },
    });
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching customers.' });
  }
};

// Get customer by ID
const getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await prisma.customer.findUnique({
      where: { id },
    });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found.' });
    }
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching customer.' });
  }
};

// Create customer
const createCustomer = async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const newCustomer = await prisma.customer.create({
      data: {
        name,
        email,
        phone,
        organizationId: req.user.organizationId,
      },
    });
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating customer.' });
  }
};

// Update customer
const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data: { name, email, phone },
    });
    res.json(updatedCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating customer.' });
  }
};

//Delete customer
const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.customer.delete({
      where: { id },
    });
    res.json({ message: 'Customer deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting customer.' });
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};