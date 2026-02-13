import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Content from "@/models/Content";

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
  try {
    const adminKey = request.headers.get("x-admin-key");

    if (adminKey !== process.env.ADMIN_KEY) {
      return createResponse(
        { success: false, error: "Unauthorized - Invalid admin key" },
        401
      );
    }

    await connectDB();

    const body = await request.json();

    const content = await Content.create(body);

    return createResponse(
      { success: true, data: content, message: "Content created successfully" },
      201
    );
  } catch (error) {
    console.error("Error creating content:", error);
    return createResponse({ success: false, error: "Failed to create content" }, 500);
  }
}
