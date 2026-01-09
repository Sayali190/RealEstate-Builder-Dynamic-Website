import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, MapPin } from "lucide-react";

interface Property {
  _id: string;
  title: string;
  price: number;
  city: string;
  address: string;
  images: string[];
  type: string;
}

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      // const res = await fetch("/api/properties?limit=6");
      const res = await fetch("http://13.60.81.243:5000/api/properties?limit=6");
      if (res.ok) {
        const data = await res.json();
        setProperties(data.properties || []);
      }
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/properties?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Find Your Dream{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Home
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover beautiful properties in the most desirable locations.
              Your next home is just a click away.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Search properties by title, city, or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
                <Search className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-12 gap-2"
              >
                Search
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            {/* Quick Links */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link to="/properties?city=New%20York">
                <Button variant="outline">
                  <MapPin className="w-4 h-4 mr-2" />
                  New York
                </Button>
              </Link>
              <Link to="/properties?city=Los%20Angeles">
                <Button variant="outline">
                  <MapPin className="w-4 h-4 mr-2" />
                  Los Angeles
                </Button>
              </Link>
              <Link to="/properties?city=Miami">
                <Button variant="outline">
                  <MapPin className="w-4 h-4 mr-2" />
                  Miami
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Featured Properties
              </h2>
              <p className="text-muted-foreground">
                Handpicked properties just for you
              </p>
            </div>
            <Link to="/properties">
              <Button variant="outline" className="gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-muted rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No properties available at the moment
              </p>
              <Link to="/contact">
                <Button>Contact Us</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Have a Property to Sell?
          </h2>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            List your property on our platform and reach thousands of potential
            buyers. It's free and easy!
          </p>
          <Link to="/signup">
            <Button
              size="lg"
              variant="outline"
              className="text-primary border-white hover:bg-white"
            >
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-foreground mb-4">RealEstate</h3>
              <p className="text-sm text-muted-foreground">
                Your trusted partner in finding the perfect home.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/" className="hover:text-primary transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/properties" className="hover:text-primary transition">
                    Properties
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-primary transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8">
            <p className="text-center text-sm text-muted-foreground">
              © 2024 RealEstate. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
