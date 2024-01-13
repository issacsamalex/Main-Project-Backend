const User = require('../model/Student_details');
const jwt = require('jsonwebtoken');

const getAllUserData = async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    // Verify the token
    jwt.verify(token.replace('Bearer ', ''), process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token' });
      }

      const { username } = decoded;

      // Fetch student data from the database using the decoded username
      const student = await User.findOne({ username });

      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }

      res.status(200).json(student);
    });
  } catch (error) {
    console.error('Error fetching student data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {getAllUserData};
