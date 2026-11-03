"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { ArrowRight, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1920&q=80`;

const slides = [
  {
    image: unsplash("1492691527719-9d1e07e534b4"),
    tag: "Photo studios · Cyc walls",
    title: "Your next shoot deserves the right light.",
    text: "Book daylight lofts and infinity cyc walls by the hour. Pay only for the time you shoot.",
  },
  {
    image: unsplash("1478737270239-2f02b77fc618"),
    tag: "Podcast lounges · Ready to record",
    title: "Hit record in a room that sounds pro.",
    text: "Sound-treated podcast rooms with broadcast mics and cameras, ready when you walk in.",
  },
  {
    image: unsplash("1598488035139-bdbb2231ce04"),
    tag: "Music suites · Sound stages",
    title: "Create where the magic gets made.",
    text: "From vocal booths to full sound stages, find a space that fits your sound and your crew.",
  },
];

export default function Banner() {
  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        loop
        speed={900}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-[78vh] min-h-[520px] w-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.title}>
            {({ isActive }) => (
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={slide.image}
                  alt={slide.tag}
                  fill
                  unoptimized
                  priority={i === 0}
                  className={`object-cover transition-transform duration-[7000ms] ease-out ${isActive ? "scale-110" : "scale-100"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />
                {/* soft spotlight glow */}
                <div className="pointer-events-none absolute -top-40 -left-40 size-[36rem] rounded-full bg-spotlight/25 blur-3xl" />

                <div className="container relative mx-auto flex h-full items-center px-4">
                  <div key={isActive ? "on" : "off"} className="max-w-2xl text-white">
                    <span className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
                      <Sparkles className="size-3.5 text-spotlight" />
                      {slide.tag}
                    </span>
                    <h1 className="mt-5 animate-fade-up text-4xl leading-[1.05] font-extrabold tracking-tight [animation-delay:120ms] sm:text-6xl">
                      {slide.title}
                    </h1>
                    <p className="mt-5 max-w-xl animate-fade-up text-base text-white/80 [animation-delay:240ms] sm:text-lg">
                      {slide.text}
                    </p>
                    <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:360ms]">
                      <Link href="/studios" className={buttonVariants({ size: "lg", className: "h-12 rounded-full px-7 text-base" })}>
                        Explore Studios <ArrowRight />
                      </Link>
                      <Link
                        href="/add-studio"
                        className={buttonVariants({
                          variant: "outline",
                          size: "lg",
                          className: "h-12 rounded-full border-white/40 bg-white/10 px-7 text-base text-white backdrop-blur hover:bg-white/20 hover:text-white",
                        })}
                      >
                        Host Your Space
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
