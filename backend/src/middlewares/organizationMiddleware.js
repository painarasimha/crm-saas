const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const isOrgOwner = async (req, res, next) => {
  const { id } = req.params;
  try {
    const membership = await prisma.organizationMember.findFirst({
      where: {
        organizationId: id,
        userId: req.user.id,
      },
    });

    if (!membership) {
      return res.status(403).json({ message: 'You are not member of this organization.' });
    }
    if (membership.role !== 'owner') {
      return res.status(403).json({ message: 'You are not the owner of this organization.' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Authorization error' });
  }
};

const isOrgMember = async (req, res, next) => {
  const { id } = req.params;

  try {
    const membership = await prisma.organizationMember.findFirst({
      where: {
        organizationId: id,
        userId: req.user.userId,
      },
    });

    if (!membership) {
      return res.status(403).json({ message: "You are not a member of this organization." });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Authorization error." });
  }
};

module.exports = {
  isOrgOwner,
  isOrgMember,
};