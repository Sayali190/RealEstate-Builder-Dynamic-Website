import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Home,
  Calendar,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Share2,
} from "lucide-react";

interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  city: string;
  address: string;
  images: string[];
  type: string;
  createdAt: string;
  ownerUserId: string;
}

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      // const res = await fetch(`/api/properties/${id}`);
      const res = await fetch(`http://13.60.81.243:5000/api/properties/${id}`);
      if (res.ok) {
        const data = await res.json();
        setProperty(data);
      }
    } catch (error) {
      console.error("Failed to fetch property:", error);
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (property?.images.length) {
      setImageIndex((prev) => (prev + 1) % property.images.length);
    }
  };

  const prevImage = () => {
    if (property?.images.length) {
      setImageIndex((prev) =>
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="space-y-4">
            <div className="h-96 bg-muted rounded-lg animate-pulse" />
            <div className="h-10 bg-muted rounded animate-pulse" />
            <div className="h-6 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Property not found
            </h2>
            <p className="text-muted-foreground mb-6">
              The property you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/properties">
              <Button>Back to Properties</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/properties" className="inline-flex items-center gap-2 text-primary hover:text-secondary transition mb-6">
          <ChevronLeft className="w-5 h-5" />
          Back to Properties
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="relative h-96 md:h-[500px] bg-muted rounded-lg overflow-hidden group mb-4">
              {property.images && property.images.length > 0 ? (
                <>
                  <img
                    src={property.images[imageIndex]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {imageIndex + 1} / {property.images.length}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-light text-primary/30 mb-2">
                      🏠
                    </div>
                    <p className="text-muted-foreground">No image available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {property.images && property.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                      idx === imageIndex
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                About this property
              </h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {property.description}
              </p>
            </div>
          </div>

          {/* Details Sidebar */}
          <div>
            {/* Price */}
            <div className="bg-primary/5 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Price</span>
              </div>
              <div className="text-4xl font-bold text-primary mb-2">
                ${(property.price / 1000000).toFixed(1)}M
              </div>
              <p className="text-sm text-muted-foreground">
                ${property.price.toLocaleString()}
              </p>
            </div>

            {/* Property Info */}
            <div className="bg-white border border-border rounded-lg p-6 mb-6 space-y-4">
              {/* Type */}
              <div>
                <p className="text-sm text-muted-foreground mb-1">Type</p>
                <p className="font-semibold text-foreground">{property.type}</p>
              </div>

              {/* Location */}
              <div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Location
                    </p>
                    <p className="font-semibold text-foreground">
                      {property.city}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {property.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Date Listed */}
              <div>
                <div className="flex items-start gap-2">
                  <Calendar className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Listed
                    </p>
                    <p className="font-semibold text-foreground">
                      {new Date(property.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Link to="/contact" className="w-full">
                <Button className="w-full gap-2" size="lg">
                  <Home className="w-5 h-5" />
                  Schedule a Visit
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full gap-2"
                size="lg"
                onClick={() => {
                  navigator.share({
                    title: property.title,
                    text: `Check out this property: ${property.title}`,
                    url: window.location.href,
                  });
                }}
              >
                <Share2 className="w-5 h-5" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
