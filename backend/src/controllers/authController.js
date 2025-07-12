const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const User = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'owner',
      },
    });

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      token, user:
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  signup,
  login
};