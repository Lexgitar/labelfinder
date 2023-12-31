const Band = require('../models/Band')
const {handleDocErrors} = require('../controller/authController')

const bands_get = async (req, res, next) =>{
    Band.find().then(function(bands){
        res.send(bands)
    })

};

const bands_getById = async (req, res, next)=>{
    const {id} = req.params
    Band.findOne({_id:id}).then(function(band){
        res.send(band)
    })
}

const bands_put = async  (req, res, next)=>{
    const id = req.params.id;
    const {name, location} = req.body;
    console.log(name)
    // const updatedBand = await Band.findByIdAndUpdate({_id:id}, {name, location});
    // res.send(updatedBand);
    Band.findOneAndUpdate({_id:id}, {name, location }).then(function(){
        Band.findOne({ _id:id}).then(function(band){
            res.send(band)
        })
    });


    // const found = await Band.findOne({_id:id})
    // res.send(found);

}
//make new band  + check only 1 item/user
const bands_post = async (req, res, next)=>{
    const {name, location} = req.body;
    const userId = req.userId;
    const findItem = await Band.findOne({userId})
    if(!findItem){
       try{
        const newBand = await Band.create({
            userId,
            name,
            location,
            
        })
    
        res.send(newBand);

       }catch(err){
        
        const errors = handleDocErrors(err)
        console.log(errors)
        res.send(errors + ' haha')

       }}else{
        res.send('Cannot set up more than 1 profile')
       }    
    }

//delete by id
const bands_delete = async (req, res, next)=>{
    const {id} = req.params
    const deletedBand = await Band.deleteOne({_id :id})
    res.send(deletedBand)
}
    
    module.exports = {
        bands_get,
        bands_getById,
        bands_put,
        bands_post,
        bands_delete,
        
    }