const Label = require ('../models/Label')

const labels_get = (req, res, next) =>{
    res.send('all labels');
    };

const labels_getById = async (req, res, next)=>{
    const id = req.params.id
    const label = await Label.findOne({_id : id});
    res.send(label);
}

const labels_put = async (req, res, next)=>{
    const id = req.params.id
    const {name} = req.body
    Label.findOneAndUpdate({_id : id}, {name}).then(function(){
        Label.findOne({_id: id}).then(function(label){
            res.send(label)
        })
    });
   
}

const labels_post = async (req, res, next)=>{
    const {name, location} = req.body;
    const userId = req.userId;
    const newLabel = await Label.create({
        userId,
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