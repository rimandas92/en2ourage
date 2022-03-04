const {validationResult, matchedData } = require('express-validator');

const UserType = require('../models/usertypeModel');


exports.AddUsertype_POST = async (req, res) => {
    const errors = validationResult(req);
    const user = matchedData(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({
            message: errors.array()[0].msg,
            status: false,
            result: user
        });
    }else{
        const utFullName = await UserType.findOne({
            ufullname: req.body.ufullname
        })

        if(utFullName) {
            return res.status(200).json({
                message: 'Usertype full-name is already exist',
                status: false
            })
        }

        const utShortName = await UserType.findOne({
            ushortname: req.body.ushortname
        })

        if(utShortName) {
            return res.status(200).json({
                message: 'Usertype short-name is already exist',
                status: false
            })
        }

        const newUsertype = new UserType({
            ufullname: req.body.ufullname,
            ushortname: req.body.ushortname
        })

        try {
            newUsertype.save((err, data) => {
                if(err) {
                    throw new Error(err)
                }else{
                    return res.status(200).json({
                        message: 'Usertype added successfully',
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

exports.GetAllUsertype_GET = async (req, res) => {
    try{
        let usertypeList = await UserType.find();
        if(usertypeList){
            return res.status(200).json({
                message: 'All usertype list',
                status: true,
                result: usertypeList
            })
        }else{
            return res.status(200).json({
                message: 'Fail to get usertype list',
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

exports.GetUsertypeById_POST = async (req, res) => {
    let id = req.body.id;
    try{
        let usertype = await UserType.findById({_id: id});
        if(usertype){
            return res.status(200).json({
                message: 'get usertype',
                status: true,
                result: usertype
            })
        }else{
            return res.status(200).json({
                message: 'Fail to get usertype',
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

exports.UpdateUsertype_POST = async (req, res) => {
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
        const utFullName = await UserType.findOne({
            ufullname: req.body.ufullname
        })

        if(utFullName) {
            return res.status(200).json({
                message: 'Usertype full-name is already exist',
                status: false
            })
        }

        const utShortName = await UserType.findOne({
            ushortname: req.body.ushortname
        })

        if(utShortName) {
            return res.status(200).json({
                message: 'Usertype short-name is already exist',
                status: false
            })
        }

        try {
            await UserType.findByIdAndUpdate(
                {_id: id}, 
                {$set:{
                    ufullname: req.body.ufullname,
                    ushortname: req.body.ushortname
                }}
            ).exec((err, result) => {
                if(err) {
                    throw new Error(err)
                }else{
                    return res.status(200).json({
                        message: 'usertype updated successfully',
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

