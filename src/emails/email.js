const sgMail = require('@sendgrid/mail');

const sendgridAPI = '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'

sgMail.setApiKey(sendgridAPI);

sgMail.send({
    to: 'dantespardaforce@gmail.com',
    from: 'menaaziz27@gmail.com',
    subject: 'Sending with SendGrid',
    text: 'this is my content'
}).then(() => {
    console.log('Email sent')
})
    .catch((error) => {
        console.error(error)
    });




