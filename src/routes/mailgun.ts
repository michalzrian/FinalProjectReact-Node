const express = require("express");
const dotenv = require("dotenv");
const mg = require("mailgun-js");

dotenv.config();

const mailgun = () =>
    mg({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
    });
const router = express();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/email", (req: any, res: any) => {
    const { email, subject, message } = req.body;
    mailgun()
        .messages()
        .send(
            {
                from: "John Doe <jd@jd.com>",
                to: `${email}`,
                subject: `${subject}`,
                html: `<p>${message}</p>`,
            },
            (error: any, body: any) => {
                if (error) {
                    console.log(error);
                    res.status(500).send({ message: "Error in sending email" });
                } else {
                    console.log(body);
                    res.send({ message: "Email sent successfully" });
                }
            }
        );
});
export default router;