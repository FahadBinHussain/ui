import Link from "next/link";
import { Box, Sparkles, Palette, Layers, MessageSquareQuote, Eye } from "lucide-react";

export default function Home() {
  const categories = [
    {
      title: "UI Components",
      description: "Basic building blocks - Buttons, Inputs, Cards, etc.",
      icon: Layers,
      href: "/showcase/buttons",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "3D Card Effects",
      description: "CSS 3D perspective cards with hover animations",
      icon: Sparkles,
      href: "/showcase/cards",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Text Animations",
      description: "Dynamic text effects with Framer Motion",
      icon: Palette,
      href: "/showcase/text-animations",
      color: "from-green-500 to-teal-500",
    },
    {
      title: "Animated Testimonials",
      description: "Beautiful testimonial carousel with 3D stacking",
      icon: MessageSquareQuote,
      href: "/showcase/testimonials",
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Lens Effect",
      description: "Magnifying glass lens effect with smooth zoom",
      icon: Eye,
      href: "/showcase/lens",
      color: "from-indigo-500 to-purple-500",
    },
    {
      title: "3D Scenes",
      description: "React Three Fiber canvases and 3D experiences",
      icon: Box,
      href: "/showcase/3d-scenes",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Design System
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}2025
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Modern, copy-paste compatible component library built with Next.js 16, 
            TypeScript, Tailwind CSS, Framer Motion, and React Three Fiber.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mb-16 rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">God Tier Stack</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <TechItem label="Next.js 16" sublabel="App Router" />
            <TechItem label="TypeScript" sublabel="Type Safety" />
            <TechItem label="Tailwind CSS" sublabel="+ cn() utility" />
            <TechItem label="Framer Motion" sublabel="Animations" />
            <TechItem label="React Three Fiber" sublabel="3D Graphics" />
            <TechItem label="Lucide React" sublabel="Icons" />
            <TechItem label="Shadcn UI" sublabel="Architecture" />
            <TechItem label="Drei" sublabel="3D Helpers" />
          </div>
        </div>

        {/* Component Categories */}
        <div className="mb-16">
          <h2 className="mb-8 text-3xl font-bold">Component Library</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.title}
                  href={category.href}
                  className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`rounded-lg bg-gradient-to-br ${category.color} p-3`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{category.description}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Features */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">Features</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>✅ Copy-paste compatible with any Next.js project</li>
            <li>✅ Full TypeScript support with autocomplete</li>
            <li>✅ Pre-installed dependencies for Aceternity, Magic UI, Origin UI</li>
            <li>✅ Shadcn architecture for easy component organization</li>
            <li>✅ Ready for 3D experiences with Three.js</li>
            <li>✅ Framer Motion animations built-in</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

function TechItem({ label, sublabel }: { label: string; sublabel: string }) {
  return (
    <div className="rounded-md border bg-background p-3">
      <div className="font-medium">{label}</div>
      <div className="text-xs text-muted-foreground">{sublabel}</div>
    </div>
  );
}
