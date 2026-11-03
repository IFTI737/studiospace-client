import type { Metadata } from "next";
import ProfileDetails from "./_components/ProfileDetails";
import PasswordSection from "./_components/PasswordSection";

export const metadata: Metadata = { title: "My Profile | StudioSpace" };

export default function ProfilePage() {
  return (
    <section className="container mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold tracking-widest text-primary uppercase">Account</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">My Profile</h1>
        <p className="mt-3 text-muted-foreground">Update your name, profile photo and password.</p>
      </div>
      <div className="space-y-8">
        <ProfileDetails />
        <PasswordSection />
      </div>
    </section>
  );
}
