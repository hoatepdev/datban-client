"use client";
import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

// StarRating component (copied from featured-restaurants)
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

// Custom Tooltip
function Tooltip({
  children,
  content,
}: {
  children: React.ReactNode;
  content: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <span
          className="absolute left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white shadow-lg"
          style={{ top: "-2.2rem" }}
        >
          {content}
        </span>
      )}
    </span>
  );
}

// Countdown Timer Hook
function useCountdown(to: Date) {
  const [timeLeft, setTimeLeft] = useState(() =>
    Math.max(0, Math.floor((to.getTime() - Date.now()) / 1000)),
  );
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(Math.max(0, Math.floor((to.getTime() - Date.now()) / 1000)));
    }, 1000);
    return () => clearInterval(interval);
  }, [to, timeLeft]);
  const hours = Math.floor(timeLeft / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((timeLeft % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  return { timeLeft, formatted: `${hours}:${minutes}:${seconds}` };
}

// Mock Data
const mockDeals = [
  {
    id: 1,
    name: "Bistro Bliss",
    image: "/restaurants/photo-009.jpg",
    location: "Ba Dinh, Hanoi",
    rating: 4.6,
    reviews: 120,
    deal: "40% off until 6PM",
    badge: "-40%",
    price: "From 189K/person",
    endsAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
  },
  {
    id: 2,
    name: "Sushi Haven",
    image: "/restaurants/photo-010.jpg",
    location: "Hoan Kiem, Hanoi",
    rating: 4.8,
    reviews: 180,
    deal: "30% off until 7PM",
    badge: "-30%",
    price: "From 220K/person",
    endsAt: new Date(Date.now() + 90 * 60 * 1000),
  },
  {
    id: 3,
    name: "Taco Fiesta",
    image: "/restaurants/photo-011.jpg",
    location: "District 1, HCMC",
    rating: 4.5,
    reviews: 95,
    deal: "25% off until 5PM",
    badge: "-25%",
    price: "From 150K/person",
    endsAt: new Date(Date.now() + 45 * 60 * 1000),
  },
  {
    id: 4,
    name: "Pasta Paradise",
    image: "/restaurants/photo-012.jpg",
    location: "Ba Dinh, Hanoi",
    rating: 4.9,
    reviews: 160,
    deal: "35% off until 8PM",
    badge: "-35%",
    price: "From 199K/person",
    endsAt: new Date(Date.now() + 110 * 60 * 1000),
  },
  {
    id: 5,
    name: "Seafood Delight",
    image: "/restaurants/photo-013.jpg",
    location: "District 4, HCMC",
    rating: 4.7,
    reviews: 140,
    deal: "20% off until 9PM",
    badge: "-20%",
    price: "From 250K/person",
    endsAt: new Date(Date.now() + 120 * 60 * 1000),
  },
  {
    id: 6,
    name: "Vegan Vibes",
    image: "/restaurants/photo-014.jpg",
    location: "District 2, HCMC",
    rating: 4.9,
    reviews: 160,
    deal: "15% off until 8PM",
    badge: "-15%",
    price: "From 180K/person",
    endsAt: new Date(Date.now() + 100 * 60 * 1000),
  },
  {
    id: 7,
    name: "Steakhouse Frenzy",
    image: "/restaurants/photo-015.jpg",
    location: "Hoan Kiem, Hanoi",
    rating: 4.8,
    reviews: 130,
    deal: "10% off until 10PM",
    badge: "-10%",
    price: "From 300K/person",
    endsAt: new Date(Date.now() + 140 * 60 * 1000),
  },
  {
    id: 8,
    name: "Italian Bistro",
    image: "/restaurants/photo-016.jpg",
    location: "Ba Dinh, Hanoi",
    rating: 4.6,
    reviews: 110,
    deal: "25% off until 6PM",
    badge: "-25%",
    price: "From 220K/person",
    endsAt: new Date(Date.now() + 60 * 60 * 1000),
  },
];

// Flash Deal Card
function FlashDealCard({ deal }: { deal: (typeof mockDeals)[0] }) {
  const { timeLeft, formatted } = useCountdown(deal.endsAt);
  if (timeLeft === 0) return null;
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      whileHover={{
        scale: 1.03,
        // boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="h-full"
    >
      <Card className="keen-slider__slide flex h-full flex-col overflow-hidden rounded-xl shadow-lg transition hover:shadow-xl">
        <div className="relative">
          <Image
            src={deal.image}
            alt={deal.name}
            width={500}
            height={320}
            className="h-40 w-full rounded-t-xl object-cover"
            priority={false}
          />
          <Badge className="absolute left-2 top-2 rounded bg-red-500 px-2 py-1 text-xs text-white">
            {deal.badge}
          </Badge>
        </div>
        <CardContent className="flex flex-1 flex-col gap-2 p-5">
          <span className="truncate text-lg font-bold">{deal.name}</span>
          <span className="text-xs text-gray-400">{deal.location}</span>
          <div className="flex items-center gap-2">
            <StarRating rating={deal.rating} />
            <span className="text-xs text-gray-500">
              {deal.rating} ({deal.reviews})
            </span>
          </div>
          <span className="text-sm text-gray-700">{deal.deal}</span>
          <span className="text-base font-semibold text-gray-900">
            {deal.price}
          </span>
          <Tooltip content={`Deal ends in ${formatted}`}>
            <span className="animate-pulse select-none text-lg font-bold text-red-600">
              {formatted}
            </span>
          </Tooltip>
          <Button className="mt-auto w-full rounded bg-red-500 py-2 text-base font-bold text-white transition hover:bg-red-600">
            Book Now
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function FlashDealSlideshow() {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2, spacing: 20 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 24 },
      },
    },
    drag: true,
    mode: "free-snap",
    created: (s) => setCurrent(0),
    slideChanged: (s) => setCurrent(s.track.details.rel),
  });
  const [current, setCurrent] = useState(0);

  // Optional autoplay
  useEffect(() => {
    if (!instanceRef.current) return;
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 5000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <section className="mx-auto w-full max-w-7xl rounded-xl px-4 py-10">
      <div className="rounded-xl bg-white p-4">
        <h2 className="mb-2 text-3xl font-bold sm:text-4xl">
          🔥 Flash Deals Today
        </h2>
        <p className="mb-6 text-base text-gray-500">
          Book now before the deals expire
        </p>
        <div className="relative">
          <div ref={sliderRef} className="keen-slider py-4">
            {mockDeals.map((deal) => (
              <div key={deal.id} className="">
                <FlashDealCard deal={deal} />
              </div>
            ))}
          </div>
          {/* Arrows */}
          <button
            aria-label="Previous"
            className="absolute -left-10 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow transition hover:bg-gray-100 md:block"
            onClick={() => instanceRef.current?.prev()}
            style={{ transform: "translateY(-50%)" }}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            aria-label="Next"
            className="absolute -right-10 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow transition hover:bg-gray-100 md:block"
            onClick={() => instanceRef.current?.next()}
            style={{ transform: "translateY(-50%)" }}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
