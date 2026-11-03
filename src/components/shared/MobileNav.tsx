"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useSession } from "@/lib/auth-client";
import NavLinks from "./NavLinks";
import Logo from "./Logo";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden" />}>
        <Menu className="size-5" />
        <span className="sr-only">Open menu</span>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle render={<div />}>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <NavLinks className="flex-col px-4" onNavigate={() => setOpen(false)} />
        {!session && (
          <div className="mt-4 grid gap-2 px-4">
            <Link href="/login" onClick={() => setOpen(false)} className={buttonVariants({ variant: "outline", size: "lg" })}>
              Login
            </Link>
            <Link href="/register" onClick={() => setOpen(false)} className={buttonVariants({ size: "lg" })}>
              Register
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
