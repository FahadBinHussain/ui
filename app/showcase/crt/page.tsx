"use client";

import { CRT, CRTText, CRTButton } from "@/components/ui/crt";
import { motion } from "framer-motion";
import { Terminal, Cpu, HardDrive, Wifi, Battery, Volume2 } from "lucide-react";
import { useState } from "react";

export default function CRTShowcase() {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState([
    "Welcome to RetroOS v2.1",
    "Type 'help' for commands...",
    "",
  ]);

  const handleCommand = (cmd: string) => {
    const newOutput = [...output, `> ${cmd}`];

    switch (cmd.toLowerCase()) {
      case "help":
        newOutput.push(
          "Available commands:",
          "  help     - Show this help",
          "  ls       - List files",
          "  clear    - Clear screen",
          "  date     - Show current date",
          "  whoami   - Show user info",
          ""
        );
        break;
      case "ls":
        newOutput.push(
          "Documents/    Downloads/    Pictures/",
          "readme.txt    config.sys    autoexec.bat",
          ""
        );
        break;
      case "date":
        newOutput.push(new Date().toLocaleString(), "");
        break;
      case "whoami":
        newOutput.push("retro_user@RetroOS", "");
        break;
      case "clear":
        setOutput(["Welcome to RetroOS v2.1", "Type 'help' for commands...", ""]);
        return;
      default:
        newOutput.push(`Command not found: ${cmd}`, "");
    }

    setOutput(newOutput);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-green-300 to-green-500 bg-clip-text text-transparent">
            Retro CRT Monitor
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Authentic old-school computer monitor effects with scanlines, screen curvature,
            chromatic aberration, and that nostalgic green glow.
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Terminal Example */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-green-400">Retro Terminal</h2>
            <p className="text-gray-400 mb-6">
              A fully functional command-line interface with authentic CRT styling.
            </p>
            <div className="max-w-4xl mx-auto">
              <CRT className="h-96">
                <div className="h-full flex flex-col font-mono text-sm">
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between p-2 border-b border-green-800 bg-black/30">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-green-400" />
                      <CRTText>RetroOS Terminal v2.1</CRTText>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>

                  {/* Terminal Content */}
                  <div className="flex-1 p-4 overflow-y-auto bg-black/20">
                    {output.map((line, index) => (
                      <div key={index} className="mb-1">
                        <CRTText>{line}</CRTText>
                      </div>
                    ))}
                    <div className="flex items-center">
                      <CRTText>&gt;</CRTText>
                      <input
                        type="text"
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleCommand(command);
                            setCommand("");
                          }
                        }}
                        className="flex-1 bg-transparent border-none outline-none ml-2 text-green-400"
                        placeholder="Type a command..."
                      />
                    </div>
                  </div>
                </div>
              </CRT>
            </div>
          </motion.div>

          {/* System Monitor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-green-400">System Monitor</h2>
            <p className="text-gray-400 mb-6">
              Real-time system information display with retro styling.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CRT className="h-80">
                <div className="p-6 h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <Cpu className="w-5 h-5 text-green-400" />
                    <CRTText className="text-lg font-bold">CPU Monitor</CRTText>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <CRTText>Usage:</CRTText>
                      <CRTText>45%</CRTText>
                    </div>
                    <div className="w-full bg-green-900/30 rounded-sm h-2">
                      <motion.div
                        className="bg-green-400 h-full rounded-sm"
                        initial={{ width: "0%" }}
                        animate={{ width: "45%" }}
                        transition={{ duration: 1 }}
                      />
                    </div>

                    <div className="flex justify-between">
                      <CRTText>Temperature:</CRTText>
                      <CRTText>68°C</CRTText>
                    </div>
                    <div className="w-full bg-green-900/30 rounded-sm h-2">
                      <motion.div
                        className="bg-green-400 h-full rounded-sm"
                        initial={{ width: "0%" }}
                        animate={{ width: "68%" }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>

                    <div className="mt-4">
                      <CRTText className="text-xs">Processes: 127 | Threads: 892</CRTText>
                    </div>
                  </div>
                </div>
              </CRT>

              <CRT className="h-80">
                <div className="p-6 h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <HardDrive className="w-5 h-5 text-green-400" />
                    <CRTText className="text-lg font-bold">Storage</CRTText>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <CRTText>C: Drive</CRTText>
                      <CRTText>234GB / 500GB</CRTText>
                    </div>
                    <div className="w-full bg-green-900/30 rounded-sm h-2">
                      <motion.div
                        className="bg-green-400 h-full rounded-sm"
                        initial={{ width: "0%" }}
                        animate={{ width: "47%" }}
                        transition={{ duration: 1, delay: 0.4 }}
                      />
                    </div>

                    <div className="flex justify-between">
                      <CRTText>D: Drive</CRTText>
                      <CRTText>1.2TB / 2TB</CRTText>
                    </div>
                    <div className="w-full bg-green-900/30 rounded-sm h-2">
                      <motion.div
                        className="bg-green-400 h-full rounded-sm"
                        initial={{ width: "0%" }}
                        animate={{ width: "60%" }}
                        transition={{ duration: 1, delay: 0.6 }}
                      />
                    </div>

                    <div className="mt-4 flex gap-4">
                      <CRTButton size="sm">Defrag</CRTButton>
                      <CRTButton size="sm" variant="success">Backup</CRTButton>
                    </div>
                  </div>
                </div>
              </CRT>
            </div>
          </motion.div>

          {/* Game Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-green-400">Retro Game UI</h2>
            <p className="text-gray-400 mb-6">
              Classic gaming interface with CRT effects and retro buttons.
            </p>
            <div className="max-w-2xl mx-auto">
              <CRT className="h-96">
                <div className="p-6 h-full flex flex-col">
                  <div className="text-center mb-6">
                    <CRTText className="text-2xl font-bold mb-2">RETRO ARCADE</CRTText>
                    <CRTText className="text-sm">High Score: 125,430</CRTText>
                  </div>

                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="space-y-2">
                        <CRTButton className="w-48">START GAME</CRTButton>
                        <CRTButton variant="success" className="w-48">HIGH SCORES</CRTButton>
                        <CRTButton variant="danger" className="w-48">SETTINGS</CRTButton>
                      </div>

                      <div className="flex justify-center gap-4 mt-6">
                        <div className="text-center">
                          <div className="w-12 h-12 rounded-full border-2 border-green-400 flex items-center justify-center mb-1">
                            <span className="text-green-400 font-bold">A</span>
                          </div>
                          <CRTText className="text-xs">JUMP</CRTText>
                        </div>
                        <div className="text-center">
                          <div className="w-12 h-12 rounded-full border-2 border-green-400 flex items-center justify-center mb-1">
                            <span className="text-green-400 font-bold">B</span>
                          </div>
                          <CRTText className="text-xs">SHOOT</CRTText>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <CRTText className="text-xs">© 1985 RETRO GAMES INC.</CRTText>
                  </div>
                </div>
              </CRT>
            </div>
          </motion.div>

          {/* Customization Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-3 text-green-400">Low Intensity</h3>
              <p className="text-gray-400 mb-4 text-sm">Subtle CRT effects for modern content</p>
              <CRT scanlineIntensity={0.1} curvature={0.01} flickerIntensity={0.02} className="h-32">
                <div className="flex items-center justify-center h-full">
                  <CRTText className="text-lg">Low Intensity</CRTText>
                </div>
              </CRT>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-3 text-green-400">Medium Intensity</h3>
              <p className="text-gray-400 mb-4 text-sm">Balanced retro effect</p>
              <CRT scanlineIntensity={0.3} curvature={0.02} flickerIntensity={0.05} className="h-32">
                <div className="flex items-center justify-center h-full">
                  <CRTText className="text-lg">Medium Intensity</CRTText>
                </div>
              </CRT>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-3 text-green-400">High Intensity</h3>
              <p className="text-gray-400 mb-4 text-sm">Maximum retro authenticity</p>
              <CRT scanlineIntensity={0.5} curvature={0.03} flickerIntensity={0.08} className="h-32">
                <div className="flex items-center justify-center h-full">
                  <CRTText className="text-lg">High Intensity</CRTText>
                </div>
              </CRT>
            </div>
          </motion.div>

          {/* Code Example */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
          >
            <h2 className="text-2xl font-semibold mb-4 text-green-400">Usage</h2>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`import { CRT, CRTText, CRTButton } from "@/components/ui/crt";

export function MyComponent() {
  return (
    <CRT className="h-96">
      <div className="p-6">
        <CRTText className="text-xl font-bold mb-4">
          Retro Content
        </CRTText>

        <CRTText>
          This text has that classic CRT glow effect.
        </CRTText>

        <div className="mt-4">
          <CRTButton onClick={() => console.log("clicked")}>
            RETRO BUTTON
          </CRTButton>
        </div>
      </div>
    </CRT>
  );
}`}
              </pre>
            </div>
            <div className="mt-4 text-gray-400 text-sm">
              <p><strong>Props:</strong></p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><code>scanlineIntensity</code>: 0-1 (default: 0.3) - Strength of scanlines</li>
                <li><code>curvature</code>: 0-0.1 (default: 0.02) - Screen curvature amount</li>
                <li><code>flickerIntensity</code>: 0-0.2 (default: 0.05) - Screen flicker</li>
                <li><code>chromaticAberration</code>: boolean (default: true) - RGB separation</li>
              </ul>
              <p className="mt-3 text-xs text-green-500">
                💡 <strong>Pro tip:</strong> Combine with dark backgrounds for maximum retro effect.
                Perfect for terminals, games, and nostalgic interfaces.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}