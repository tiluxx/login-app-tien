const database = require('../utils/firebase')
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)

const CreateNewAccessCode = async (phoneNumber) => {
    let minBar = 100000
    let maxBar = 999999
    const accessCode = Math.floor(Math.random() * (maxBar - minBar + 1)) + minBar

    const user = await database
        .collection('users')
        .doc('/' + phoneNumber + '/')
        .get()
    if (!!user.data()) {
        await database
            .collection('users')
            .doc('/' + phoneNumber + '/')
            .update({
                accessCode: accessCode,
            })
    } else {
        await database
            .collection('users')
            .doc('/' + phoneNumber + '/')
            .create({
                phoneNumber: phoneNumber,
                accessCode: accessCode,
            })
    }

    return accessCode
}

const ValidateAccessCode = async (accessCode, phoneNumber) => {
    try {
        const document = database.collection('users').doc(phoneNumber)
        const item = await document.get()
        const userInfo = item.data()

        if (accessCode === userInfo.accessCode) {
            await document.update({
                accessCode: '',
            })
            return { success: true }
        } else {
            return { success: false }
        }
    } catch (err) {
        console.log(err)
    }
}

exports.CreateNewAccessCodeHandler = async (req, res, next) => {
    const { phoneNum } = req.body
    try {
        const accessCode = await CreateNewAccessCode(phoneNum)
        await client.messages
            .create({ body: `Your access code to login: ${accessCode}`, from: '+447862125676', to: phoneNum })
        console.log(`Your access code is: ${accessCode}`)
        return res.status(200).json({ success: true, message: `An access code is sent to ${phoneNum}` })
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Something went wrong' })
    }
}

exports.ValidateAccessCodeHandler = async (req, res, next) => {
    const { phoneNum, accessCode } = req.body
    try {
        const { success } = await ValidateAccessCode(Number(accessCode), phoneNum)

        if (success) {
            return res.status(200).json({ success: true, message: 'Access Code Validation Success' })
        } else {
            return res.status(200).json({ success: false, message: "Access code aren't match" })
        }
    } catch (err) {
        return res.status(500).send(err)
    }
}
