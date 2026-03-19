const UserModel = require("../Models/user-schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const Signupcontrol = async (req, res) => {
  try {
    const { name, email, password, role, adminCode } = req.body;
    const lowerEmail = email.toLowerCase();

    // Check admin code
    if (role === "Admin") {
      if (adminCode !== process.env.ADMIN_SIGNUP_CODE) {
        return res.status(403).json({
          message: "Invalid admin code!",
          success: false,
        });
      }
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email: lowerEmail });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists", success: false });
    }

    // Save user
    const userModel = new UserModel({ name, email: lowerEmail, password, role });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();

    // ✅ Respond success FIRST before email
    res.status(201).json({ message: "Signup successful", success: true });

    // ✅ Send email AFTER response — failure won't affect signup
    try {
      await sgMail.send({
        from: process.env.SENDGRID_FROM,
        to: lowerEmail,
        subject: "Registration Successful! 🎉",
        html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Welcome, ${name}! 🎉</h2>
          <p>Your registration was <strong>successful!</strong></p>
          <p>You can now login with your email and password.</p>
          <p>Email: <strong>${lowerEmail}</strong></p>
        </div>`,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
    }

  } catch (error) {
    console.error("Signup error:", error.message);
    return res.status(500).json({ message: error.message, success: false });
  }
};

const Logincontrol = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(403).json({ message: "Email not found", success: false });
    }

    const ispassequal = await bcrypt.compare(password, user.password);
    if (!ispassequal) {
      return res.status(403).json({ message: "Incorrect password", success: false });
    }

    const access_token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.ACCESS_SECRET_KEY,
      { expiresIn: "20m" }
    );
    const refresh_token = jwt.sign(
      { _id: user._id },
      process.env.REFRESH_SECRET_KEY,
      { expiresIn: "15d" }
    );

    // ✅ Fixed for production — secure + sameSite none for cross domain
    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 20 * 60 * 1000,
    });

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      success: true,
      role: user.role,
      email,
      name: user.name,
    });

  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { Logincontrol, Signupcontrol };
