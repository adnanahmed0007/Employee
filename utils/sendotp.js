import nodemailer from "nodemailer";

const sendOtp = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                user: "darion42@ethereal.email",
                pass: "8C1PEUSWdsAyVB79Sg",
            },
        });

        const info = await transporter.sendMail({
            from: '"Maddison Foo Koch" <darion42@ethereal.email>',
            to: email,
            subject: "OTP Verification",
            text: String(otp),
            html: `<b>Your OTP is: ${otp}</b>`,
        });

        console.log("✅ Message sent:", info.messageId);
        return true; // ✅ Return success
    } catch (error) {
        console.error("❌ Error sending email:", error);
        return false; // ✅ Return failure
    }
};

export default sendOtp;
