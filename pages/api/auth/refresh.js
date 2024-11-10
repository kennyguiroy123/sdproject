import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token found' });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    // Create a new access token
    const newToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Set the new token in the cookie
    res.setHeader('Set-Cookie', serialize('token', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,  // 1 d
      path: '/',
    }));

    res.status(200).json({ token: newToken });
  } catch (error) {
    console.error('Failed to refresh token:', error);
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
}
