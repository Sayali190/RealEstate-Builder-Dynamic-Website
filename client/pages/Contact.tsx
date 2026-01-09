import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, AlertCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      //const res = await fetch("/api/contact", {
      const res = await fetch("http://13.60.81.243:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to send message");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Contact error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Get In Touch
          </h1>
          <p className="text-muted-foreground">
            We'd love to hear from you. Send us a message.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {/* Email */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Email</h3>
                <p className="text-muted-foreground">support@realestate.com</p>
                <p className="text-sm text-muted-foreground">
                  Response time: 24 hours
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
                <p className="text-sm text-muted-foreground">
                  Mon - Fri, 9am - 6pm EST
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Address</h3>
                <p className="text-muted-foreground">
                  123 Main Street
                  <br />
                  New York, NY 10001
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-lg flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{error}</span>
                    </div>
                  )}

                  {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                      <span className="text-sm">
                        Thank you! We've received your message and will get back
                        to you soon.
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Name
                      </label>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Email
                      </label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Phone (optional)
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
