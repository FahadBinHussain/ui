"use client";

import { AsciiRenderer, AsciiTextRenderer, StaticAscii } from "@/components/ui/ascii-render";
import { useState } from "react";

export default function AsciiRenderDemo() {
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  
  // Using different image sources
  const imageUrl1 = "https://picsum.photos/id/1015/800/600";
  const imageUrl2 = "https://picsum.photos/id/1018/800/600";
  const imageUrl3 = "https://picsum.photos/id/1025/800/600";
  const imageUrl4 = "https://picsum.photos/id/237/800/600";
  const imageUrl5 = "https://picsum.photos/id/1011/800/600";

  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-20">
      {/* Static Image ASCII */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-green-400">Static Image ASCII</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm text-gray-400 mb-2">Original Image</h3>
            <img 
              src={imageUrl1} 
              alt="Original" 
              className="w-full h-auto rounded border border-gray-700"
            />
          </div>
          <div>
            <h3 className="text-sm text-gray-400 mb-2">ASCII Version</h3>
            <div className="bg-gray-900 p-4 rounded border border-green-500/30">
              <StaticAscii
                imageUrl={imageUrl1}
                charSet=" .:-=+*#%@"
                blockSize={3}
                width={600}
                inverted={true}
                color="#00ff00"
              />
            </div>
          </div>
        </div>
        <p className="text-center text-gray-500 text-sm">
          Static image converted to ASCII art using brightness mapping
        </p>
      </section>

      {/* Canvas-based ASCII */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-green-400">Canvas ASCII Render</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm text-gray-400 mb-2">Original Image</h3>
            <img 
              src={imageUrl2} 
              alt="Original" 
              className="w-full h-auto rounded border border-gray-700"
            />
          </div>
          <div>
            <h3 className="text-sm text-gray-400 mb-2">ASCII Version</h3>
            <div className="flex justify-center bg-gray-900 p-4 rounded">
              <AsciiRenderer
                source="image"
                imageUrl={imageUrl2}
                charSet=" .:-=+*#%@"
                fontSize={8}
                blockSize={6}
                width={480}
                height={360}
                inverted={true}
              />
            </div>
          </div>
        </div>
        <p className="text-center text-gray-500 text-sm">
          Canvas-based ASCII rendering with real-time character drawing
        </p>
      </section>

      {/* Text-based ASCII with <pre> tag */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-green-400">Text-based ASCII (Pre Tag)</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm text-gray-400 mb-2">Original Image</h3>
            <img 
              src={imageUrl3} 
              alt="Original" 
              className="w-full h-auto rounded border border-gray-700"
            />
          </div>
          <div>
            <h3 className="text-sm text-gray-400 mb-2">ASCII Version</h3>
            <div className="bg-gray-900 p-4 rounded border border-green-500/30">
              <AsciiTextRenderer
                source="image"
                imageUrl={imageUrl3}
                charSet=" .:-=+*#%@"
                blockSize={6}
                width={320}
                height={240}
                inverted={true}
                color="#00ff00"
              />
            </div>
          </div>
        </div>
        <p className="text-center text-gray-500 text-sm">
          Pure text ASCII art using &lt;pre&gt; tag for better performance
        </p>
      </section>

      {/* Webcam ASCII */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-green-400">Live Webcam ASCII</h2>
        <div className="flex flex-col items-center bg-gray-900 p-8 rounded-lg">
          {!webcamEnabled ? (
            <button
              onClick={() => setWebcamEnabled(true)}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold"
            >
              Enable Webcam
            </button>
          ) : (
            <AsciiTextRenderer
              source="webcam"
              charSet=" .:-=+*#%@"
              blockSize={8}
              width={320}
              height={240}
              inverted={false}
              color="#00ff00"
              className="border border-green-500/30 p-4"
            />
          )}
        </div>
        <p className="text-center text-gray-500 text-sm">
          Real-time webcam feed converted to ASCII (click to enable)
        </p>
      </section>

      {/* Different Character Sets */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-green-400">Different Character Sets</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-green-300 mb-4">Standard</h3>
            <div className="flex gap-4">
              <div className="w-1/2">
                <p className="text-xs text-gray-400 mb-2">Original</p>
                <img 
                  src={imageUrl4} 
                  alt="Original" 
                  className="w-full h-auto rounded border border-gray-700"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="w-1/2">
                <p className="text-xs text-gray-400 mb-2">ASCII</p>
                <StaticAscii
                  imageUrl={imageUrl4}
                  charSet=" .:-=+*#%@"
                  blockSize={4}
                  width={300}
                  inverted={true}
                  color="#00ff00"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Charset: " .:-=+*#%@"</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-cyan-300 mb-4">Dense</h3>
            <div className="flex gap-4">
              <div className="w-1/2">
                <p className="text-xs text-gray-400 mb-2">Original</p>
                <img 
                  src={imageUrl4} 
                  alt="Original" 
                  className="w-full h-auto rounded border border-gray-700"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="w-1/2">
                <p className="text-xs text-gray-400 mb-2">ASCII</p>
                <StaticAscii
                  imageUrl={imageUrl4}
                  charSet=" ░▒▓█"
                  blockSize={4}
                  width={300}
                  inverted={true}
                  color="#00ffff"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Charset: " ░▒▓█"</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-purple-300 mb-4">Minimal</h3>
            <div className="flex gap-4">
              <div className="w-1/2">
                <p className="text-xs text-gray-400 mb-2">Original</p>
                <img 
                  src={imageUrl4} 
                  alt="Original" 
                  className="w-full h-auto rounded border border-gray-700"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="w-1/2">
                <p className="text-xs text-gray-400 mb-2">ASCII</p>
                <StaticAscii
                  imageUrl={imageUrl4}
                  charSet=" .*"
                  blockSize={4}
                  width={300}
                  inverted={true}
                  color="#a855f7"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Charset: " .*"</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-yellow-300 mb-4">Extended</h3>
            <div className="flex gap-4">
              <div className="w-1/2">
                <p className="text-xs text-gray-400 mb-2">Original</p>
                <img 
                  src={imageUrl4} 
                  alt="Original" 
                  className="w-full h-auto rounded border border-gray-700"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="w-1/2">
                <p className="text-xs text-gray-400 mb-2">ASCII</p>
                <StaticAscii
                  imageUrl={imageUrl4}
                  charSet=" .'`^,:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$"
                  blockSize={3}
                  width={300}
                  inverted={true}
                  color="#fbbf24"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Extended 70-char set</p>
          </div>
        </div>
      </section>

      {/* Color Variations */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-green-400">Color Variations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-green-300 mb-4">Matrix Green</h3>
            <div className="space-y-2">
              <img 
                src={imageUrl5} 
                alt="Original" 
                className="w-full h-auto rounded"
              />
              <StaticAscii
                imageUrl={imageUrl5}
                charSet=" .:-=+*#%@"
                blockSize={4}
                width={250}
                inverted={true}
                color="#00ff00"
              />
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-cyan-300 mb-4">Cyber Cyan</h3>
            <div className="space-y-2">
              <img 
                src={imageUrl5} 
                alt="Original" 
                className="w-full h-auto rounded"
              />
              <StaticAscii
                imageUrl={imageUrl5}
                charSet=" .:-=+*#%@"
                blockSize={4}
                width={250}
                inverted={true}
                color="#00ffff"
              />
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-pink-300 mb-4">Neon Pink</h3>
            <div className="space-y-2">
              <img 
                src={imageUrl5} 
                alt="Original" 
                className="w-full h-auto rounded"
              />
              <StaticAscii
                imageUrl={imageUrl5}
                charSet=" .:-=+*#%@"
                blockSize={4}
                width={250}
                inverted={true}
                color="#ff00ff"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
