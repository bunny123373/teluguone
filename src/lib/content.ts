import connectDB from "./mongodb";
import Content from "@/models/Content";

export const dynamic = "force-dynamic";

export async function getContent() {
  try {
    await connectDB();
    const content = await Content.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(content));
  } catch (error) {
    console.error("Error fetching content:", error);
    return [];
  }
}

export async function getContentById(id: string) {
  try {
    await connectDB();
    const content = await Content.findById(id).lean();
    return content ? JSON.parse(JSON.stringify(content)) : null;
  } catch (error) {
    console.error("Error fetching content by id:", error);
    return null;
  }
}
