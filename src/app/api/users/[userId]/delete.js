
import connectMongoDB from '@/lib/mongodb';
import User from '@/models/user';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { userId } = req.query;

    try {
      await connectMongoDB();

      // Delete the user with the specified ID
      await User.findByIdAndDelete(userId);

      // Send a success response
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      // Send an error response
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
