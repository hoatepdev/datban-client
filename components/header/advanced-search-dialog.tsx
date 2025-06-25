import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  X,
  Clock,
  MapPin,
  Star,
  TrendingUp,
  Utensils,
} from "lucide-react";

// Mock data
const quickSuggestions = [
  "Lẩu",
  "Buffet Nhật",
  "Quận 1",
  "Ưu đãi 50%",
  "BBQ",
  "Hải sản",
  "Quận 7",
  "Món Việt",
];

const recentSearches = [
  "Lẩu Thái Tom Yum",
  "Buffet Nhật Bản Quận 1",
  "Nhà hàng hải sản",
  "Quận 1",
];

const featuredRestaurants = [
  {
    id: 1,
    name: "Nhà hàng Ngon Villa",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    area: "Quận 1",
    rating: 4.8,
    cuisine: "Món Việt",
  },
  {
    id: 2,
    name: "Sushi Masa",
    image:
      "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=400&h=300&fit=crop",
    area: "Quận 3",
    rating: 4.6,
    cuisine: "Nhật Bản",
  },
  {
    id: 3,
    name: "Lẩu Thái Tom Yum",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    area: "Quận 7",
    rating: 4.7,
    cuisine: "Thái Lan",
  },
];

const searchResults = [
  {
    id: 1,
    name: "Nhà hàng Hải Sản Biển Xanh",
    image:
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&h=300&fit=crop",
    area: "Quận 1",
    rating: 4.9,
    cuisine: "Hải sản",
    priceRange: "200,000 - 500,000đ",
  },
  {
    id: 2,
    name: "Buffet Nhật Bản Sakura",
    image:
      "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=400&h=300&fit=crop",
    area: "Quận 3",
    rating: 4.6,
    cuisine: "Nhật Bản",
    priceRange: "299,000 - 599,000đ",
  },
  {
    id: 3,
    name: "Lẩu Thái Tom Yum Goong",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    area: "Quận 7",
    rating: 4.8,
    cuisine: "Thái Lan",
    priceRange: "150,000 - 300,000đ",
  },
  {
    id: 4,
    name: "BBQ Garden Nướng Hàn Quốc",
    image:
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&h=300&fit=crop",
    area: "Quận 2",
    rating: 4.5,
    cuisine: "Hàn Quốc",
    priceRange: "180,000 - 400,000đ",
  },
];

// Types
interface Restaurant {
  id: number;
  name: string;
  image: string;
  area: string;
  rating: number;
  cuisine: string;
  priceRange?: string;
}

interface AdvancedSearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

