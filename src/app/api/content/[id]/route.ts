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

// GET /api/content/[id] - Get single content (public)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    let content = await Content.findById(id);

    if (!content) {
      content = await Content.findOne({ slug: id });
    }

    if (!content) {
      console.log("Content not found for ID:", id);
      return createResponse({ success: false, error: "Content not found" }, 404);
    }

    return createResponse({ success: true, data: content }, 200);
  } catch (error) {
    console.error("Error fetching content:", error);
    return createResponse({ success: false, error: "Failed to fetch content" }, 500);
  }
}

// PUT /api/content/[id] - Update content (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const content = await Content.findByIdAndUpdate(
      params.id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!content) {
      return createResponse({ success: false, error: "Content not found" }, 404);
    }

    return createResponse(
      { success: true, data: content, message: "Content updated successfully" },
      200
    );
  } catch (error) {
    console.error("Error updating content:", error);
    return createResponse({ success: false, error: "Failed to update content" }, 500);
  }
}

// DELETE /api/content/[id] - Delete content (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const adminKey = request.headers.get("x-admin-key");

    if (adminKey !== process.env.ADMIN_KEY) {
      return createResponse(
        { success: false, error: "Unauthorized - Invalid admin key" },
        401
      );
    }

    await connectDB();

    const content = await Content.findByIdAndDelete(params.id);

    if (!content) {
      return createResponse({ success: false, error: "Content not found" }, 404);
    }

    return createResponse(
      { success: true, message: "Content deleted successfully" },
      200
    );
  } catch (error) {
    console.error("Error deleting content:", error);
    return createResponse({ success: false, error: "Failed to delete content" }, 500);
  }
}
