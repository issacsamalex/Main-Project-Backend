const Project = require('../model/Project');


// CRUD Operations

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        if(!projects) return res.status(204).json({'message': 'No projects found'});
        res.json(projects);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}


















module.exports = {
    getAllProjects
}