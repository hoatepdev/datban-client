// "use client";
import Loading from "@/components/loading";
import PostList from "@/components/ssr";
import Image from "next/image";
import React from "react";

export const refLoading = React.createRef();
export default function Home() {
  return (
    <div className="h-full bg-yellow-500">
      {/* <Loading ref={refLoading} /> */}
      <PostList />
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
