# Perspective Toast Component

A standalone 3D toast notification component that enters like hanging signs, tilting and swinging based on mouse movement with glossy sheen effects.

## Files in this folder

- `perspective-toast.tsx` - Main component with toast provider and logic
- `demo.tsx` - Demo page showing all toast types and features
- `page.tsx` - Next.js page wrapper
- `README.md` - This file

## How to use

### 1. Copy the component

Copy `perspective-toast.tsx` to your project wherever you prefer.

### 2. Wrap your app with the provider

```tsx
import { PerspectiveToastProvider } from "./perspective-toast";

export default function App() {
  return (
    <PerspectiveToastProvider>
      {/* Your app content */}
    </PerspectiveToastProvider>
  );
}
```

### 3. Trigger toasts from anywhere

```tsx
import { toast } from "./perspective-toast";

// Info toast
toast.info("New Message", "You have 3 unread messages");

// Success toast
toast.success("Saved!", "Your changes have been saved");

// Warning toast
toast.warning("Warning", "Your session will expire soon");

// Error toast
toast.error("Error", "Failed to connect to server");
```

## Features

- 🎨 **4 toast types**: info, success, warning, error
- 🎭 **3D perspective**: Toasts tilt based on mouse position
- ✨ **Glossy sheen**: Reflective overlay that moves opposite to mouse
- 🎪 **Hanging sign effect**: Enters with swing animation
- ⏱️ **Auto-dismiss**: Configurable duration with progress bar
- 🎯 **Type-safe**: Full TypeScript support
- 🎬 **GSAP animations**: Smooth, GPU-accelerated transitions

## Dependencies

- React
- GSAP
- lucide-react (for icons)

## Customization

### Custom duration

```tsx
toast.info("Never dismiss", { duration: 0 }); // Manual dismiss only
toast.success("Quick message", { duration: 3000 }); // 3 seconds
```

### Change position

Edit the container styles in `perspective-toast.tsx`:

```tsx
// Current: top-8 right-8
// Change to: bottom-8 left-8 for bottom-left
<div className="fixed bottom-8 left-8 z-[9999] ...">
```

### Add custom toast type

Extend the `typeStyles` object in `perspective-toast.tsx`:

```tsx
const typeStyles = {
  // ... existing types
  custom: {
    bg: "from-purple-500 to-indigo-500",
    icon: YourIcon,
    color: "#8b5cf6",
  },
};
```

## License

This component is part of the UI showcase project.
