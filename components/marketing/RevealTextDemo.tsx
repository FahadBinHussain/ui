"use client";
import { RevealText } from "@/components/ui/reveal-text";

export function RevealTextDemo() {
  return (
    <div className="w-full flex justify-center items-center min-h-[400px]">
      <div className="w-11/12 p-1 md:p-5 lg:p-10 space-y-12 text-2xl md:text-3xl lg:text-4xl font-medium text-neutral-500 max-w-4xl">
        <p className="contents">
          <RevealText
            variant="gradient1"
            className="font-bold"
            image="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&h=225&fit=crop"
            href="https://nextjs.org/"
          >
            Next.js{" "}
          </RevealText>{" "}
          blends{" "}
          <RevealText
            variant="gradient6"
            className="font-bold"
            image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop"
            hoverImageClass="border-cyan-400"
            href="https://tailwindcss.com/"
          >
            Tailwind CSS
          </RevealText>{" "}
          magic for stunning web designs.
        </p>
        <p>
          We use{" "}
          <RevealText
            variant="gradient7"
            className="font-bold"
            image="https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&h=225&fit=crop"
            href="https://gsap.com/"
          >
            GSAP
          </RevealText>{" "}
          animations to make every interaction smooth and dynamic.
        </p>
        <p>
          Built with{" "}
          <RevealText
            variant="gradient5"
            className="font-bold"
            image="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop"
            hoverImageClass="border-indigo-400"
            href="https://react.dev/"
          >
            React
          </RevealText>{" "}
          and{" "}
          <RevealText
            variant="gradient2"
            className="font-bold"
            image="https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=225&fit=crop"
            hoverImageClass="border-blue-400"
            href="https://www.typescriptlang.org/"
          >
            TypeScript
          </RevealText>{" "}
          for modern development.
        </p>
      </div>
    </div>
  );
}
