export default function handler(req, res) {
    if (req.method === 'POST') {
      // Clear the token cookie
      res.setHeader('Set-Cookie', 'token=; Path=/; Max-Age=0; HttpOnly; Secure=' + (process.env.NODE_ENV === 'production'));
      
      return res.status(200).json({ message: 'Logged out successfully' });
    }
  
    // If the method is not POST, respond with a 405 (Method Not Allowed)
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  