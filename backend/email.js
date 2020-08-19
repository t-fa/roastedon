const nodemailer = require('nodemailer');

async function verifyAccount(receiver, userId, token) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Email Bot" <foo@example.com>', // sender address
    to: `${receiver}`, // list of receivers
    subject: 'Please verify your E-Mail Address', // Subject line
    text: `Thank you for creating an account with RoastedOn! Please click the link below to confirm your email:
        roastedon.co/${userId}/${token} . This link will expire in 24 hours.`, // plain text body
    html: `Thank you for creating an account with RoastedOn! Please click <a href='roastedon.co/${userId}/${token}'>here</a> to confirm your email. This link will expire in 24 hours.
    `, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

verifyAccount().catch(console.error);

async function resetPass(receiver, userId, token) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Email Bot" <foo@example.com>', // sender address
    to: `${receiver}`, // list of receivers
    subject: 'Password Reset', // Subject line
    text: `Here is the password reset link you requested:
        roastedon.co/${userId}/${token} . This link will expire in 30 minutes. If you did not request to change your password, you can disregard this email.`, // plain text body
    html: `Here is the password reset link you requested:
    <a href='roastedon.co/${userId}/${token}'>here</a>. This link will expire in 30 minutes. If you did not request to change your password, you can disregard this email.
    `, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

resetPass().catch(console.error);

module.exports.verifyAccount = verifyAccount;
module.exports.resetPass = resetPass;
