import Banner from "@/components/home/Banner";
import FeaturedStudios from "@/components/home/FeaturedStudios";
import Categories from "@/components/home/Categories";
import HowItWorks from "@/components/home/HowItWorks";
import HostGuarantee from "@/components/home/HostGuarantee";

export default function Home() {
  return (
    <>
      <Banner />
      <FeaturedStudios />
      <Categories />
      <HowItWorks />
      <HostGuarantee />
    </>
  );
}
