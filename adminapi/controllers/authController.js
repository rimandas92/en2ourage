const {validationResult, matchedData } = require('express-validator');
const  bcrypt = require('bcrypt');
const  jwt = require('jsonwebtoken');

const Admin = require('../models/adminModel');



// admin registration
exports.AdminRegistration_POST = async (req, res) => {
    const errors = validationResult(req);
    const user = matchedData(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({
            message: errors.array()[0].msg,
            status: false,
            result: user
        });
    }else{
        const userData = await Admin.findOne({
            email: req.body.email
        })

        if(userData) {
            return res.status(200).json({
                message: 'Email is already registered',
                status: false
            })
        }

        const hash = await bcrypt.hash(req.body.password, 10);

        const newUser = new Admin({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash
        })

        try {
            newUser.save((err, data) => {
                if(err) {
                    throw new Error(err)
                }else{
                    return res.status(200).json({
                        message: 'You have successfully registered, please login',
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

//admin login
exports.AdminLogin_POST = async (req, res) => {
    const errors = validationResult(req);
    const user = matchedData(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({
            message: errors.array()[0].msg,
            status: false,
            result: user
        });
    } else {
        try {
            const userData = await Admin.findOne({
                email: req.body.email
            });
            
            if(!userData) {
                return res.status(200).json({
                    message: "Please login with your registered email",
                    status: false
                });
            }
    
            const checkPassword = await bcrypt.compare(
                req.body.password,
                userData.password
            );
            if (!checkPassword) {
                return res.status(200).json({
                    message: "That’s not the right password",
                    status: false
                });
            } else {
                const token = jwt.sign({
                    email: userData.email,
                    id: userData._id
                },process.env.ADMIN_JWT_KEY);
    
                return res.status(200).json({
                    message: "Login Successful",
                    status: true,
                    result: userData,
                    token: token
                });
            }    
        } catch (error) {
            return res.status(400).json({
                message: "Bad Request",
                status: false,
                error: error
            });
        }   
    }
}