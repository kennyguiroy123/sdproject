import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    // Simulate a successful login by using a hardcoded userId
    // In a real application, you would verify the email/password and fetch the userId from your database
    const userId = 1;  // This should be fetched based on your authentication logic

    // Create a JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    
    try {
      // Find user in the database
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      // Generate JWT token
      const token = await new SignJWT({ userId })  // Add the userId to the payload
      .setProtectedHeader({ alg: 'HS256' })   // Set the algorithm header (HS256)
      .setIssuedAt()  // Set the issued at time
      .setExpirationTime('24h')  // Set the expiration time to 24 hours
      .sign(secret);

      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=86400; Secure=${process.env.NODE_ENV === 'production'}`);
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Login failed' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
