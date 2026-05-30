import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email query parameter is required" },
        { status: 400 }
      );
    }

    // 1. Find User by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Client user not found in tracking registry." },
        { status: 404 }
      );
    }

    // 2. Fetch Projects associated with this user
    const projects = await prisma.agencyProject.findMany({
      where: {
        clientId: user.id,
      },
      include: {
        booking: {
          include: {
            service: true,
          },
        },
        milestones: {
          orderBy: {
            dueDate: "asc", // fallback, or ordering by a custom sorting
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // 3. Fetch Service Bookings that don't have an active project yet
    // (e.g., still PENDING, DISCUSSING, or CANCELLED)
    const bookings = await prisma.serviceBooking.findMany({
      where: {
        userId: user.id,
        project: null, // project is null
      },
      include: {
        service: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      user,
      projects,
      bookings,
    });
  } catch (error: any) {
    console.error("Portal API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch client tracking data", details: error.message },
      { status: 500 }
    );
  }
}
