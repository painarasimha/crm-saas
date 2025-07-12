const express = require('express');
const router = express.Router();

const {
  getOrganizations,
  getOrganizationById,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} = require('../controllers/organizationController');
const { isOrgOwner, isOrgMember } = require('../middlewares/organizationMiddleware');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.get("/", getOrganizations);

// Any member can view a single organization
router.get("/:id", isOrgMember, getOrganizationById);

// Anyone authenticated can create a new org
router.post("/", createOrganization);

// Only the owner can update or delete
router.put("/:id", isOrgOwner, updateOrganization);
router.delete("/:id", isOrgOwner, deleteOrganization);

module.exports = router;