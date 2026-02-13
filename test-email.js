const nodemailer = require('nodemailer');

async function main() {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'harikikeerthi@gmail.com',
            pass: 'pvmohaxgutlujpwc',
        },
    });

    try {
        console.log('Sending test email...');
        const info = await transporter.sendMail({
            from: '"Test Script" <harikikeerthi@gmail.com>',
            to: 'harikikeerthi@gmail.com', // Send to self to test
            subject: 'Test Email from LoanHero Debugger',
            text: 'If you receive this, the email credentials and network are working correctly.',
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

main();
