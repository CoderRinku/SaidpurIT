import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get("category");
    const isFeatured = searchParams.get("featured");
    const searchQuery = searchParams.get("search");

    // Fetch all categories for sidebar filters
    const categories = await prisma.category.findMany();

    const where: any = {};

    if (isFeatured === "true") {
      where.isFeatured = true;
    }

    if (categorySlug) {
      where.category = {
        slug: categorySlug,
      };
    }

    if (searchQuery) {
      where.OR = [
        { name: { contains: searchQuery } },
        { description: { contains: searchQuery } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ products, categories });
  } catch (error: any) {
    console.error("Products API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products", details: error.message },
      { status: 500 }
    );
  }
}
