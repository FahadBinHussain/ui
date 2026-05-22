"use client";

import { useRef } from "react";

interface NoiseConfig {
  inputWidth: number;
  noiseHeight?: number;
  noiseWidth?: number;
  rectX: string;
  rectY?: number;
  rectBorderX: string;
  rectBorderY: number | string;
  svgGroupX: number;
  svgGroupY: number;
  id: string;
  noiseColor: string;
  maxNoiseWidth?: number;
  minNoiseWidth?: number;
}

export function FuturisticLoginForm() {
  const createSvg = (config: NoiseConfig) => {
    const svgGroup = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgGroup.setAttribute("x", config.svgGroupX.toString());
    svgGroup.setAttribute("y", config.svgGroupY.toString());

    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", config.rectX);
    rect.setAttribute("y", config.rectY?.toString() || "0");
    rect.setAttribute("width", config.noiseWidth?.toString() || "0");
    rect.setAttribute("height", config.noiseHeight?.toString() || "0");
    rect.setAttribute("class", "noise__el");
    svgGroup.appendChild(rect);

    const rectOnBorder = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    rectOnBorder.setAttribute("x", config.rectBorderX);
    rectOnBorder.setAttribute("y", config.rectBorderY.toString());
    rectOnBorder.setAttribute("width", config.noiseWidth?.toString() || "0");
    rectOnBorder.setAttribute("height", config.noiseHeight?.toString() || "0");
    rectOnBorder.setAttribute("fill", "rgb(15, 16, 32)");
    svgGroup.appendChild(rectOnBorder);

    const animate = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "animate"
    );
    animate.setAttribute("attributeType", "CSS");
    animate.setAttribute("attributeName", "opacity");
    animate.setAttribute("id", config.id);
    animate.setAttribute("from", "0");
    animate.setAttribute("to", "1");
    animate.setAttribute("dur", `${Math.random() + 0.1}s`);
    animate.setAttribute("repeatCount", "indefinite");
    animate.setAttribute(
      "begin",
      `${Math.random() + 0.1}s;${config.id}.end+${Math.random() + 0.1}s`
    );
    svgGroup.appendChild(animate);
    return svgGroup;
  };

  const generateNoise = (e: HTMLElement, type: string) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    let input: HTMLElement;
    let inputNoise: HTMLElement;
    let noiseColor: string;

    if (type === "input") {
      input = e.offsetParent as HTMLElement;
      (e.parentElement?.parentElement as HTMLElement).classList.add("is-focused");
      inputNoise = (e.parentElement?.parentElement as HTMLElement)
        .lastElementChild as HTMLElement;
      noiseColor = "rgb(112, 113, 156)";
    } else {
      input = e;
      inputNoise = e.lastElementChild as HTMLElement;
      noiseColor = "rgb(73, 77, 195)";
    }

    const inputHeight = input.offsetHeight;
    const inputWidth = input.offsetWidth;

    svg.setAttribute("width", "300");
    svg.setAttribute("height", "66");

    const maxNumberOfHorizontalNoise = Math.round(inputWidth / inputHeight);
    const maxNumberOfVerticalNoise = Math.round(inputHeight / 10 / 2);

    const verticalNoiseToGenerateBottom = Math.floor(
      Math.random() * (maxNumberOfHorizontalNoise - 1) + 1
    );

    const commonVerticalConfig = {
      inputWidth,
      noiseHeight: 2,
      rectX: "4",
      rectBorderX: "4",
      rectBorderY: "14",
      noiseColor,
    };

    const commonHorizontalConfig = {
      inputWidth,
      maxNoiseWidth: 8,
      minNoiseWidth: 2,
      noiseWidth: 2,
      rectBorderY: 14,
      noiseColor,
    };

    for (let i = 0; i <= verticalNoiseToGenerateBottom; i++) {
      svg.appendChild(
        createSvg({
          ...commonVerticalConfig,
          noiseWidth: Math.floor(Math.random() * (16 - 4) + 4),
          svgGroupX: Math.floor(Math.random() * (inputWidth - 1) + 1),
          rectY: Math.floor(Math.random() * (16 - 8) + 8),
          svgGroupY: 46,
          id: `bottom${i}`,
        })
      );
    }

    const verticalNoiseToGenerateTop = Math.floor(
      Math.random() * (maxNumberOfHorizontalNoise - 1) + 1
    );

    for (let i = 0; i <= verticalNoiseToGenerateTop; i++) {
      svg.appendChild(
        createSvg({
          ...commonVerticalConfig,
          noiseWidth: Math.floor(Math.random() * (16 - 4) + 4),
          svgGroupX: Math.floor(Math.random() * (inputWidth - 1) + 1),
          rectY: Math.floor(Math.random() * (20 - 8) + 8),
          svgGroupY: 0,
          id: `top${i}`,
        })
      );
    }

    for (let i = 0; i <= maxNumberOfVerticalNoise; i++) {
      svg.appendChild(
        createSvg({
          ...commonHorizontalConfig,
          rectX: "2",
          noiseHeight: Math.floor(Math.random() * (8 - 2) + 2),
          rectY: Math.floor(Math.random() * (20 - 12) + 12),
          svgGroupX: 0,
          svgGroupY: Math.floor(Math.random() * (20 - 1) + 1),
          id: `left${i}`,
          rectBorderX: "0",
        })
      );
    }

    for (let i = 0; i <= maxNumberOfVerticalNoise; i++) {
      svg.appendChild(
        createSvg({
          ...commonHorizontalConfig,
          rectX: "0",
          noiseHeight: Math.floor(Math.random() * (8 - 2) + 2),
          rectY: Math.floor(Math.random() * (20 - 12) + 12),
          svgGroupX: inputWidth - 4,
          svgGroupY: Math.floor(Math.random() * (20 - 5) + 5),
          id: `right${i}`,
          rectBorderX: "2",
        })
      );
    }

    inputNoise.appendChild(svg);
  };

  const removeNoise = (
    element: HTMLInputElement | HTMLDivElement,
    type: string
  ) => {
    let inputNoise: HTMLElement;

    if (type === "input") {
      const input = element as HTMLInputElement;
      const offsetParent = (input.offsetParent as HTMLElement)?.offsetParent as HTMLElement;
      inputNoise = offsetParent.lastElementChild as HTMLElement;
      offsetParent.classList.remove("is-focused");
    } else {
      inputNoise = element.lastElementChild as HTMLElement;
    }

    if (inputNoise && inputNoise.childNodes[0]) {
      inputNoise.removeChild(inputNoise.childNodes[0]);
    }
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Tomorrow:wght@500;600&display=swap');

        .futuristic-login-wrapper {
          font-family: 'Tomorrow', sans-serif;
          font-weight: 500;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13.5px;
          color: #B3B5D2;
          background: #0F1020;
        }

        .login-container {
          width: 300px;
          margin: auto;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          margin-top: 70px;
        }

        .login-container h1 {
          font-size: 24px;
          flex-grow: 1;
          flex-shrink: 1;
          display: flex;
          width: 100%;
          padding: 0px 0 56px 0;
          margin: 0;
        }

        .editor-field {
          width: 300px;
          height: 64px;
          position: relative;
          margin: 14px 0;
        }

        .editor-field .noise__el {
          fill: #70719C;
        }

        .editor-field__noise {
          position: absolute;
          bottom: -2px;
          width: 100%;
          height: calc(100% + 2px);
          z-index: 2;
          pointer-events: none;
        }

        .editor-field__container {
          clip-path: polygon(
            0% 0%,
            calc(100% - 8px) 0,
            100% 8px,
            100% 100%,
            95% 100%,
            calc(0% + 8px) 100%,
            0% calc(100% - 8px),
            0% calc(100% + 8px)
          );
          border: 2px solid #5E5F84;
          width: 100%;
          height: 48px;
          position: absolute;
          bottom: 2px;
        }

        .editor-field__container:before,
        .editor-field__container:after {
          content: "";
          height: 2px;
          width: 11.5px;
          background: #5E5F84;
          display: block;
          position: absolute;
          z-index: 1;
          transform: rotate(45deg);
          border-radius: 5px;
        }

        .editor-field__container:before {
          right: -3.1px;
          top: 1.6px;
        }

        .editor-field__container:after {
          left: -3.1px;
          bottom: 1.6px;
        }

        .editor-field__bottom {
          position: absolute;
          content: "";
          display: block;
          height: 2px;
          width: 30%;
          background: #5E5F84;
          right: 0px;
          clip-path: polygon(0 0, 100% 0%, 100% 100%, calc(0% + 2px) 100%);
          bottom: 0px;
        }

        .editor-field__label-container {
          position: absolute;
          top: 0px;
        }

        .editor-field__label-container:after {
          position: absolute;
          content: "";
          display: block;
          height: 2px;
          width: 32px;
          background: #5E5F84;
          right: -29px;
          clip-path: polygon(0 0, calc(100% - 2px) 0%, 100% 100%, 0% 100%);
          bottom: 2px;
        }

        .editor-field__label {
          position: relative;
          display: block;
          height: 16px;
          width: auto;
          background: #5E5F84;
          left: 0px;
          color: #0F1020;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 1.25px;
          font-weight: 600;
          padding: 0 24px 0 16px;
          display: flex;
          align-items: center;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 100%, 0% 100%);
        }

        .editor-field__input {
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          background: #0F1020;
          color: #B3B5D2;
          padding: 8px 16px;
          letter-spacing: 0.2px;
          font-family: 'Tomorrow', sans-serif;
          font-weight: 500;
          font-size: 13.5px;
        }

        .editor-field__input:focus {
          animation: 0.05s infinite alternate blink;
        }

        @keyframes blink {
          from {
            background: #0F1020;
          }
          to {
            background: #12132a;
          }
        }

        .editor-field:hover .editor-field__bottom,
        .editor-field.is-focused .editor-field__bottom {
          background: #70719C;
        }

        .editor-field:hover .editor-field__container,
        .editor-field.is-focused .editor-field__container {
          border-color: #70719C;
        }

        .editor-field:hover .editor-field__container:after,
        .editor-field:hover .editor-field__container:before,
        .editor-field.is-focused .editor-field__container:after,
        .editor-field.is-focused .editor-field__container:before {
          background: #70719C !important;
        }

        .editor-field:hover .editor-field__label-container:after,
        .editor-field.is-focused .editor-field__label-container:after {
          background: #70719C;
        }

        .editor-field:hover .editor-field__label,
        .editor-field.is-focused .editor-field__label {
          background: #70719C;
        }

        .btn {
          display: inline-block;
          position: relative;
          height: 50px;
          margin-top: 32px;
          cursor: pointer;
        }

        .btn__noise {
          position: absolute;
          top: -28%;
          height: 66px;
          width: 100%;
          pointer-events: none;
        }

        .btn--primary .btn__container {
          background: #383CAB;
          border-color: #494DC7;
          display: flex;
          align-items: center;
          line-height: 10px;
          pointer-events: none;
          color: #A2A6F3;
          border: 2px solid;
          clip-path: polygon(
            0% 0%,
            calc(100% - 8px) 0,
            100% 8px,
            100% 100%,
            95% 100%,
            calc(0% + 8px) 100%,
            0% calc(100% - 8px),
            0% 20%
          );
          height: 100%;
          padding: 0 24px;
          font-family: 'Tomorrow', sans-serif;
          font-weight: 500;
          font-size: 13.5px;
        }

        .btn--primary .noise__el {
          fill: #494DC7;
        }

        .btn--primary:hover .btn__container {
          background: #32369C;
          border-color: #474BBF;
        }

        .btn--primary:hover .btn__bottom {
          background: #32369C;
          border-color: #474BBF;
        }

        .btn--primary:active .btn__container {
          background: #2C2F8A;
          border-color: #3F42AD;
          color: #9295E1;
        }

        .btn--primary:active .btn__bottom {
          background: #2C2F8A;
          border-color: #3F42AD;
        }

        .btn:before,
        .btn:after {
          content: "";
          height: 2px;
          width: 11px;
          background: #494DC7;
          display: block;
          position: absolute;
          z-index: 1;
          transform: rotate(45deg);
          border-radius: 2px;
        }

        .btn:before {
          right: -1.07px;
          top: 4px;
        }

        .btn:after {
          left: -1.07px;
          bottom: 6px;
        }

        .btn__bottom {
          position: absolute;
          content: "";
          display: block;
          height: 4px;
          width: 50%;
          background: #383CAB;
          pointer-events: none;
          right: 0px;
          bottom: 0px;
          clip-path: polygon(0 0, 100% 0%, 100% 100%, calc(0% + 4px) 100%);
          border-bottom: 2px solid #494DC7;
          border-right: 2px solid #494DC7;
        }

        .btn__bottom:before {
          content: "";
          height: 2px;
          width: 11px;
          background: #494DC7;
          display: block;
          position: absolute;
          left: -5px;
          bottom: 2px;
          z-index: 1;
          transform: rotate(45deg);
        }

        .btn__container {
          height: 48px;
        }
      `}</style>

      <div className="futuristic-login-wrapper">
        <div className="login-container">
          <h1>Sign in</h1>
          <div className="editor-field editor-field__textbox">
            <div className="editor-field__label-container">
              <label className="editor-field__label">Name</label>
            </div>
            <div className="editor-field__container">
              <input
                type="text"
                className="editor-field__input"
                onFocus={(e) => generateNoise(e.currentTarget, "input")}
                onBlur={(e) => removeNoise(e.currentTarget, "input")}
              />
            </div>
            <span className="editor-field__bottom"></span>
            <div className="editor-field__noise"></div>
          </div>
          <div className="editor-field editor-field__textbox">
            <div className="editor-field__label-container">
              <label className="editor-field__label">Password</label>
            </div>
            <div className="editor-field__container">
              <input
                type="password"
                className="editor-field__input"
                onFocus={(e) => generateNoise(e.currentTarget, "input")}
                onBlur={(e) => removeNoise(e.currentTarget, "input")}
              />
            </div>
            <span className="editor-field__bottom"></span>
            <div className="editor-field__noise"></div>
          </div>
          <div
            className="btn btn--primary"
            onMouseOver={(e) => generateNoise(e.currentTarget, "button")}
            onMouseOut={(e) => removeNoise(e.currentTarget, "button")}
          >
            <div className="btn__container">Login</div>
            <div className="btn__bottom"></div>
            <div className="btn__noise"></div>
          </div>
        </div>
      </div>
    </>
  );
}
