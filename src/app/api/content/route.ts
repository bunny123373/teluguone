import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Content from "@/models/Content";

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    + "-" + Date.now().toString(36);
};

// Helper function for API responses
const createResponse = (data: any, status: number = 200) => {
  return NextResponse.json(data, { 
    status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-admin-key',
    }
  });
};

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return createResponse({}, 204);
}

// GET /api/content - Get all content (public)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const category = searchParams.get("category");
    const language = searchParams.get("language");
    const search = searchParams.get("search");

    let query: any = {};

    if (type && type !== "all") {
      query.type = type;
    }

    if (category) {
      query.category = category;
    }

    if (language) {
      query.language = language;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const content = await Content.find(query).sort({ createdAt: -1 });

    return createResponse({ success: true, data: content }, 200);
  } catch (error) {
    console.error("Error fetching content:", error);
    return createResponse({ success: false, error: "Failed to fetch content" }, 500);
  }
}

// POST /api/content - Create new content (admin only)
export async function POST(request: NextRequest) {
  let adminKey: string | null = null;
  
  try {
    adminKey = request.headers.get("x-admin-key");
    console.log("POST /api/content - Admin key present:", !!adminKey);

    if (adminKey !== process.env.ADMIN_KEY) {
      console.log("Invalid admin key. Expected:", process.env.ADMIN_KEY, "Got:", adminKey);
      return createResponse(
        { success: false, error: "Unauthorized - Invalid admin key" },
        401
      );
    }

    console.log("Connecting to DB...");
    await connectDB();
    console.log("DB Connected");

    const body = await request.json();
    console.log("Request body:", JSON.stringify(body).substring(0, 200));

    if (!body.title || !body.poster) {
      return createResponse(
        { success: false, error: "Title and poster are required" },
        400
      );
    }

    if (!body.slug) {
      body.slug = generateSlug(body.title);
    }

    console.log("Creating content with slug:", body.slug);
    const content = await Content.create(body);
    console.log("Content created with ID:", content._id);

    return createResponse(
      { success: true, data: content, message: "Content created successfully" },
      201
    );
  } catch (error: any) {
    console.error("Full error:", error);
    console.error("Error stack:", error.stack);
    return createResponse({ success: false, error: error.message || "Failed to create content" }, 500);
  }
}
