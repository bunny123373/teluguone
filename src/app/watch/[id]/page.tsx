import { Metadata } from "next";
import WatchPageClient from "./WatchPageClient";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/content/${id}`, {
      cache: 'no-store'
    });
    const data = await response.json();
    
    if (data.success) {
      return {
        title: `Watch ${data.data.title} - TeluguDB`,
        description: data.data.description || `Watch ${data.data.title} online in HD quality. ${data.data.year ? data.data.year : ''} ${data.data.language ? data.data.language : ''} movie.`,
        openGraph: {
          title: `Watch ${data.data.title} - TeluguDB`,
          description: data.data.description || `Watch ${data.data.title} online`,
          images: [data.data.poster],
        },
        twitter: {
          card: 'summary_large_image',
          title: `Watch ${data.data.title} - TeluguDB`,
          description: data.data.description || `Watch ${data.data.title} online`,
          images: [data.data.poster],
        },
      };
    }
  } catch (e) {
    console.error("Error generating metadata:", e);
  }
  
  return {
    title: "Watch Movie - TeluguDB",
    description: "Stream and download Telugu movies and web series online",
  };
}

export default async function WatchPage({ params }: Props) {
  const { id } = await params;
  return <WatchPageClient id={id} />;
}
