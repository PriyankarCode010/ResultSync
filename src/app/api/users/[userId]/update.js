
import connectMongoDB from '@/lib/mongodb';
import User from '@/models/user';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { userId } = req.query;
    const { name, email } = req.body;

    try {
      await connectMongoDB();

      // Find the user with the specified ID and update its name and email
      await User.findByIdAndUpdate(userId, { name, email });

      // Send a success response
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user:', error);
      // Send an error response
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
