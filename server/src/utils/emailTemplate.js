export const generateForgotPasswordEmailTemplate = (resetPasswordURL) => `
    <div
            style="
                font-family: Arial, sans-serif;
                margin: 0 auto;
                padding: 30px 20px 30px;
                background: #f4f7ff;
                font-size: 12px;
                font-weight: 400;
                color: #434343;
            "
        >
            <main>
                <div
                    style="
                        margin: auto;
                        margin-top: 70px;
                        padding: 50px 20px 50px;
                        max-width: 680px;
                        background: #ffffff;
                        border-radius: 30px;
                        text-align: center;
                    "
                >
                    <div style="width: 100%; max-width: 489px; margin: 0 auto">
                        <h1
                            style="
                                margin: 0;
                                font-size: 24px;
                                font-weight: 700;
                                color: #1f1f1f;
                            "
                        >
                            Reset Your Password
                        </h1>
                        <div style="text-align: left; margin-top: 30px">
                            <p
                                style="
                                    margin: 0;
                                    margin-top: 17px;
                                "
                            >
                                Dear User,
                            </p>
                            <p
                                style="
                                    margin: 0;
                                    margin-top: 17px;
                                    letter-spacing: 0.56px;
                                "
                            >
                                We received a request to reset your password.
                                Click the link below to set a new password. The
                                link is valid for
                                <span style="font-weight: 600; color: #1f1f1f"
                                    >15 minutes</span
                                >. If you didn’t request a password reset,
                                please ignore this email.
                            </p>
                        </div>
                        <a
                            href="${resetPasswordURL}"
                            style="
                                display: inline-block;
                                margin-top: 40px;
                                padding: 12px 25px;
                                font-size: 14px;
                                font-weight: 600;
                                color: #ffffff;
                                background-color: #ba3d4f;
                                text-decoration: none;
                                border-radius: 8px;
                            "
                        >
                            Reset Password
                        </a>
                    </div>
                </div>

                <p
                    style="
                        max-width: 400px;
                        margin: 0 auto;
                        margin-top: 60px;
                        text-align: center;
                        font-weight: 400;
                        color: #8c8c8c;
                    "
                >
                    Need help? Ask at
                    <a href="/" style="color: #499fb6; text-decoration: none"
                        >aayushkmr710@gmail.com</a
                    >
                    or visit our
                    <a
                        href=""
                        target="_blank"
                        style="color: #499fb6; text-decoration: none"
                        ><br />Help Center</a
                    >
                </p>
            </main>
            <footer
                style="margin-top: 20px; text-align: center; font-size: 12px"
            >
                <p style="line-height: 1rem">
                    Thank you, <br />
                    ..........
                </p>
                <p style="font-size: 8px">
                    This is an automated message. Please do not reply to this
                    email.
                </p>
            </footer>
        </div>
`;
