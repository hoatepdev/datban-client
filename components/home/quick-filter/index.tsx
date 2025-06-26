"use client";
import React, { useState } from "react";
import {
  Utensils,
  MapPin,
  Clock,
  Gift,
  DollarSign,
  ChevronDown,
  X,
  Filter as FilterIcon,
  Search as SearchIcon,
} from "lucide-react";
import { motion } from "framer-motion";

const CUISINES = ["Vietnamese", "Japanese", "BBQ", "Buffet", "Vegetarian"];
const AREAS = [
  "Hoan Kiem",
  "District 1",
  "Thao Dien",
  "Ba Dinh",
  "Hai Ba Trung",
];
const TIMES = ["Lunch", "Dinner", "Late Night", "Weekend"];
const PROMOS = ["Discounts", "Free Dish", "Happy Hour"];
const PRICES = ["Under 100K", "100K–200K", "Over 300K"];

const FILTERS = [
  {
    key: "cuisine",
    label: "Cuisine",
    icon: Utensils,
    placeholder: "Select cuisine",
    options: CUISINES,
  },
  {
    key: "area",
    label: "Area",
    icon: MapPin,
    placeholder: "Select area",
    options: AREAS,
  },
  {
    key: "time",
    label: "Time",
    icon: Clock,
    placeholder: "Choose time",
    options: TIMES,
  },
  {
    key: "promo",
    label: "Promotions",
    icon: Gift,
    options: PROMOS,
    placeholder: "Select promo",
  },
  {
    key: "price",
    label: "Price",
    icon: DollarSign,
    options: PRICES,
    placeholder: "Select price",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const QuickFilterBar = () => {
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [open, setOpen] = useState<string | null>(null);
  const [results, setResults] = useState<number | null>(null);

  const handleSelect = (key: string, value: string) => {
    setSelected((prev) => ({ ...prev, [key]: value }));
    setOpen(null);
  };
  const handleRemove = (key: string) => {
    setSelected((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };
  const handleReset = () => {
    setSelected({});
    setResults(null);
  };
  const handleFilter = () => {
    setResults(Math.floor(Math.random() * 100) + 1);
  };

  return (
    <motion.div
      className="relative z-20 mx-auto w-full max-w-7xl px-4"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <div className="flex flex-col items-stretch gap-3 rounded-xl bg-white px-4 py-8 shadow-lg drop-shadow-lg md:flex-row md:gap-4 md:px-6">
        {/* Dropdowns */}
        <div className="flex flex-1 flex-col gap-3 md:flex-row md:gap-4">
          {FILTERS.map((filter) => (
            <div key={filter.key} className="relative min-w-[140px] flex-1">
              <label className="mb-1 flex items-center text-sm font-semibold text-gray-700">
                <filter.icon className="mr-1 h-4 w-4 text-red-500" />
                {filter.label}
              </label>
              <button
                type="button"
                className={`flex w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 font-medium text-gray-700 shadow-sm transition-all hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200 ${open === filter.key ? "ring-2 ring-red-400" : ""}`}
                onClick={() => setOpen(open === filter.key ? null : filter.key)}
              >
                <span
                  className={
                    selected[filter.key] ? "text-gray-900" : "text-gray-400"
                  }
                >
                  {selected[filter.key] || filter.placeholder}
                </span>
                <ChevronDown
                  className={`ml-2 h-4 w-4 transition-transform ${open === filter.key ? "rotate-180" : ""}`}
                />
              </button>
              {/* Dropdown */}
              {open === filter.key && (
                <div className="animate-fadeIn absolute left-0 z-30 mt-2 w-full min-w-[160px] rounded-xl border border-gray-100 bg-white shadow-lg">
                  {filter.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className="w-full rounded-lg px-4 py-2 text-left text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600"
                      onClick={() => handleSelect(filter.key, option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* CTA Button */}
        <div className="mt-2 flex items-end justify-end md:mt-0 md:items-center">
          <button
            type="button"
            className="flex min-w-[180px] items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-base font-bold text-white shadow-md transition-all hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={handleFilter}
          >
            <SearchIcon className="h-5 w-5" />
            Search Restaurants
          </button>
        </div>
      </div>
      <style>{`
        .animate-fadeIn { animation: fadeIn 0.18s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
      `}</style>
    </motion.div>
  );
};

export default QuickFilterBar;
