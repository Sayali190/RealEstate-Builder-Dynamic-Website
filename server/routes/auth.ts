import { Router, RequestHandler } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { User } from "../models/users";

console.log("AUTH ROUTER LOADED");

/* ================== SCHEMAS ================== */

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

/* ================== HANDLERS ================== */

export const handleSignup: RequestHandler = async (req, res) => {
  try {
    const data = signupSchema.parse(req.body);

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) return res.status(400).json({ error: "Email already in use" });

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await User.create({
      name: data.name,
      email: data.email,
      passwordHash,
    });

    res.cookie("auth_token", user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    if (error.name === "ZodError") {
      return res.status(400).json({ error: "Invalid request", details: error.errors });
    }
    res.status(400).json({ error: "Invalid request" });
  }
};

export const handleLogin: RequestHandler = async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);

    const user = await User.findOne({ email: data.email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(data.password, user.passwordHash);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    res.cookie("auth_token", user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(400).json({ error: "Invalid request" });
  }
};

export const handleGetMe: RequestHandler = async (req, res) => {
  const token = req.cookies.auth_token;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  const user = await User.findById(token);
  if (!user) return res.status(401).json({ error: "User not found" });

  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  });
};

export const handleLogout: RequestHandler = (req, res) => {
  res.clearCookie("auth_token");
  res.status(200).json({ message: "Logged out successfully" });
};

/* ================== OPTIONAL ROUTER EXPORT ================== */
const router = Router();
router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.post("/logout", handleLogout);
router.get("/me", handleGetMe);

export { router as authRouter };
