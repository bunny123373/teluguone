import { cache } from "react";
import { getContent } from "@/lib/content";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import ContentRow from "@/components/ContentRow";
import Footer from "@/components/Footer";
import { IContent } from "@/models/Content";
import ClientHome from "./ClientHome";

const getCachedContent = cache(getContent);

export default async function Home() {
  const allContent: IContent[] = await getCachedContent();
  const featuredContent = allContent.length > 0 ? allContent[0] : null;

  return (
    <ClientHome 
      allContent={allContent} 
      featuredContent={featuredContent} 
    />
  );
}
