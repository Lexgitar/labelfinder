const Fan = require ('../models/Fan')

const fans_get = (req, res, next) =>{
    res.send('all fans');
    };

const fans_getById = async (req, res, next)=>{
    const id = req.params.id
    const fan = await Fan.findOne({_id : id});
    res.send(fan);
}

const fans_put = async (req, res, next)=>{
    const id = req.params.id
    const {name} = req.body
    Fan.findOneAndUpdate({_id : id}, {name}).then(function(){
        Fan.findOne({_id: id}).then(function(fan){
            res.send(fan)
        })
    });
   
}

const fans_post = async (req, res, next)=>{
    const {name, location} = req.body;
    const userId = req.userId;
    const findItem = await Fan.findOne({userId})
   
       try{
        const newFan = await Fan.create({
            userId,
            name,
            location
        })
    
        res.send(newFan);

       }catch(err){
        
        const errors = handleDocErrors(err)
        console.log(errors)
        res.send(errors + ' haha')

       }
}

const fans_delete = async (req, res, next)=>{
        const {id} = req.params
        const deletedFan = await Fan.deleteOne({_id :id})
        res.send('deleted ')
}
    
    module.exports = {
        fans_get,
        fans_getById,
        fans_put,
        fans_post,
        fans_delete,
        
    }