"use client";

import React, { useRef } from "react";
import { useSprings, animated } from "@react-spring/web";
import useMeasure from "react-use-measure";
import { useDrag } from "@use-gesture/react";
import clamp from "lodash.clamp";

const pages = [
  "https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/4016596/pexels-photo-4016596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
];

function Viewpager() {
  const index = useRef(0);
  const [ref, { width }] = useMeasure();
  const [props, api] = useSprings(
    pages.length,
    (i) => ({
      x: i * width,
      scale: width === 0 ? 0 : 1,
      display: "block",
    }),
    [width]
  );
  const bind = useDrag(({ active, movement: [mx], direction: [xDir], distance, cancel }) => {
    const dist = Array.isArray(distance) ? distance[0] : distance;
    if (active && dist > width / 2) {
      index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, pages.length - 1);
      cancel();
    }
    api.start((i) => {
      if (i < index.current - 1 || i > index.current + 1) return { display: "none" };
      const x = (i - index.current) * width + (active ? mx : 0);
      const scale = active ? 1 - dist / width / 2 : 1;
      return { x, scale, display: "block" };
    });
  });
  return (
    <div ref={ref} className="w-full h-full">
      {props.map(({ x, display, scale }, i) => (
        <animated.div
          className="absolute w-full h-full will-change-transform"
          {...bind()}
          key={i}
          style={{ display, x }}
        >
          <animated.div
            style={{
              scale,
              backgroundImage: `url(${pages[i]})`,
              touchAction: "none",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              width: "100%",
              height: "100%",
              willChange: "transform",
              boxShadow: "0 62.5px 125px -25px rgba(50, 50, 73, 0.5), 0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6)",
            }}
          />
        </animated.div>
      ))}
    </div>
  );
}

export function DragViewpager() {
  return (
    <div className="flex items-center h-full justify-center">
      <Viewpager />
    </div>
  );
}
