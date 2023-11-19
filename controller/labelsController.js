const Label = require ('../models/Label')
const {handleDocErrors} = require('../controller/authController')

const labels_get = async (req, res, next) =>{
    Label.find().then(function(label){
        res.send(label)
    })

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

    
    try{
        const newLabel = await Label.create({
        userId,
        name,
        location
    })
    res.send(newLabel);
    }catch(err){
       const errors = handleDocErrors(err)
       console.log(errors)
       res.send(errors + ' haha')
    }
}

const labels_delete = async(req, res, next)=>{
    const {id} = req.params
    Label.deleteOne({_id:id}).then(function(label){
        res.send(label)
    })
}
    
    module.exports = {
        labels_get,
        labels_getById,
        labels_put,
        labels_post,
        labels_delete,
        
    }