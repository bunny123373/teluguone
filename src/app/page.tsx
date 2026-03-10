import { cache } from "react";
import { getContent } from "@/lib/content";
import ClientHome from "./ClientHome";
import { IContent } from "@/models/Content";

const getCachedContent = cache(async () => {
  try {
    return await getContent();
  } catch (error) {
    console.error("Error in getCachedContent:", error);
    return [];
  }
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
