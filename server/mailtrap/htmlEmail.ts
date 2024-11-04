export const htmlContent: string = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Email Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
                margin: 0;
                padding: 0;
                color: #444;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 30px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                overflow: hidden;
            }
            .header {
                background-color: #003366;
                color: #ffffff;
                padding: 20px;
                text-align: center;
                border-radius: 8px 8px 0 0;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .content {
                padding: 20px;
                text-align: center;
                font-size: 16px;
                line-height: 1.6;
            }
            .content .code {
                display: inline-block;
                margin: 20px 0;
                padding: 12px 20px;
                font-size: 20px;
                font-weight: bold;
                color: #003366;
                border: 1px solid #dddddd;
                border-radius: 4px;
                background-color: #f1f1f1;
            }
            .footer {
                font-size: 14px;
                color: #999999;
                padding: 15px;
                text-align: center;
                background-color: #f0f0f0;
                border-radius: 0 0 8px 8px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Verify Your Email</h1>
            </div>
            <div class="content">
                <p>Hello,</p>
                <p>Thank you for registering with KP-Hotel's. To complete your registration, please verify your email address by entering the following verification code:</p>
                <div class="code">{verificationToken}</div>
                <p>If you did not request this verification, please disregard this email.</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 KP-Hotel's. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
`;

export const generateWelcomeEmailHtml = (name: string) => `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
                margin: 0;
                padding: 0;
                color: #444;
            }
            .email-container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                overflow: hidden;
            }
            .email-header {
                background-color: #003366;
                color: #ffffff;
                padding: 20px;
                text-align: center;
            }
            .email-header h1 {
                font-size: 24px;
                margin: 0;
            }
            .email-body {
                padding: 20px 30px;
                background-color: #ffffff;
                font-size: 16px;
                line-height: 1.6;
            }
            .email-footer {
                padding: 15px;
                background-color: #f0f0f0;
                font-size: 14px;
                text-align: center;
                color: #777777;
            }
            .button {
                display: inline-block;
                padding: 12px 25px;
                margin-top: 20px;
                font-size: 16px;
                color: #ffffff;
                background-color: #003366;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                <h1>Welcome to KP-Hotel's!</h1>
            </div>
            <div class="email-body">
                <p>Hi ${name},</p>
                <p>Congratulations! Your email has been successfully verified.</p>
                <p>We’re excited to have you on board at KP-Hotel's. Explore our platform and indulge in our services tailored just for you.</p>
                <p>If you have any questions or need assistance, feel free to reach out to us.</p>
                <a href="#" class="button">Visit KP-Hotel's</a>
                <p>Best Regards,<br/>The KP-Hotel's Team</p>
            </div>
            <div class="email-footer">
                <p>&copy; 2024 KP-Hotel's. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
`;
