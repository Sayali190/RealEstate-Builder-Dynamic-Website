import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, User, Calendar, LogOut } from "lucide-react";

interface UserData {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface Property {
  _id: string;
  title: string;
  price: number;
  city: string;
  address: string;
  images: string[];
  type: string;
}

export default function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);

      // Fetch user info
      const userRes = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (!userRes.ok) {
        navigate("/login");
        return;
      }

      const userData = await userRes.json();
      setUser(userData);

      // Fetch user's properties
      const propsRes = await fetch("/api/users/me/properties", {
        credentials: "include",
      });

      if (propsRes.ok) {
        const propsData = await propsRes.json();
        setProperties(propsData.properties || []);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
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

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            My Account
          </h1>
          <p className="text-muted-foreground">Manage your profile and properties</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Info Card */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-5 h-5 text-primary" />
                    <p className="text-sm text-muted-foreground">Full Name</p>
                  </div>
                  <p className="font-semibold text-foreground">{user.name}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-5 h-5 text-primary" />
                    <p className="text-sm text-muted-foreground">Email</p>
                  </div>
                  <p className="font-semibold text-foreground">{user.email}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <p className="text-sm text-muted-foreground">Member Since</p>
                  </div>
                  <p className="font-semibold text-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="border-t border-border pt-4">
                  <Link to="/add-property" className="w-full block mb-2">
                    <Button className="w-full">Add New Property</Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* My Properties */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                My Properties
              </h2>
              <p className="text-muted-foreground">
                Properties you've listed for sale
              </p>
            </div>

            {properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.map((property) => (
                  <PropertyCard
                    key={property._id}
                    id={property._id}
                    title={property.title}
                    price={property.price}
                    city={property.city}
                    address={property.address}
                    image={property.images?.[0]}
                    type={property.type}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    You haven't listed any properties yet.
                  </p>
                  <Link to="/add-property">
                    <Button>List Your First Property</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
