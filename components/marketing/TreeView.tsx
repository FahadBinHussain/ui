"use client";

import React, { useRef, useState, useEffect } from "react";
import { useSpring, a } from "@react-spring/web";
import useMeasure from "react-use-measure";

function usePrevious<T>(value: T) {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => void (ref.current = value), [value]);
  return ref.current;
}

const MinusSquareO: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="64 -65 897 897">
    <g>
      <path d="M888 760v0v0v-753v0h-752v0v753v0h752zM888 832h-752q-30 0 -51 -21t-21 -51v-753q0 -29 21 -50.5t51 -21.5h753q29 0 50.5 21.5t21.5 50.5v753q0 30 -21.5 51t-51.5 21v0zM732 347h-442q-14 0 -25 10.5t-11 25.5v0q0 15 11 25.5t25 10.5h442q14 0 25 -10.5t11 -25.5v0q0 -15 -11 -25.5t-25 -10.5z" />
    </g>
  </svg>
);

const PlusSquareO: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="64 -65 897 897">
    <g>
      <path d="M888 760v0v0v-753v0h-752v0v753v0h752zM888 832h-752q-30 0 -51 -21t-21 -51v-753q0 -29 21 -50.5t51 -21.5h753q29 0 50.5 21.5t21.5 50.5v753q0 30 -21.5 51t-51.5 21v0zM732 420h-184v183q0 15 -10.5 25.5t-25.5 10.5v0q-14 0 -25 -10.5t-11 -25.5v-183h-184q-15 0 -25.5 -11t-10.5 -25v0q0 -15 10.5 -25.5t25.5 -10.5h184v-183q0 -15 11 -25.5t25 -10.5v0q15 0 25.5 10.5t10.5 25.5v183h184q15 0 25.5 10.5t10.5 25.5v0q0 14 -10.5 25t-25.5 11z" />
    </g>
  </svg>
);

const CloseSquareO: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="64 -65 897 897">
    <g>
      <path d="M717.5 589.5q-10.5 10.5 -25.5 10.5t-26 -10l-154 -155l-154 155q-11 10 -26 10t-25.5 -10.5t-10.5 -25.5t11 -25l154 -155l-154 -155q-11 -10 -11 -25t10.5 -25.5t25.5 -10.5t26 10l154 155l154 -155q11 -10 26 -10t25.5 10.5t10.5 25t-11 25.5l-154 155l154 155q11 10 11 25t-10.5 25.5zM888 760v0v0v-753v0h-752v0v753v0h752zM888 832h-752q-30 0 -51 -21t-21 -51v-753q0 -29 21 -50.5t51 -21.5h753q29 0 50.5 21.5t21.5 50.5v753q0 30 -21.5 51t-51.5 21v0z" />
    </g>
  </svg>
);

const Tree = React.memo<
  React.HTMLAttributes<HTMLDivElement> & {
    defaultOpen?: boolean;
    name: string | React.ReactNode;
  }
>(({ children, name, style, defaultOpen = false }) => {
  const [isOpen, setOpen] = useState(defaultOpen);
  const previous = usePrevious(isOpen);
  const [ref, { height: viewHeight }] = useMeasure();
  const { height, opacity, y } = useSpring({
    from: { height: 0, opacity: 0, y: 0 },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      y: isOpen ? 0 : 20,
    },
  });
  
  const Icon = children ? (isOpen ? MinusSquareO : PlusSquareO) : CloseSquareO;
  
  return (
    <div className="relative pt-1 overflow-x-hidden whitespace-nowrap text-ellipsis text-[#24292e]">
      <Icon
        className="w-4 h-4 mr-2.5 cursor-pointer inline-block align-middle"
        style={{ opacity: children ? 1 : 0.3 }}
        onClick={() => setOpen(!isOpen)}
      />
      <span className="inline-block align-middle" style={style}>
        {name}
      </span>
      <a.div
        className="ml-1.5 pl-3.5 border-l border-dashed border-white/40 overflow-hidden"
        style={{
          opacity,
          height: isOpen && previous === isOpen ? "auto" : height,
          willChange: "transform, opacity, height",
        }}
      >
        <a.div ref={ref} style={{ y }} children={children} />
      </a.div>
    </div>
  );
});

Tree.displayName = "Tree";

export function TreeView() {
  return (
    <div className="w-full h-full flex items-center justify-center font-mono text-sm leading-[21px] select-none bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-xl">
        <Tree name="main" defaultOpen>
          <Tree name="hello" />
          <Tree name="subtree with children">
            <Tree name="hello" />
            <Tree name="sub-subtree with children">
              <Tree name="child 1" style={{ color: "#37ceff" }} />
              <Tree name="child 2" style={{ color: "#37ceff" }} />
              <Tree name="child 3" style={{ color: "#37ceff" }} />
              <Tree name="custom content">
                <div className="relative w-full h-[200px] p-2.5">
                  <div className="w-full h-full bg-black rounded-md" />
                </div>
              </Tree>
            </Tree>
            <Tree name="hello" />
          </Tree>
          <Tree name="world" />
          <Tree name={<span>🙀 something something</span>} />
        </Tree>
      </div>
    </div>
  );
}
