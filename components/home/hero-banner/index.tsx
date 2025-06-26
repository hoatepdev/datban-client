"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const SUGGESTIONS = [
  { icon: "🍖", label: "Nướng" },
  { icon: "🍲", label: "Lẩu" },
  { icon: "🍣", label: "Sushi" },
  { icon: "🥩", label: "Bò" },
  { icon: "🍕", label: "Pizza" },
  { icon: "🍜", label: "Phở" },
  { icon: "🥗", label: "Salad" },
  { icon: "🍗", label: "Gà" },
  { icon: "🍔", label: "Hamburger" },
  { icon: "🍟", label: "Khoai tây chiên" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const HeroBanner = () => {
  return (
    <section className="relative flex h-[80vh] min-h-[500px] w-full items-center bg-[url('/images/hero-banner/hero1.png')] bg-cover bg-center">
      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col items-center px-4 md:flex-row md:items-center md:justify-between">
        <div className="w-full max-w-2xl flex-1 text-center md:text-left">
          <motion.h1
            className="mb-4 text-4xl font-extrabold leading-tight text-white drop-shadow-lg md:text-6xl"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            // transition={{ delay: 0.05 }}
          >
            Đặt bàn nhanh chóng,
            <br className="hidden md:block" />
            <span className="text-[#E53935]">ưu đãi mỗi ngày</span>
          </motion.h1>
          <motion.p
            className="mx-auto mb-20 max-w-md text-base text-gray-200 drop-shadow md:mx-0 md:text-lg"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            // transition={{ delay: 0.1 }}
          >
            Tìm và giữ chỗ trước tại hàng ngàn nhà hàng yêu thích. Tránh xếp
            hàng, nhận ưu đãi độc quyền.
          </motion.p>
          {/* Search bar */}
          {/* <motion.form
            className="mb-4"
            autoComplete="off"
            onSubmit={(e) => e.preventDefault()}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            // transition={{ delay: 0.15 }}
          >
            <div className="group relative mx-auto max-w-lg transition-all md:mx-0">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E53935] transition-colors duration-200 group-focus-within:text-[#b71c1c]">
                <Search className="h-7 w-7" strokeWidth={3} />
              </span>
              <Input
                type="text"
                placeholder="Tìm món ăn, khu vực hoặc tên nhà hàng..."
                className="rounded-full border-2 border-[#E53935] bg-white py-5 pl-14 pr-4 text-lg font-semibold text-gray-900 shadow-[0_4px_32px_0_rgba(229,57,53,0.15)] outline-none transition-all duration-200 hover:shadow-[0_6px_40px_0_rgba(229,57,53,0.18)] focus:border-[#b71c1c] focus:ring-4 focus:ring-[#E53935]/30"
                aria-label="Tìm kiếm nhà hàng, món ăn, khu vực"
              />
              <div className="pointer-events-none absolute inset-0 rounded-full opacity-0 ring-2 ring-[#E53935]/30 transition-opacity duration-200 group-focus-within:opacity-100" />
            </div>
          </motion.form> */}
          {/* Suggestion tags */}
          <motion.div
            className="mb-12 flex flex-wrap gap-3 pr-10 md:justify-start"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            // transition={{ delay: 0.2 }}
          >
            {SUGGESTIONS.map((item) => (
              <Button
                key={item.label}
                variant="secondary"
                size="sm"
                className="rounded-full border border-red-200 bg-white/80 px-3 py-1 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-red-100"
                type="button"
              >
                <span className="mr-1 text-lg">{item.icon}</span>
                {item.label}
              </Button>
            ))}
          </motion.div>
          {/* CTA Button */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            // transition={{ delay: 0.25 }}
            className="flex md:justify-start"
          >
            <Button
              type="button"
              className="w-full transform rounded-full bg-[#E53935] px-10 py-6 text-xl font-bold text-white shadow-xl transition-all duration-200 hover:scale-105 hover:bg-[#c62828] md:w-auto"
            >
              Đặt bàn ngay
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
