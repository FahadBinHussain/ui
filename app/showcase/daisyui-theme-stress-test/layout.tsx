import Script from 'next/script';

export default function DaisyUILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css" rel="stylesheet" type="text/css" />
      <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      <div suppressHydrationWarning>{children}</div>
    </>
  );
}
