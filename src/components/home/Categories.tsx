import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/constants";
import SectionHeading from "./SectionHeading";

export default function Categories() {
  return (
    <section className="bg-muted/50 py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Browse by Category"
          title="What are you creating today?"
          description="Pick a type of space and we will show you every studio that fits."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories.map(({ name, label, icon: Icon, image, blurb }) => (
            <Link
              key={name}
              href={`/studios?category=${encodeURIComponent(name)}`}
              className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl p-4 text-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <Image src={image} alt={label} fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition group-hover:from-primary/90" />
              <span className="absolute top-4 left-4 flex size-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur transition group-hover:rotate-6 group-hover:bg-white group-hover:text-primary">
                <Icon className="size-5" />
              </span>
              <ArrowUpRight className="absolute top-4 right-4 size-5 opacity-0 transition group-hover:opacity-100" />
              <div className="relative">
                <h3 className="text-lg font-bold">{label}</h3>
                <p className="mt-1 text-xs text-white/80">{blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
