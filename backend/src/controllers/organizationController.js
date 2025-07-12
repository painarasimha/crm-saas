const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getOrganizations = async (req, res) => {
  try {
    const organizations = await prisma.organization.findMany();
    res.json(organizations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching organizations.' });
  }
};

const getOrganizationById = async (req, res) => {
  const { id } = req.params;
  try {
    const organization = await prisma.organization.findUnique({
      where: { id },
      include: { members: true }
    });
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found.' });
    }
    res.json(organization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching organization.' });
  }
};

const createOrganization = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newOrganization = await prisma.organization.create({
      data: {
        name,
        description,
        members: {
          create: {
            userId: req.user.id, // Assuming user ID is stored in req.user
            role: 'owner', // Default role for the creator
          },
        },
      },
    });
    res.status(201).json(newOrganization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating organization.' });
  }
};

const updateOrganization = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updatedOrganization = await prisma.organization.update({
      where: { id },
      data: { name, description },
    });
    res.json(updatedOrganization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating organization.' });
  }
};

const deleteOrganization = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.organization.delete({
      where: { id },
    });
    res.json({ message: 'Organization deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting organization.' });
  }
};

module.exports = {
  getOrganizations,
  getOrganizationById,
  createOrganization,
  updateOrganization,
  deleteOrganization,
};