import { Metadata } from "next";

export const revalidate = 60;

import PlayerPageClient from "./PlayerPageClient";

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
        title: `${data.data.title} - TeluguDB Player`,
        description: `Watch ${data.data.title} online`,
        openGraph: {
          title: `${data.data.title} - TeluguDB`,
          description: `Watch ${data.data.title} online`,
          images: [data.data.poster],
        },
      };
    }
  } catch (e) {
    console.error("Error generating metadata:", e);
  }
  
  return {
    title: "Player - TeluguDB",
  };
}

export default async function PlayerPage({ params }: Props) {
  const { id } = await params;
  return <PlayerPageClient id={id} />;
}
