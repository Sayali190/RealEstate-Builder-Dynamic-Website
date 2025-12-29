import { Link } from "react-router-dom";
import { MapPin, Bed, Bath, DollarSign } from "lucide-react";

interface PropertyCardProps {
  id: string;
  title: string;
  price: number;
  city: string;
  address: string;
  image?: string;
  type?: string;
}

export function PropertyCard({
  id,
  title,
  price,
  city,
  address,
  image,
  type,
}: PropertyCardProps) {
  return (
    <Link to={`/property/${id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden group">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-light text-primary/30 mb-2">
                  🏠
                </div>
                <p className="text-sm text-muted-foreground">No image</p>
              </div>
            </div>
          )}
          {type && (
            <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
              {type}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Price */}
          <div className="mb-2 flex items-center gap-1">
            <DollarSign className="w-5 h-5 text-secondary" />
            <span className="text-2xl font-bold text-primary">
              {(price / 1000000).toFixed(1)}M
            </span>
            <span className="text-xs text-muted-foreground">
              {price.toLocaleString()}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
            {title}
          </h3>

          {/* Location */}
          <div className="flex items-start gap-1 mb-3">
            <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground font-medium">{city}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {address}
              </p>
            </div>
          </div>

          {/* Features (placeholder) */}
          <div className="flex gap-3 text-xs text-muted-foreground border-t border-border pt-3">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>3 beds</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>2 baths</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
