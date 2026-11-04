"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { ArrowUpRight, Sparkles } from "lucide-react";
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

// camera viewfinder corners, a nod to the studio theme
function Viewfinder() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-6 hidden md:block lg:inset-10">
      <span className="absolute top-0 left-0 size-8 border-t-2 border-l-2 border-white/60" />
      <span className="absolute top-0 right-0 size-8 border-t-2 border-r-2 border-white/60" />
      <span className="absolute bottom-0 left-0 size-8 border-b-2 border-l-2 border-white/60" />
      <span className="absolute right-0 bottom-0 size-8 border-r-2 border-b-2 border-white/60" />
    </div>
  );
}

function TitleWithOutline({ title }: { title: string }) {
  const words = title.split(" ");
  const last = words.pop();
  return (
    <>
      {words.join(" ")} <span className="text-outline-white">{last}</span>
    </>
  );
}

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
        className="h-[82vh] min-h-[560px] w-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.title}>
            {({ isActive }) => (
              <div className="relative h-full w-full overflow-hidden bg-black">
                <Image
                  src={slide.image}
                  alt={slide.tag}
                  fill
                  unoptimized
                  priority={i === 0}
                  className={`object-cover transition-transform duration-[7000ms] ease-out ${isActive ? "scale-110" : "scale-100"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="pointer-events-none absolute -top-40 -left-40 size-[36rem] rounded-full bg-primary/25 blur-3xl" />
                <Viewfinder />

                {/* camera-style status line */}
                <div className="absolute inset-x-0 top-0 hidden md:block">
                  <div className="container mx-auto flex items-center justify-between px-4 pt-14 font-mono text-[11px] tracking-[0.2em] text-white/70 uppercase lg:pt-16">
                    <span className="flex items-center gap-2">
                      <span className="rec-dot size-2 rounded-full bg-red-500" /> Rec · Studio 0{i + 1} / 0{slides.length}
                    </span>
                    <span>Book by the hour · Dhaka</span>
                  </div>
                </div>

                <div className="container relative mx-auto flex h-full items-center px-4">
                  <div key={isActive ? "on" : "off"} className="max-w-3xl text-white">
                    <span className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-[11px] tracking-[0.18em] uppercase">
                      <Sparkles className="size-3.5 text-spotlight" />
                      {slide.tag}
                    </span>
                    <h1 className="mt-6 animate-fade-up text-[2.6rem] leading-[1.02] font-extrabold tracking-tight [animation-delay:120ms] sm:text-6xl lg:text-7xl">
                      <TitleWithOutline title={slide.title} />
                    </h1>
                    <p className="mt-6 max-w-xl animate-fade-up text-base text-white/80 [animation-delay:240ms] sm:text-lg">
                      {slide.text}
                    </p>
                    <div className="mt-9 flex animate-fade-up flex-wrap gap-3 [animation-delay:360ms]">
                      <Link
                        href="/studios"
                        className="group/btn inline-flex h-14 items-center gap-3 rounded-full bg-primary pr-2 pl-7 text-base font-semibold text-primary-foreground shadow-[0_18px_40px_-14px] shadow-primary/70 transition-transform duration-300 hover:-translate-y-0.5"
                      >
                        Explore Studios
                        <span className="flex size-10 items-center justify-center rounded-full bg-black/85 text-white transition-transform duration-300 group-hover/btn:rotate-45">
                          <ArrowUpRight className="size-5" />
                        </span>
                      </Link>
                      <Link
                        href="/add-studio"
                        className="inline-flex h-14 items-center rounded-full border border-white/35 px-7 text-base font-semibold text-white transition-colors hover:bg-white hover:text-black"
                      >
                        Host Your Space
                      </Link>
                    </div>
                  </div>
                </div>

                {/* quick facts strip */}
                <div className="absolute inset-x-0 bottom-0 hidden sm:block">
                  <div className="container mx-auto flex gap-10 px-4 pb-14 font-mono text-xs tracking-wider text-white/70 uppercase">
                    <span><b className="mr-1.5 font-heading text-xl text-white">5</b> categories</span>
                    <span><b className="mr-1.5 font-heading text-xl text-white">1 hr</b> minimum</span>
                    <span><b className="mr-1.5 font-heading text-xl text-white">0</b> double bookings</span>
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
