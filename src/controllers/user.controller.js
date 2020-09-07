const logger = require("../config/logger/logger");
const userService = require('../services/user.service')
const {GeneralError, BadRequest} = require('../utils/errors')
const Constants = require('../constants/constants')

const signUp = async (req, res,next) => {
    try {
        let userStatus = await userService.findDuplicateUsers(req.body.email)
        if(!userStatus) {
            let user = req.body
            let data = await userService.signUp(user)
            let response = {
                message: Constants.userMessage.SIGNUP_SUCCESS,
                data,
            }
            res.status(201).send(response)
        } else {
            throw new BadRequest('Email Already exsists.')
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    signUp
}