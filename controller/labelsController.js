const Label = require ('../models/Label')

const labels_get = (req, res, next) =>{
    res.send('all labels');
    };

const labels_getById = (req, res, next)=>{
    res.send('labels by id')
}

const labels_put = (req, res, next)=>{
    res.send('labels put')
}

const labels_post = async (req, res, next)=>{
    const {name, location} = req.body;
    const newLabel = await Label.create({
        name,
        location
    })
    res.send(newLabel);
}

const labels_delete = (req, res, next)=>{
    res.send('labels delete')
}
    
    module.exports = {
        labels_get,
        labels_getById,
        labels_put,
        labels_post,
        labels_delete,
        
    }