function AdvancedSearchDialog({ isOpen, onClose }: AdvancedSearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [filteredResults, setFilteredResults] = useState<Restaurant[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchQuery.trim()) {
      setShowResults(true);
      const filtered = searchResults.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.cuisine
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          restaurant.area.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredResults(filtered);
    } else {
      setShowResults(false);
      setFilteredResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleQuickSearch = (suggestion: string) => {
    setSearchQuery(suggestion);
  };

  const handleRecentSearch = (search: string) => {
    setSearchQuery(search);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
    inputRef.current?.focus();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-white via-gray-50 to-red-50 p-0 shadow-2xl md:h-[80vh]">
        <div className="flex h-full flex-col">
          <div className="rounded-t-2xl border-b bg-white/80 p-8 shadow-sm backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Tìm kiếm nhà hàng
              </h2>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400" />
              <Input
                ref={inputRef}
                type="text"
                placeholder="Tìm nhà hàng, món ăn hoặc khu vực..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-xl border-2 border-gray-200 bg-white/90 py-4 pl-14 pr-12 text-lg shadow-sm transition-all focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-red-500"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>

          {/* <ScrollArea className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 via-white to-red-50 px-2 md:px-6"> */}
          <ScrollArea className="max-h-[calc(100vh-300px)] flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 via-white to-red-50 px-2 md:px-6">
            {!showResults ? (
              <div className="space-y-10">
                <div>
                  <h3 className="m-4 flex items-center text-base font-semibold text-gray-900">
                    <TrendingUp className="mr-2 h-5 w-5 text-red-500" />
                    Gợi ý nhanh
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {quickSuggestions.map((suggestion, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-2 text-base shadow-sm transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                        onClick={() => handleQuickSearch(suggestion)}
                      >
                        {suggestion}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-4 flex items-center text-base font-semibold text-gray-900">
                    <Clock className="mr-2 h-5 w-5 text-gray-500" />
                    Lịch sử tìm kiếm
                  </h3>
                  <div className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <div
                        key={index}
                        className="group flex cursor-pointer items-center rounded-lg p-3 transition hover:bg-white hover:shadow-sm"
                        onClick={() => handleRecentSearch(search)}
                      >
                        <Clock className="mr-3 h-5 w-5 text-gray-400 transition group-hover:text-red-400" />
                        <span className="font-medium text-gray-700 transition group-hover:text-red-600">
                          {search}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-4 flex items-center text-base font-semibold text-gray-900">
                    <Star className="mr-2 h-5 w-5 text-yellow-500" />
                    Nhà hàng nổi bật
                  </h3>
                  <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {featuredRestaurants.map((restaurant) => (
                      <div
                        key={restaurant.id}
                        className="group cursor-pointer rounded-xl border border-gray-100 bg-white p-5 shadow-md transition-shadow hover:border-red-200 hover:shadow-xl"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={restaurant.image}
                            alt={restaurant.name}
                            className="h-14 w-14 rounded-lg border border-gray-200 object-cover transition group-hover:border-red-200"
                          />
                          <div className="flex-1">
                            <h4 className="text-base font-semibold text-gray-900 transition group-hover:text-red-600">
                              {restaurant.name}
                            </h4>
                            <div className="mt-1 flex items-center space-x-3">
                              <span className="flex items-center text-xs text-gray-500">
                                <MapPin className="mr-1 h-4 w-4" />
                                {restaurant.area}
                              </span>
                              <span className="flex items-center text-xs text-yellow-600">
                                <Star className="mr-1 h-4 w-4 fill-current" />
                                {restaurant.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 md:p-10">
                <h3 className="mb-6 text-base font-semibold text-gray-900">
                  Kết quả tìm kiếm cho &quot;{searchQuery}&quot; -{" "}
                  {filteredResults.length} kết quả
                </h3>
                <div className="space-y-5">
                  {filteredResults.map((restaurant) => (
                    <div
                      key={restaurant.id}
                      className="group flex cursor-pointer items-center gap-5 rounded-2xl border border-gray-100 bg-white p-5 transition-shadow hover:shadow-xl"
                    >
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="h-20 w-20 rounded-lg border border-gray-200 object-cover transition group-hover:border-red-200"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="mb-1 truncate text-lg font-semibold text-gray-900 group-hover:text-red-600">
                          {restaurant.name}
                        </h4>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <MapPin className="mr-1 h-4 w-4" />
                            {restaurant.area}
                          </span>
                          <span className="flex items-center">
                            <Utensils className="mr-1 h-4 w-4" />
                            {restaurant.cuisine}
                          </span>
                          <span className="flex items-center">
                            <Star className="mr-1 h-4 w-4 fill-current text-yellow-500" />
                            {restaurant.rating}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {restaurant.priceRange}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white shadow-md hover:bg-red-700"
                        style={{ backgroundColor: "#E53935" }}
                      >
                        Đặt bàn
                      </Button>
                    </div>
                  ))}

                  {filteredResults.length === 0 && (
                    <div className="py-16 text-center">
                      <div className="mb-4 text-gray-300">
                        <Search className="mx-auto h-14 w-14" />
                      </div>
                      <p className="text-lg font-medium text-gray-500">
                        Không tìm thấy kết quả nào cho &quot;{searchQuery}
                        &quot;
                      </p>
                      <p className="mt-2 text-base text-gray-400">
                        Hãy thử tìm kiếm với từ khóa khác
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </ScrollArea>
          {/* </ScrollArea> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AdvancedSearchDialog;
