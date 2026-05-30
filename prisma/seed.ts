import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // 1. Clean existing records
  await prisma.milestone.deleteMany({});
  await prisma.agencyProject.deleteMany({});
  await prisma.serviceBooking.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.productReview.deleteMany({});
  await prisma.cartItem.deleteMany({});
  await prisma.cart.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});

  // 2. Create Users
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@saidpurit.com",
      passwordHash: "admin_hashed_password", // plain mock for local testing
      role: "ADMIN",
    },
  });

  const client = await prisma.user.create({
    data: {
      name: "John Client",
      email: "client@saidpurit.com",
      passwordHash: "client_hashed_password",
      role: "CLIENT",
    },
  });

  const customer = await prisma.user.create({
    data: {
      name: "Rinku Customer",
      email: "customer@saidpurit.com",
      passwordHash: "customer_hashed_password",
      role: "CUSTOMER",
    },
  });

  console.log("Created users:", { admin: admin.email, client: client.email, customer: customer.email });

  // 3. Create Services
  const webDev = await prisma.service.create({
    data: {
      name: "Web Architecture",
      slug: "web-architecture",
      description: "Next-gen SSR applications built using React, Next.js, and high-performance server architectures.",
      features: "Server-Side Rendering (SSR),Global CDN Distribution,Tailwind Custom Design,Responsive Mobile Layouts,SEO Semantic Structure",
      basePrice: 1499.00,
      estimatedDays: 14,
    },
  });

  const reverseAudit = await prisma.service.create({
    data: {
      name: "App Reverse Engineering",
      slug: "app-reverse-engineering",
      description: "In-depth code decompilation, security auditing, protocol mapping, and API extraction.",
      features: "Decompilation audits,Binary vulnerability search,Protocol reconstruction,Security enhancement recommendations",
      basePrice: 2499.00,
      estimatedDays: 20,
    },
  });

  const seoAudit = await prisma.service.create({
    data: {
      name: "SEO Auditing & Speeds",
      slug: "seo-auditing-speeds",
      description: "Algorithmic search positioning audits, page weight minimization, and core web vitals optimization.",
      features: "Core Web Vitals enhancement,Semantic schema indexing,Automated tracking integrations,Competitor keyword analysis",
      basePrice: 799.00,
      estimatedDays: 7,
    },
  });

  const uiuxDesign = await prisma.service.create({
    data: {
      name: "Sleek UI/UX & Brand Design",
      slug: "uiux-brand-design",
      description: "Award-winning vector layouts, spatial high-fidelity prototypes, and cohesive premium identity systems.",
      features: "Figma Design Systems,Interactive motion models,Custom design assets,Brand guidelines & typography assets",
      basePrice: 999.00,
      estimatedDays: 10,
    },
  });

  console.log("Created services:", [webDev.slug, reverseAudit.slug, seoAudit.slug, uiuxDesign.slug]);

  // 4. Create Product Categories
  const catGPU = await prisma.category.create({
    data: {
      name: "Graphics Cards",
      slug: "graphics-cards",
      description: "High-performance GPUs for gaming and workstation processing.",
    },
  });

  const catCPU = await prisma.category.create({
    data: {
      name: "Processors",
      slug: "processors",
      description: "Next-generation CPUs for extreme multitasking and clock speeds.",
    },
  });

  const catRAM = await prisma.category.create({
    data: {
      name: "Memory (RAM)",
      slug: "memory-ram",
      description: "High speed, low latency DDR5 memory units.",
    },
  });

  const catChassis = await prisma.category.create({
    data: {
      name: "Chassis",
      slug: "chassis",
      description: "Custom premium computer cases with optimized airflow.",
    },
  });

  console.log("Created categories:", [catGPU.slug, catCPU.slug, catRAM.slug, catChassis.slug]);

  // 5. Create Products
  const rtx5090 = await prisma.product.create({
    data: {
      name: "AORUS RTX 5090 Xtreme Waterforce",
      slug: "aorus-rtx-5090-xtreme-waterforce",
      description: "The absolute pinnacle of graphics rendering. Features a fully enclosed water block, 32GB GDDR7 VRAM, and AI-accelerated ray tracing benchmarks.",
      price: 2499.00,
      compareAtPrice: 2799.00,
      stock: 5,
      images: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop",
      specifications: {
        "VRAM": "32GB GDDR7",
        "Interface": "PCIe 5.0",
        "Cooling": "Liquid Loop 360mm",
        "Core Clock": "2600 MHz"
      },
      isFeatured: true,
      categoryId: catGPU.id,
    },
  });

  const ryzen9 = await prisma.product.create({
    data: {
      name: "Ryzen 9 9950X3D 16-Core Processor",
      slug: "ryzen-9-9950x3d-16-core",
      description: "The supreme gaming and compiling chip. Leverages 3D V-Cache technology to achieve unbeatable framing consistency.",
      price: 699.00,
      compareAtPrice: 749.00,
      stock: 12,
      images: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=600&auto=format&fit=crop",
      specifications: {
        "Cores/Threads": "16 Cores / 32 Threads",
        "Base Clock": "4.3 GHz",
        "Boost Clock": "5.7 GHz",
        "Socket": "AM5"
      },
      isFeatured: true,
      categoryId: catCPU.id,
    },
  });

  const gskill = await prisma.product.create({
    data: {
      name: "G.Skill Trident Z5 Royal Neo 64GB DDR5",
      slug: "gskill-trident-z5-royal-64gb",
      description: "Premium jewel-encrusted RGB memory modules. Operates at a blinding 8000MT/s speeds with CL38 timings.",
      price: 289.00,
      compareAtPrice: 320.00,
      stock: 25,
      images: "https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?q=80&w=600&auto=format&fit=crop",
      specifications: {
        "Capacity": "64GB (2x32GB)",
        "Speed": "8000 MT/s",
        "Type": "DDR5 CL38",
        "RGB Sync": "Aura Sync/RGB Fusion"
      },
      isFeatured: true,
      categoryId: catRAM.id,
    },
  });

  const lianli = await prisma.product.create({
    data: {
      name: "Lian Li O11 Dynamic EVO RGB Chassis",
      slug: "lian-li-o11-dynamic-evo-rgb",
      description: "Beautiful panoramic glass panels featuring dual-chamber spacing and wraparound L-shaped diffuse lighting.",
      price: 199.00,
      compareAtPrice: 229.00,
      stock: 15,
      images: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=600&auto=format&fit=crop",
      specifications: {
        "Form Factor": "Mid Tower",
        "Material": "Aluminum / Tempered Glass",
        "Motherboard Support": "E-ATX, ATX, Micro-ATX",
        "Radiator Support": "Up to 3x 360mm"
      },
      isFeatured: true,
      categoryId: catChassis.id,
    },
  });

  console.log("Created products:", [rtx5090.slug, ryzen9.slug, gskill.slug, lianli.slug]);

  // 6. Create a ServiceBooking and Project for Client
  const booking = await prisma.serviceBooking.create({
    data: {
      userId: client.id,
      serviceId: webDev.id,
      projectBrief: "Build a high-performance Next.js landing page and dashboard for our tech startup.",
      budgetRange: "$1k - $3k",
      timelineChoice: "Standard (30 days)",
      status: "IN_PROGRESS",
    },
  });

  const project = await prisma.agencyProject.create({
    data: {
      bookingId: booking.id,
      clientId: client.id,
      repositoryUrl: "https://github.com/client/tech-startup",
      stagingUrl: "https://staging.techstartup.com",
      progressPercent: 40,
    },
  });

  await prisma.milestone.createMany({
    data: [
      {
        projectId: project.id,
        title: "Wireframes and Layout Approval",
        description: "Approve Figma UI elements and user navigation pathways.",
        isCompleted: true,
      },
      {
        projectId: project.id,
        title: "Next.js Core Structure Development",
        description: "Implement tailwind templates and state stores.",
        isCompleted: true,
      },
      {
        projectId: project.id,
        title: "Stripe API Integration",
        description: "Integrate webhook listeners and checkout flows.",
        isCompleted: false,
      },
      {
        projectId: project.id,
        title: "Launch & Production Deployment",
        description: "SLA configurations, server configs, and DNS transfer.",
        isCompleted: false,
      },
    ],
  });

  console.log("Created seed client project:", project.id);
  console.log("Seeding complete successfully.");
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
