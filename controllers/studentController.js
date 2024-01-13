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

const updateUser = async (req, res) => {
  if(!req?.params?.id){
    return res.status(400).json({'message': 'ID parameter is required'});
  }
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if(!user){
      return res.status(204).json({'message': `No user matches ID ${req.params.id}`});
    }
    const updatedUser = await User.findByIdAndUpdate(id, req.body);
    res.status(200).json({'message': 'user updated successfully'})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getOneUser = async (req, res) => {
  if(!req?.params?.id){
    return res.status(400).json({'message': 'ID parameter is required'});
  }
  try {
    const id = req.params.id
    const oneUser = await User.findById(id)
    if(!oneUser){
      return res.status(204).json({'message': `No user matches ID ${req.params.id}`});
    }
    res.json(oneUser)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllUserData,
  updateUser,
  getOneUser

};
