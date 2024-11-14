import * as dotenv from "dotenv";
dotenv.config();

export const googleReCaptcha = async (req, res) => {
  const { recaptchaToken } = JSON.parse(req.body.body);

  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${process.env.RECAPTCHA_SECRET}&response=${recaptchaToken}`,
    }
  );
  if (response.ok) {
    const data = await response.json();

    if (data.success) {
      res.status(200).json({ success: true });
    } else {
      res
        .status(400)
        .json({ success: false, error: "reCAPTCHA verification failed" });
    }
  } else {
    res
      .status(500)
      .json({ success: false, error: "Failed to verify reCAPTCHA" });
  }
};
