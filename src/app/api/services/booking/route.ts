import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { serviceId, projectBrief, budgetRange, timelineChoice, email } = body;

    if (!serviceId || !projectBrief || !budgetRange || !timelineChoice) {
      return NextResponse.json({ error: "Missing required booking details" }, { status: 400 });
    }

    // Fallback/lookup client user
    let user = await prisma.user.findFirst({
      where: { email: email || "client@saidpurit.com" },
    });

    // If user doesn't exist (e.g. not seeded yet), create a fallback
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: "Walkin Client",
          email: email || "client@saidpurit.com",
          passwordHash: "fallback_hash",
          role: "CLIENT",
        },
      });
    }

    // 1. Create the Service Booking record
    const booking = await prisma.serviceBooking.create({
      data: {
        userId: user.id,
        serviceId,
        projectBrief,
        budgetRange,
        timelineChoice,
        status: "PENDING",
      },
      include: {
        service: true,
      },
    });

    // 2. Automatically spawn an active client project for demo progression
    const project = await prisma.agencyProject.create({
      data: {
        bookingId: booking.id,
        clientId: user.id,
        progressPercent: 10,
      },
    });

    // 3. Create default milestones for tracking
    await prisma.milestone.createMany({
      data: [
        {
          projectId: project.id,
          title: "Discovery & Briefing",
          description: "Align requirements, outline design layout and specifications.",
          isCompleted: true,
        },
        {
          projectId: project.id,
          title: "UI Prototype & Wireframe Approval",
          description: "Deliver and review high fidelity mockups.",
          isCompleted: false,
        },
        {
          projectId: project.id,
          title: "System Implementation",
          description: "Codebase setup, front-end structures, and database hooks.",
          isCompleted: false,
        },
        {
          projectId: project.id,
          title: "Final Review & Deployment",
          description: "SLA, DNS configuration, and launch verification.",
          isCompleted: false,
        },
      ],
    });

    return NextResponse.json({
      message: "Service booked successfully",
      booking,
      project,
    });
  } catch (error: any) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { error: "Failed to book service", details: error.message },
      { status: 500 }
    );
  }
}
