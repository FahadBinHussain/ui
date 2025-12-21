import { ImageSequenceScroll } from "@/components/ui/image-sequence-scroll";

export default function ScrollEffectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">
            Image Sequence Scroll
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Control a 3D product rotation or video strictly through scroll progress.
            The ultimate "Scrollytelling" technique seen on Apple product launches.
          </p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur rounded-3xl border border-slate-700/50 p-8">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            Demo: Scroll to Animate
            <span className="block text-sm text-slate-400 mt-2">
              (Using placeholder images - replace with actual frame exports)
            </span>
          </h3>
          <div className="bg-slate-950 rounded-xl overflow-hidden">
            <ImageSequenceScroll
              images={Array.from(
                { length: 60 },
                (_, i) => `https://picsum.photos/800/600?random=${i + 100}`
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

