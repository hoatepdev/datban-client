"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Utensils, Search, Menu, X } from "lucide-react";
import AdvancedSearchDialog from "./advanced-search-dialog";
import AuthWrap from "../auth/auth-wrap";
import { TYPE_AUTH } from "@/constants/auth";
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const refAuthDialog = useRef<{ open: () => void; close: () => void }>(null);

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex flex-shrink-0 items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500">
              <Utensils className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              dat<span className="text-red-500">ban</span>.vn
            </span>
          </div>

          {/* Search Bar - Hidden on mobile */}
          {/* <div className="mx-8 max-w-lg flex-1">
            <div
              className="relative cursor-pointer"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <div className="w-full rounded-full border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-500 transition-colors hover:bg-gray-100">
                Tìm nhà hàng, món ăn hoặc khu vực...
              </div>
            </div>
          </div> */}
          <div className="mx-8 hidden max-w-lg flex-1 lg:flex">
            <div
              className="relative w-96"
              onClick={() => setIsSearchOpen(true)}
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Tìm nhà hàng, món ăn hoặc khu vực..."
                className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 lg:flex">
            <a
              href="#"
              className="text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-red-500"
            >
              Khám phá
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-red-500"
            >
              Ưu đãi
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-red-500"
            >
              Nhà hàng
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-red-500"
            >
              Blog
            </a>
          </nav>

          {/* Auth & CTA Buttons - Desktop */}
          <div className="ml-8 hidden items-center space-x-4 lg:flex">
            <Button
              className="rounded-lg bg-red-600 px-6 py-2 font-medium text-white shadow-sm transition-all duration-200 hover:bg-red-700 hover:shadow-md"
              onClick={() => refAuthDialog.current?.open()}
            >
              Đăng nhập
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-4 lg:hidden">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Tìm nhà hàng, món ăn hoặc khu vực..."
              className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t bg-white lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <a
                href="#"
                className="block rounded-md px-3 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-red-50 hover:text-red-500"
              >
                Khám phá
              </a>
              <a
                href="#"
                className="block rounded-md px-3 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-red-50 hover:text-red-500"
              >
                Ưu đãi
              </a>
              <a
                href="#"
                className="block rounded-md px-3 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-red-50 hover:text-red-500"
              >
                Nhà hàng
              </a>
              <a
                href="#"
                className="block rounded-md px-3 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-red-50 hover:text-red-500"
              >
                Blog
              </a>

              {/* Mobile Auth Buttons */}
              <div className="space-y-2 pt-4">
                <Button
                  // variant="ghost"
                  className="w-full justify-start font-medium text-gray-700 hover:bg-red-50 hover:text-red-500"
                  onClick={() => refAuthDialog.current?.open()}
                >
                  Đăng nhập
                </Button>
                {/* <Button
                  className="w-full rounded-lg bg-red-600 font-medium text-white hover:bg-red-700"
                >
                  Dành cho Nhà hàng
                </Button> */}
              </div>
            </div>
          </div>
        )}
      </div>
      <AdvancedSearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <AuthWrap ref={refAuthDialog} type={TYPE_AUTH.DIALOG} />
    </header>
  );
};

export default Header;
