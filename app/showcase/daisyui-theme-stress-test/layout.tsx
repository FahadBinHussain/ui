import "./reset.css";
import "./daisyui-styles.css";
import "./daisyui-themes.css";

export default function DaisyUILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div suppressHydrationWarning>{children}</div>;
}
