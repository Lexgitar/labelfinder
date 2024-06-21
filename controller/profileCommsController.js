const ProfileComment = require('../models/ProfileComments')

var ObjectId = require('mongodb').ObjectId;
const { handleDocErrors } = require('../controller/authController')

const profileComment_get = async (req, res, next) => {
    const allPrComms = await ProfileComment.find()
    try {
        if (allPrComms) {
            res.send(allPrComms)
        }
    } catch (error) {
        res.status(400).json(error.message)
    }


};

const profileComment_getByProfileId = async (req, res, next) => {
    const { id } = req.params
    ProfileComment.findOne({ profileId: id }).then(function (prComm) {
        res.send(prComm)
    })
    //complete else/error case
}

const profileComment_post = async (req, res, next) => {
    const { body, authorId } = req.body;
    const profileId = req.query.id
    const userItemId = req.query.userItemId

    const findItem = await ProfileComment.findOne({ profileId })
    if (!findItem && userItemId !== profileId) {
        try {
            const newProfileComm = await ProfileComment.create({
                profileId,
                comments: { _id: new ObjectId(), body, authorId },
                _id: new ObjectId()


            })

            res.send(newProfileComm);
            console.log('done')
        } catch (err) {

            const errors = handleDocErrors(err)
            console.log(errors)
            res.status(400).json(errors.message)

        }

    } else if (findItem) {
        next()
    } else {
        res.status(400).json(' pcp - Cannot set up more than 1 profile')
    }
}

const profileComment_put = async (req, res, next) => {
    const profileId = req.params.id
    const { body, authorId } = req.body
    const deleteId = req.query.delete
    const userItemId = req.query.userItemId
    const comment = { _id: new ObjectId(), body, authorId }

    try {
        if (profileId, body, authorId && !deleteId && profileId !== userItemId) {
            ProfileComment.updateOne({ profileId }, { $push: { comments: comment } }).then(function () {
                ProfileComment.findOne({ profileId }).then(function (profileComment) {
                    console.log('clog pcput', profileId, body, authorId)

                    res.send(profileComment)
                })
            });
        } else if (deleteId) {
            next()
        } else {
            throw new Error(' pccput update failed')
        }

    } catch (err) {

        res.status(400).json(err.message)
    }


}

const profileComment_delete = async (req, res, next) => {
    const { id } = req.params
    const deletePayload = await ProfileComment.deleteOne({ profileId: id })
    try {
        if (deletePayload.deletedCount === 1) {
            res.send('Profile comms deleted')
        } else if (deletePayload.deletedCount === 0) {
            res.send('Attempt not succesful')
        } else {
            throw new Error('Delete unsuccesful')
        }
    } catch (err) {

        res.status(400).json(err.message)
    }
}


const comment_delete = async (req, res, next) => {
    const profileId = req.params.id
    const deleteId = req.query.delete

    console.log('whattt')

    try {
        if (deleteId) {
            ProfileComment.updateOne({ profileId }, { $pull: { comments: { authorId: deleteId } } }).then(function () {
                ProfileComment.findOne({ profileId }).then(function (profileComment) {
                    console.log('1com del', profileComment)

                    res.send(profileComment)
                })
            });
        } else {
            throw new Error(' pccput delete update failed')
        }

    } catch (err) {

        res.status(400).json(err.message)
    }

}


module.exports = {
    profileComment_get,
    profileComment_getByProfileId,
    profileComment_post,
    profileComment_put,
    profileComment_delete,
    comment_delete,

}