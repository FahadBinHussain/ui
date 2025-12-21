"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export const TextScramble = ({
    text,
    speed = 40,
    scrambleCount = 3,
    className,
}: {
    text: string;
    speed?: number;
    scrambleCount?: number;
    className?: string;
}) => {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);
    const originalText = useRef(text);

    const scramble = useCallback(async (newText: string) => {
        setIsScrambling(true);
        const result = newText.split("");
        const maxLength = Math.max(originalText.current.length, newText.length);

        for (let i = 0; i < maxLength + scrambleCount; i++) {
            const output = Array.from({ length: maxLength }, (_, index) => {
                // If we've passed the scramble phase for this character, show the final character
                if (index < i - scrambleCount) {
                    return result[index] || "";
                }
                // Otherwise scramble
                return chars[Math.floor(Math.random() * chars.length)];
            });
            setDisplayText(output.join(""));
            await new Promise((resolve) => setTimeout(resolve, speed));
        }

        setDisplayText(newText);
        originalText.current = newText;
        setIsScrambling(false);
    }, [speed, scrambleCount]);

    useEffect(() => {
        if (text !== originalText.current) {
            scramble(text);
        }
    }, [text, scramble]);

    return (
        <span className={className}>
            {displayText}
        </span>
    );
};
