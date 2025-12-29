import { RequestHandler } from "express";
import { z } from "zod";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

const contacts: Map<string, Contact> = new Map();

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

export const handleContact: RequestHandler = (req, res) => {
  try {
    const data = contactSchema.parse(req.body);
    const id = Math.random().toString(36).substr(2, 9);
    const contact: Contact = {
      id,
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      message: data.message,
      createdAt: new Date().toISOString(),
    };

    contacts.set(id, contact);
    console.log("New contact message:", contact);

    res.status(201).json({ message: "Message received successfully", id });
  } catch (error: any) {
    console.error("Contact error:", error);
    if (error.name === "ZodError") return res.status(400).json({ error: "Invalid request", details: error.errors });
    res.status(400).json({ error: "Invalid request" });
  }
};
