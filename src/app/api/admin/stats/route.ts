import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Content from "@/models/Content";

export async function GET() {
  try {
    await connectDB();

    const totalMovies = await Content.countDocuments({ type: "movie" });
    const totalSeries = await Content.countDocuments({ type: "series" });
    const totalContent = totalMovies + totalSeries;

    const recentMovies = await Content.find({ type: "movie" })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title poster createdAt");

    const recentSeries = await Content.find({ type: "series" })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title poster createdAt");

    return NextResponse.json({
      success: true,
      data: {
        totalContent,
        totalMovies,
        totalSeries,
        recentMovies,
        recentSeries,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
