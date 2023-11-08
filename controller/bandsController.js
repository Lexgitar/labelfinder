const Band = require('../models/Band')

const bands_get = (req, res, next) =>{
res.send('all bands');
};

const bands_getById = (req, res, next)=>{
    res.send('bands by id')
}

const bands_put = (req, res, next)=>{
    res.send('bands put - by id obviously ')
}

const bands_post = async (req, res, next)=>{
    const {name, location} = req.body;
    const newBand = await Band.create({
        name,
        location
    })

    res.send(newBand);
}

const bands_delete = (req, res, next)=>{
    res.send('bands delete')
}
    
    module.exports = {
        bands_get,
        bands_getById,
        bands_put,
        bands_post,
        bands_delete,
        
    }