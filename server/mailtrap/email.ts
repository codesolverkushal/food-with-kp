import { generateWelcomeEmailHtml, htmlContent } from './htmlEmail';
import {client,sender} from "./mailtrap";


export const sendVerificationEmail = async (email: string, verificationToken: string) => {
    const recipient = [{ email:"mohitsinghkpsc@gmail.com" }];

    try {
        const res = await client.send({
            from: sender,
            to: recipient,
            subject: 'Verify your email',
            html:htmlContent.replace("{verificationToken}", verificationToken),
            category: 'Email Verification'
        });
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send email verification")

    }
};


export const sendWelcomeEmail = async (email: string, name: string) => {
    const recipient = [{ email:"mohitsinghkpsc@gmail.com" }];
    const htmlContent = generateWelcomeEmailHtml(name);
    try {
        const res = await client.send({
            from: sender,
            to: recipient,
            subject: 'Welcome to KP-Hotel',
            html:htmlContent,
            template_variables:{
                company_info_name:"KP-Hotel",
                name:name
            }
        });
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send welcome email")
    }
}