const {validationResult, matchedData } = require('express-validator');

const UserType = require('../models/usertypeModel');
const SecurityLevel = require('../models/securitylevelModel');

exports.AddSecuritylevel_POST = async (req, res) => {
    const errors = validationResult(req);
    const user = matchedData(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({
            message: errors.array()[0].msg,
            status: false,
            result: user
        });
    }else{

        const usertype = await UserType.findOne({
            _id: req.body.usertype
        })


        const title = await SecurityLevel.findOne({
            userTypeId: req.body.usertype,
            title: req.body.title
        })

        if(title) {
            return res.status(200).json({
                message: `\'${req.body.title}\' - this title is already exist for ${usertype.ufullname}`,
                status: false
            })
        }

        const level = await SecurityLevel.findOne({
            userTypeId: req.body.usertype,
            level: req.body.level
        })

        if(level) {
            return res.status(200).json({
                message: `\'${req.body.level}\' - this level is already exist for ${usertype.ufullname}`,
                status: false
            })
        }

        const newSecurityLevel = new SecurityLevel({
            userTypeId: req.body.usertype,
            title: req.body.title,
            level: req.body.level,
            description: req.body.description
        })

        try {
            newSecurityLevel.save((err, data) => {
                if(err) {
                    throw new Error(err)
                }else{
                    return res.status(200).json({
                        message: 'Security level added successfully',
                        status: true,
                        result: data
                    })
                }
            })
        } catch (error) {
            return res.status(400).json({
                message: "Bad Request",
                status: false,
                error: error
            })
        }
    }
}

exports.GetAllSecuritylevel_GET = async (req, res) => {
    try{
        let securitylevel = await SecurityLevel.find().populate('userTypeId');
        if(securitylevel){
            return res.status(200).json({
                message: 'All securitylevel list',
                status: true,
                result: securitylevel
            })
        }else{
            return res.status(200).json({
                message: 'Fail to get securitylevel list',
                status: false,
            })
        }
    }catch (error) {
        return res.status(400).json({
            message: "Bad Request",
            status: false,
            error: error
        })
    }
}

exports.GetSecuritylevelById_POST = async (req, res) => {
    let id = req.body.id;
    try{
        let securitylevel = await SecurityLevel.findById({_id: id}).populate('userTypeId');
        if(securitylevel){
            return res.status(200).json({
                message: 'get securitylevel details',
                status: true,
                result: securitylevel
            })
        }else{
            return res.status(200).json({
                message: 'Fail to get securitylevel details',
                status: false,
            })
        }
    }catch (error) {
        return res.status(400).json({
            message: "Bad Request",
            status: false,
            error: error
        })
    } 
}

exports.UpdateSecuritylevel_POST = async (req, res) => {
    const errors = validationResult(req);
    const user = matchedData(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({
            message: errors.array()[0].msg,
            status: false,
            result: user
        });
    }else{
        const id = req.body.id;
        const usertype = await UserType.findOne({
            _id: req.body.usertype
        })


        const title = await SecurityLevel.findOne({
            userTypeId: req.body.usertype,
            title: req.body.title
        })

        if(title) {
            return res.status(200).json({
                message: `\'${req.body.title}\' - this title is already exist for ${usertype.ufullname}`,
                status: false
            })
        }

        const level = await SecurityLevel.findOne({
            userTypeId: req.body.usertype,
            level: req.body.level
        })

        if(level) {
            return res.status(200).json({
                message: `\'${req.body.level}\' - this level is already exist for ${usertype.ufullname}`,
                status: false
            })
        }

        try {
            await SecurityLevel.findByIdAndUpdate(
                {_id: id}, 
                {$set:{
                    userTypeId: req.body.usertype,
                    title: req.body.title,
                    level: req.body.level,
                    description: req.body.description
                }}
            ).exec((err, result) => {
                if(err) {
                    throw new Error(err)
                }else{
                    return res.status(200).json({
                        message: 'securitylevel updated successfully',
                        status: true,
                        result: result
                    })
                }
            })
        } catch (error) {
            return res.status(400).json({
                message: "Bad Request",
                status: false,
                error: error
            })
        }
    }  
}