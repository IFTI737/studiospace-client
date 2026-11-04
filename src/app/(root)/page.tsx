import Banner from "@/components/home/Banner";
import Marquee from "@/components/home/Marquee";
import FeaturedStudios from "@/components/home/FeaturedStudios";
import Categories from "@/components/home/Categories";
import HowItWorks from "@/components/home/HowItWorks";
import HostGuarantee from "@/components/home/HostGuarantee";

export default function Home() {
  return (
    <>
      <Banner />
      <Marquee />
      <FeaturedStudios />
      <Categories />
      <HowItWorks />
      <HostGuarantee />
    </>
  );
}
