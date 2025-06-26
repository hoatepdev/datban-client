// "use client";
// import Loading from "@/components/loading";
// import PostList from "@/components/ssr";
import HeroBanner from "@/components/home/hero-banner";
import QuickFilterBar from "@/components/home/quick-filter";
import FeaturedRestaurants from "@/components/home/featured-restaurants";
import React from "react";
import FlashDealSection from "@/components/home/flash-deal";

export const refLoading = React.createRef();
export default function Home() {
  return (
    <div className="h-full bg-[#fef6f5]">
      <HeroBanner />
      <div className="-mt-16">
        <QuickFilterBar />
      </div>
      <FeaturedRestaurants />
      <FlashDealSection />
      {/* <Loading ref={refLoading} /> */}
      {/* <PostList /> */}
      {/* <Image
        src="/images/regions/ba-dinh-district.jpeg"
        alt="ba-dinh-district"
        width={1000}
        height={1000}
        // className="h-10 w-10"
      /> */}
    </div>
  );
}
