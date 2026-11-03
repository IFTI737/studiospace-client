import Link from "next/link";
import { SearchX } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

export default function StudioNotFound() {
  return (
    <section className="container mx-auto px-4 py-20">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SearchX />
          </EmptyMedia>
          <EmptyTitle className="text-lg">Studio not found</EmptyTitle>
          <EmptyDescription>This studio may have been removed, or the link is not correct.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link href="/studios" className={buttonVariants({ className: "rounded-full" })}>
            Browse all studios
          </Link>
        </EmptyContent>
      </Empty>
    </section>
  );
}
