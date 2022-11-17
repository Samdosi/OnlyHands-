const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = async (receiver, sender, subject, body, res) => {
    const msg = {
        to: receiver,
        from: sender,
        subject: subject,
        html: body,
    };
    await sgMail.send(msg, (error) => {
        if (error) {
            console.log(error);
            return res.status(400).json({ "success": false, "message": error.message }).end();
        } else {
            return res.status(200).json({ "success": true, "message": "Email sent!" }).end();
        }
    });
}

module.exports = { msg };