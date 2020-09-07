const User = require('../models/user.modal')
const {GeneralError} = require('../utils/errors')
const {validPassword, genPassword, issueJWT} = require('../utils/utils')

const findUserById = async(userId) => {
    try {
        const user = await User.findById(userId)
        return user
    } catch (error) {
        console.log('error', error)
        throw new GeneralError('Something Went Wrong..')
    }
}

const findDuplicateUsers = async (email) => {
    try {
        let userStatus = await User.findDuplicateEmails(email)
        console.log('userStatus' ,userStatus)
        return userStatus
    } catch (error) {
        console.log('error', error)
        throw new GeneralError('Something Went Wrong..')
    }
};
/**
 * @param {*} user - User data from the rest endpoint
 * @returns - returns registerd user data with tokens
 */
const signUp = async (user) => {
    try {
        /****
         * This uses brcrpt to hash user passwords
         */
        const hashPassword = await genPassword(user.password)
        user.password = hashPassword
        
        /****
         * This uses brcrpt to hash user passwords
         */
        const newUser = new User({...user})
        await newUser.save({user})

        /**
         * Genarate a signed jwt and save it in jwt token list for new user
         */
        const signedJWT = issueJWT(user)
        newUser.tokens = newUser.tokens.concat({ token: signedJWT.token })
        await newUser.save()

        let data = {
            ...user,
            token : signedJWT.token,
            expires: signedJWT.expires
        }
        return data
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

module.exports = {
    signUp,
    findDuplicateUsers,
    findUserById
}