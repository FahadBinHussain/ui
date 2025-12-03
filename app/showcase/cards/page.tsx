import { ThreeDCardDemo } from "@/components/marketing/ThreeDCardDemo";

export default function CardsShowcase() {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-bold mb-4">3D Card Components</h1>
      <p className="text-muted-foreground mb-12">
        Interactive cards with CSS 3D perspective effects
      </p>
      
      <div className="flex items-center justify-center min-h-[600px]">
        <ThreeDCardDemo />
      </div>
    </div>
  );
}
