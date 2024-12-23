require ("dotenv").config()
import nodemailer , {Transporter} from "nodemailer"
import ejs from "ejs"
import path from "path"

interface EmailOption{
    email: string;
    subject: string;
    template: string;
    data:{[key:string]:any};
}

const sendMail = async (options: EmailOption): Promise<void> => {
    const transporter: Transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        },
        secure: true,
    });
    const { email, subject, template, data } = options;

    // get the path to the mail template file
    const templatePath = path.join(__dirname, "../mails", template);

    const html: string = await ejs.renderFile(templatePath, data)

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject,
        html
    };
    await transporter.sendMail(mailOptions);
}

export default sendMail;
