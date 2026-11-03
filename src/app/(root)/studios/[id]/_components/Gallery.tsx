"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import SafeImage from "@/components/shared/SafeImage";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Gallery({ images, title }: { images: string[]; title: string }) {
  return (
    <div className="overflow-hidden rounded-3xl border bg-muted shadow-sm [--swiper-navigation-color:white] [--swiper-navigation-size:22px]">
      <Swiper
        modules={[Navigation, Pagination, Keyboard]}
        navigation={images.length > 1}
        pagination={{ clickable: true }}
        keyboard
        loop={images.length > 1}
        className="aspect-[16/10] w-full"
      >
        {images.map((src, i) => (
          <SwiperSlide key={`${src}-${i}`}>
            <div className="relative h-full w-full">
              <SafeImage src={src} alt={`${title} photo ${i + 1}`} priority={i === 0} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
