import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    const { email, password, firstName, lastName, biography, position } = req.body;

    // Ensure all necessary fields are provided
    if (!email || !password || !firstName || !lastName || !biography || !position) {
      return res.status(400).json({ error: 'All user fields are required' });
    }

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user in the database
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          biography,
          position,
        },
      });

      // Log the user object to verify it contains the id field
      console.log("User created:", user); // This should show the user object

      // Check if the user object is valid and contains an id
      if (!user || !user.id) {
        console.error("User creation failed. User object:", user);
        return res.status(500).json({ error: 'User creation failed, ID is missing' });
      }

      // Create the JWT token, only if user.id is available
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

      //console.log("JWT Token created:", token); // Log the token for debugging

      // Send response with token and user data
      res.status(201).json({
        token,
        user,
        message: 'User registered successfully',
      });
    } catch (error) {
      console.error('Registration Error:', error); // Log the error for debugging
      res.status(500).json({ error: 'Failed to create user' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
