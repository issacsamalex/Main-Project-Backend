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

const getOneProject = async (req, res) => {
    if(!req?.params?.id){
        return res.status(400).json({'message': 'ID parameter is required'});
    }
    try {
        const id = req.params.id;
        const oneProject = await Project.findById(id);
        if(!oneProject){
            return res.status(204).json({'message': `No project matches ID ${req.params.id}`});
        }
        res.json(oneProject)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


















module.exports = {
    getAllProjects,
    getOneProject
}