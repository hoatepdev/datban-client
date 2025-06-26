"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const mockRestaurants = [
  {
    id: 1,
    name: "Hanoi Coffee",
    image: "/restaurants/photo-001.jpeg",
    location: "Ba Dinh, Hanoi",
    description: "Cozy spot for Vietnamese coffee & brunch.",
    rating: 4.7,
    reviews: 120,
    priceRange: "50K – 150K/person",
    promotion: "-30%",
    link: "/restaurants/hanoi-coffee",
    tags: ["Coffee", "Brunch", "Central"],
  },
  {
    id: 2,
    name: "Saigon Grill",
    image: "/restaurants/photo-002.jpg",
    location: "District 1, HCMC",
    description: "Modern grill with city views & cocktails.",
    rating: 4.5,
    reviews: 98,
    priceRange: "200K – 400K/person",
    promotion: "Free Drink",
    link: "/restaurants/saigon-grill",
    tags: ["Grill", "Rooftop", "South"],
  },
  {
    id: 3,
    name: "Pho 24",
    image: "/restaurants/photo-003.jpg",
    location: "Hoan Kiem, Hanoi",
    description: "Classic pho with rich, authentic flavors.",
    rating: 4.8,
    reviews: 210,
    priceRange: "40K – 80K/person",
    promotion: "Available Today",
    link: "/restaurants/pho-24",
    tags: ["Pho", "Noodle", "Central"],
  },
  {
    id: 4,
    name: "Bistro Bliss",
    image: "/restaurants/photo-004.jpg",
    location: "District 3, HCMC",
    description: "Upscale bistro serving French-inspired cuisine.",
    rating: 4.9,
    reviews: 150,
    priceRange: "300K – 500K/person",
    promotion: "10% Off",
    link: "/restaurants/bistro-bliss",
    tags: ["French", "Upscale", "South"],
  },
  {
    id: 5,
    name: "Sushi Haven",
    image: "/restaurants/photo-005.jpg",
    location: "Hoan Kiem, Hanoi",
    description: "Authentic sushi experience with fresh seafood.",
    rating: 4.8,
    reviews: 180,
    priceRange: "100K – 200K/person",
    promotion: "Buy 1 Get 1 Free",
    link: "/restaurants/sushi-haven",
    tags: ["Sushi", "Seafood", "Central"],
  },
  {
    id: 6,
    name: "Taco Fiesta",
    image: "/restaurants/photo-006.jpg",
    location: "District 1, HCMC",
    description: "Vibrant taco joint with Mexican flavors.",
    rating: 4.6,
    reviews: 120,
    priceRange: "80K – 150K/person",
    promotion: "Free Delivery",
    link: "/restaurants/taco-fiesta",
    tags: ["Mexican", "Tacos", "South"],
  },
  {
    id: 7,
    name: "Burger Binge",
    image: "/restaurants/photo-007.jpg",
    location: "District 2, HCMC",
    description: "Gourmet burgers with a variety of toppings.",
    rating: 4.7,
    reviews: 130,
    priceRange: "120K – 180K/person",
    promotion: "Free Fries",
    link: "/restaurants/burger-binge",
    tags: ["Burgers", "American", "East"],
  },
  {
    id: 8,
    name: "Pasta Paradise",
    image: "/restaurants/photo-008.jpg",
    location: "Ba Dinh, Hanoi",
    description: "Authentic Italian pasta dishes.",
    rating: 4.9,
    reviews: 160,
    priceRange: "150K – 250K/person",
    promotion: "Free Dessert",
    link: "/restaurants/pasta-paradise",
    tags: ["Italian", "Pasta", "Central"],
  },
  // Add more mock restaurants as needed
];

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Central", value: "Central" },
  { label: "South", value: "South" },
  { label: "Coffee", value: "Coffee" },
  { label: "Grill", value: "Grill" },
  { label: "Pho", value: "Pho" },
];

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <div className="flex items-center gap-0.5">
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <svg
            key={i}
            className="h-4 w-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
          </svg>
        ))}
      {halfStar && (
        <svg
          className="h-4 w-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"
            fill="url(#half)"
          />
        </svg>
      )}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <svg
            key={i}
            className="h-4 w-4 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
          </svg>
        ))}
    </div>
  );
}

export default function FeaturedRestaurants() {
  const [selectedTag, setSelectedTag] = useState("all");
  const filtered =
    selectedTag === "all"
      ? mockRestaurants
      : mockRestaurants.filter((r) => r.tags.includes(selectedTag));

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10">
      <h2 className="mb-6 text-left text-3xl font-bold sm:text-4xl">
        🔥 Featured Restaurants
      </h2>
      <div className="mb-8 flex flex-wrap gap-2">
        {filterOptions.map((tag) => (
          <button
            key={tag.value}
            className={`rounded-full border px-4 py-1 text-sm font-medium transition-colors ${selectedTag === tag.value ? "border-red-500 bg-red-500 text-white" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-100"}`}
            onClick={() => setSelectedTag(tag.value)}
          >
            {tag.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((restaurant) => (
          <Link key={restaurant.id} href={restaurant.link} className="group">
            <Card className="flex h-full cursor-pointer flex-col overflow-hidden rounded-xl shadow-md transition hover:shadow-xl">
              {/* <img
                src={restaurant.image}
                alt={restaurant.name}
                className="h-48 w-full rounded-t-xl object-cover"
                loading="lazy"
              /> */}
              <Image
                src={restaurant.image}
                alt={restaurant.name}
                className="h-48 w-full rounded-t-xl object-cover transition-all duration-300 group-hover:scale-105"
                loading="lazy"
                width={500}
                height={500}
              />
              <CardContent className="flex flex-1 flex-col gap-2 p-5">
                <div className="mb-1 flex items-center justify-between">
                  <span className="truncate text-lg font-bold">
                    {restaurant.name}
                  </span>
                  <Badge className="rounded-md bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                    {restaurant.promotion}
                  </Badge>
                </div>
                <span className="mb-1 text-xs text-gray-400">
                  {restaurant.location}
                </span>
                <span className="mb-2 truncate text-sm text-gray-600">
                  {restaurant.description}
                </span>
                <div className="mb-2 flex items-center gap-2">
                  <StarRating rating={restaurant.rating} />
                  <span className="text-xs text-gray-500">
                    {restaurant.rating} ({restaurant.reviews})
                  </span>
                </div>
                <span className="mb-3 text-xs font-medium text-gray-700">
                  {restaurant.priceRange}
                </span>
                <Button className="mt-auto w-full rounded-full bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600">
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
