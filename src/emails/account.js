const nodemailer = require('nodemailer');

const sendgridTransporter = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransporter({
    auth: {
        api_key: 'API_KEY'
    }
}))


transporter.sendMail({
    to: 'menaaziz789@gmail.com',
    from: 'menaaziz27@gmail.com',
    subject: 'Sending with SendGrid',
    html: '<h1>this is my content</h1>'
}).then(() => console.log('email is sent'))
    .catch(err => console.log(err))
