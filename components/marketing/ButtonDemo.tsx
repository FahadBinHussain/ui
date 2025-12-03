"use client";
import { Button, Button2, Button3 } from "@/components/ui/button";

export function ButtonDemo() {
  return (
    <div className="w-full flex flex-col gap-8">
      {/* Button 1 - Multiple Variants */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-purple-300">Button - Animated Circle Fill</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="blue">Blue</Button>
          <Button variant="purple">Purple</Button>
          <Button variant="pink">Pink</Button>
          <Button variant="green">Green</Button>
          <Button variant="sunset">Sunset</Button>
          <Button variant="ocean">Ocean</Button>
          <Button variant="galaxy">Galaxy</Button>
          <Button variant="neon">Neon</Button>
        </div>
      </div>

      {/* Button 2 */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-purple-300">Button2 - Bounce & Slide</h3>
        <div className="flex flex-wrap gap-4">
          <Button2 className="border border-white bg-black text-white" hoverColor="bg-white">
            Hover Me
          </Button2>
          <Button2 className="border border-green-500 bg-black text-white" hoverColor="bg-green-600">
            Green Hover
          </Button2>
          <Button2 className="border border-purple-500 bg-black text-white" hoverColor="bg-purple-600">
            Purple Hover
          </Button2>
        </div>
      </div>

      {/* Button 3 */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-purple-300">Button3 - Arrow Reveal</h3>
        <div className="flex flex-wrap gap-4">
          <Button3 className="border">Get Started</Button3>
          <Button3 className="border">Learn More</Button3>
          <Button3 className="border">View Demo</Button3>
        </div>
      </div>
    </div>
  );
}
