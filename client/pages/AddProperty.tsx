import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle } from "lucide-react";

export default function AddProperty() {
  const navigate = useNavigate();
  const [isAuthed, setIsAuthed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    address: "",
    type: "",
    imageUrl: "",
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // const res = await fetch("/api/auth/me", {
      const res = await fetch("http://13.60.81.243:5000/api/auth/me", {
        credentials: "include",
      });
      if (res.ok) {
        setIsAuthed(true);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseInt(formData.price),
          images: formData.imageUrl ? [formData.imageUrl] : [],
        }),
        credentials: "include",
      });

      if (res.ok) {
        navigate("/account");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to add property");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Add property error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (!isAuthed) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">List a Property</CardTitle>
              <CardDescription>
                Fill in the details of your property
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

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Property Title
                  </label>
                  <Input
                    type="text"
                    name="title"
                    placeholder="e.g., Beautiful Modern House"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Description
                  </label>
                  <Textarea
                    name="description"
                    placeholder="Describe your property..."
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Price ($)
                    </label>
                    <Input
                      type="number"
                      name="price"
                      placeholder="500000"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Type
                    </label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) =>
                        handleSelectChange("type", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="House">House</SelectItem>
                        <SelectItem value="Apartment">Apartment</SelectItem>
                        <SelectItem value="Condo">Condo</SelectItem>
                        <SelectItem value="Townhouse">Townhouse</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    City
                  </label>
                  <Select
                    value={formData.city}
                    onValueChange={(value) =>
                      handleSelectChange("city", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New York">New York</SelectItem>
                      <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                      <SelectItem value="Miami">Miami</SelectItem>
                      <SelectItem value="Chicago">Chicago</SelectItem>
                      <SelectItem value="San Francisco">San Francisco</SelectItem>
                      <SelectItem value="Seattle">Seattle</SelectItem>
                      <SelectItem value="Boston">Boston</SelectItem>
                      <SelectItem value="Houston">Houston</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Address
                  </label>
                  <Input
                    type="text"
                    name="address"
                    placeholder="123 Main Street"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Image URL
                  </label>
                  <Input
                    type="url"
                    name="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={handleChange}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? "Adding property..." : "List Property"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
