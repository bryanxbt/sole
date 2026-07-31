import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import {
  ProductReveal,
  Features,
} from "@/components/sections/ProductReveal";
import { Punchline } from "@/components/sections/Punchline";
import { Manifesto } from "@/components/sections/Manifesto";
import { Community } from "@/components/sections/Community";
import { Specs } from "@/components/sections/Specs";
import { FinalCTA, Footer } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <ProductReveal />
        <Features />
        <Punchline />
        <Manifesto />
        <Community />
        <Specs />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
