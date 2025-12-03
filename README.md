# Design System 2025 🚀

A modern, **copy-paste compatible** design system and component library built with the God Tier Stack for 2025.

## 🎯 Purpose

This repo is designed for **maximum copy-paste compatibility** with future projects. Every component, animation, and 3D scene can be dropped into any Next.js project instantly because the stack matches the "Standard Modern Web" perfectly.

## ⚡ The God Tier Stack

### Core
- **Next.js 16** (App Router) - Latest framework with Server Components
- **TypeScript** - Full type safety and autocomplete
- **pnpm** - Fast, efficient package management

### Styling
- **Tailwind CSS** - Universal CSS framework
- **clsx + tailwind-merge** - The essential `cn()` utility
- **Lucide React** - Clean, modern icon system
- **Shadcn UI** - Component architecture pattern

### Animation & 3D
- **Framer Motion** - Industry-standard animations
- **React Three Fiber** - Three.js for React
- **Drei** - R3F helpers and abstractions

## 📁 Folder Structure

```
/app
  /showcase          # Visual testing/browsing pages
    /buttons/page.tsx
    /3d-scenes/page.tsx
  page.tsx           # Landing directory page

/components
  /ui                # Atomic basics (Buttons, Inputs - Shadcn style)
  /marketing         # Fancy sections (Hero, Grids, Aceternity components)
  /three             # 3D canvases and scenes
  /animations        # Animation variants and hooks

/lib
  utils.ts           # The cn() function - NEVER lose this!
```

## 🚀 Getting Started

### Install Dependencies

```bash
pnpm install
```

### Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the component directory.

## 📦 What's Installed

All the dependencies you need for modern creative web development:

- **framer-motion** - Animations
- **lucide-react** - Icons
- **three** - 3D graphics
- **@react-three/fiber** - React Three.js renderer
- **@react-three/drei** - R3F helpers
- **clsx + tailwind-merge** - Class name utilities

## 🎨 Usage

### Copy a Component

1. Browse to `/showcase` routes to see components in action
2. Find the component you need in `/components`
3. Copy the entire file
4. Paste into your project
5. Done! All dependencies are already installed

### Example: Using a Marketing Hero

```tsx
import { HeroSection } from "@/components/marketing/HeroSection";

export default function Page() {
  return (
    <HeroSection 
      title="Welcome to My App"
      subtitle="Build something amazing"
    >
      <button>Get Started</button>
    </HeroSection>
  );
}
```

### Example: Using Animation Variants

```tsx
import { motion } from "framer-motion";
import { fadeIn, slideUp } from "@/components/animations/variants";

export function MyComponent() {
  return (
    <motion.div variants={slideUp} initial="initial" animate="animate">
      Content here
    </motion.div>
  );
}
```

### Example: Using 3D Scene

```tsx
import { ThreeScene } from "@/components/three/ThreeScene";

export function My3DPage() {
  return (
    <div className="h-screen">
      <ThreeScene>
        <mesh>
          <boxGeometry />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </ThreeScene>
    </div>
  );
}
```

## 🎯 Why This Stack?

### ✅ Copy-Paste Compatibility
Every component works immediately in any Next.js project because dependencies are standardized.

### ✅ TypeScript Autocomplete
Know exactly what props a component needs the moment you paste it.

### ✅ Pre-installed for Aceternity, Magic UI, Origin UI
All the fancy component libraries you find online work out of the box.

### ✅ Shadcn Architecture
Industry-standard file structure that everyone recognizes.

### ✅ Ready for 3D
Three.js scenes drop in without setup hassle.

## 🛠️ Key Files

### `/lib/utils.ts`
The most important file - contains the `cn()` function for dynamic class merging.

## 📚 Adding Components

### From Shadcn UI

```bash
pnpm dlx shadcn@latest add button
```

### From Aceternity/Magic UI
Just copy the code - all dependencies are installed!

### Custom Components
Add to the appropriate folder:
- Basic UI → `/components/ui`
- Marketing → `/components/marketing`
- 3D → `/components/three`
- Animations → `/components/animations`

## 🚢 Deployment

Deploy to Vercel:

```bash
pnpm build
```

Or check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

**Built with ❤️ using the God Tier Stack 2025**
