import {Router, RequestHandler } from "express";
import { z } from "zod";
//import router from "./auth";
import { authRouter } from "./auth";

// In-memory store for demo
interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  city: string;
  address: string;
  images: string[];
  type: string;
  status: string;
  ownerUserId: string;
  createdAt: string;
}

const properties: Map<string, Property> = new Map([
  [
    "1",
    {
      _id: "1",
      title: "Modern Luxury Penthouse",
      description:
        "Stunning penthouse with panoramic city views, floor-to-ceiling windows, and premium finishes throughout. Features 3 spacious bedrooms, 2 bathrooms, open-concept living, and a private terrace with hot tub.",
      price: 2500000,
      city: "New York",
      address: "123 Park Avenue, Manhattan",
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      ],
      type: "Apartment",
      status: "for sale",
      ownerUserId: "owner1",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  [
    "2",
    {
      _id: "2",
      title: "Beachfront Villa",
      description:
        "Exclusive beachfront villa with direct access to private beach. Modern architecture with open living spaces, chef's kitchen, home theater, gym, and spa. Perfect for luxury living.",
      price: 3800000,
      city: "Miami",
      address: "456 Ocean Boulevard, Miami Beach",
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      ],
      type: "House",
      status: "for sale",
      ownerUserId: "owner2",
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  [
    "3",
    {
      _id: "3",
      title: "Downtown Condo",
      description:
        "Sophisticated condo in the heart of downtown. Features 2 bedrooms, 2 bathrooms, modern kitchen with stainless steel appliances, in-unit laundry, and parking garage.",
      price: 1200000,
      city: "Los Angeles",
      address: "789 Downtown Lane, Los Angeles",
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      ],
      type: "Condo",
      status: "for sale",
      ownerUserId: "owner1",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  [
    "4",
    {
      _id: "4",
      title: "Historic Townhouse",
      description:
        "Charming historic townhouse with original hardwood floors, exposed brick, and updated modern amenities. 4 floors of living space, perfect for families or entrepreneurs.",
      price: 850000,
      city: "Boston",
      address: "321 Historic Street, Boston",
      images: [
        "https://images.unsplash.com/photo-1570129477492-45a003537e1d?w=800&q=80",
      ],
      type: "Townhouse",
      status: "for sale",
      ownerUserId: "owner3",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  [
    "5",
    {
      _id: "5",
      title: "Tech Campus Office",
      description:
        "State-of-the-art commercial office space in tech hub. Open floor plan, meeting rooms, cafeteria, and modern amenities. Ideal for startups or established tech companies.",
      price: 5000000,
      city: "San Francisco",
      address: "555 Tech Park Drive, San Francisco",
      images: [
        "https://images.unsplash.com/photo-1497366216548-495652f823d1?w=800&q=80",
      ],
      type: "Commercial",
      status: "for sale",
      ownerUserId: "owner2",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  [
    "6",
    {
      _id: "6",
      title: "Suburban Family Home",
      description:
        "Spacious family home in quiet suburban neighborhood. 4 bedrooms, 3 bathrooms, large backyard with pool, two-car garage, and excellent schools nearby.",
      price: 650000,
      city: "Chicago",
      address: "999 Maple Road, Chicago",
      images: [
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
      ],
      type: "House",
      status: "for sale",
      ownerUserId: "owner4",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  [
    "7",
    {
      _id: "7",
      title: "Urban Studio",
      description:
        "Compact but stylish studio apartment perfect for young professionals. Modern finishes, efficient layout, and located in vibrant neighborhood with great restaurants and nightlife.",
      price: 450000,
      city: "New York",
      address: "111 East Village, Manhattan",
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      ],
      type: "Apartment",
      status: "for sale",
      ownerUserId: "owner5",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  [
    "8",
    {
      _id: "8",
      title: "Waterfront Retreat",
      description:
        "Peaceful waterfront property with stunning views. Private dock, boat house, mature landscaping, and modern updates. Ideal vacation home or full-time residence.",
      price: 1950000,
      city: "Seattle",
      address: "222 Waterfront Way, Seattle",
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      ],
      type: "House",
      status: "for sale",
      ownerUserId: "owner1",
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  [
    "9",
    {
      _id: "9",
      title: "Investment Property Complex",
      description:
        "Multi-unit residential complex with 6 apartments, high occupancy rate, and consistent rental income. Recent renovations and professional management.",
      price: 2800000,
      city: "Houston",
      address: "333 Investment Boulevard, Houston",
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      ],
      type: "Commercial",
      status: "for sale",
      ownerUserId: "owner3",
      createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
]);

export const handleGetProperties: RequestHandler = (req, res) => {
  const { q, city, minPrice, maxPrice, limit = 10 } = req.query;

  let filtered = Array.from(properties.values());

  // Filter by search query
  if (q && typeof q === "string") {
    const query = q.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.address.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }

  // Filter by city
  if (city && typeof city === "string") {
    filtered = filtered.filter((p) => p.city === city);
  }

  // Filter by price range
  if (minPrice && typeof minPrice === "string") {
    const min = parseInt(minPrice);
    filtered = filtered.filter((p) => p.price >= min);
  }

  if (maxPrice && typeof maxPrice === "string") {
    const max = parseInt(maxPrice);
    filtered = filtered.filter((p) => p.price <= max);
  }

  // Sort by newest first
  filtered.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Apply limit
  const limitNum = Math.min(parseInt(String(limit)), 100);
  const paginatedProperties = filtered.slice(0, limitNum);

  res.status(200).json({
    properties: paginatedProperties,
    total: filtered.length,
  });
};

export const handleGetProperty: RequestHandler = (req, res) => {
  const { id } = req.params;

  const property = properties.get(id);
  if (!property) {
    return res.status(404).json({ error: "Property not found" });
  }

  res.status(200).json(property);
};

export const handleCreateProperty: RequestHandler = (req, res) => {
  const userId = req.cookies.auth_token;

  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const { title, description, price, city, address, type, images } = req.body;

  // Validate
  if (!title || !description || !price || !city || !address || !type) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const id = Math.random().toString(36).substr(2, 9);
  const property: Property = {
    _id: id,
    title,
    description,
    price: parseInt(price),
    city,
    address,
    type,
    images: images || [],
    status: "for sale",
    ownerUserId: userId,
    createdAt: new Date().toISOString(),
  };

  properties.set(id, property);

  res.status(201).json(property);
};

export const handleGetUserProperties: RequestHandler = (req, res) => {
  const userId = req.cookies.auth_token;

  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const userProperties = Array.from(properties.values()).filter(
    (p) => p.ownerUserId === userId
  );

  res.status(200).json({ properties: userProperties });
};


//export default router;