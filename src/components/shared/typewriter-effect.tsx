"use client"
import React, { useEffect, useState } from "react";

interface TypewriterEffectProps {
    text: string | string[]; // now accepts string or array of strings
    speed?: number; // ms per character
    pause?: number; // ms to wait after finishing before looping / switching
    cursor?: string;
    loop?: boolean;
    className?: string;
}

export default function TypewriterEffect({
    text,
    speed = 80,
    pause = 1200,
    cursor = "|",
    loop = false,
    className,
}: TypewriterEffectProps) {
    const texts = Array.isArray(text) ? text : [text];
    const [index, setIndex] = useState(0); // current phrase index
    const current = texts[index] ?? "";
    const [display, setDisplay] = useState("");
    const [cursorVisible, setCursorVisible] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);

    // Blink cursor
    useEffect(() => {
        const id = setInterval(() => setCursorVisible((v) => !v), 500);
        return () => clearInterval(id);
    }, []);

    // Typing / deleting logic (handles single string or array of strings)
    useEffect(() => {
        let timeout: number | undefined;
        const isLastPhrase = index === texts.length - 1;

        // Non-looping single-string behavior: type to end and stop
        if (!loop && texts.length === 1) {
            if (display.length < current.length) {
                timeout = window.setTimeout(() => {
                    setDisplay(current.slice(0, display.length + 1));
                }, speed);
            }
        } else {
            // General behavior for arrays or looping single string:
            if (!isDeleting) {
                if (display.length < current.length) {
                    // continue typing
                    timeout = window.setTimeout(() => {
                        setDisplay(current.slice(0, display.length + 1));
                    }, speed);
                } else {
                    // finished typing current phrase
                    // decide whether to delete: delete if looping OR there are more phrases to show
                    const shouldDelete = loop || texts.length > 1 ? !( !loop && isLastPhrase ) : false;
                    if (shouldDelete) {
                        timeout = window.setTimeout(() => {
                            setIsDeleting(true);
                        }, pause);
                    }
                    // otherwise (non-loop & last phrase & single pass) => stop here
                }
            } else {
                // deleting
                if (display.length > 0) {
                    timeout = window.setTimeout(() => {
                        setDisplay(current.slice(0, display.length - 1));
                    }, speed);
                } else {
                    // finished deleting -> move to next phrase (or wrap)
                    const nextIndex = (index + 1) % texts.length;
                    // If not looping and we've just deleted the last phrase, stay at last and stop (shouldn't normally happen because we avoid deleting last non-loop)
                    if (!loop && index === texts.length - 1 && texts.length > 1) {
                        // this branch is precautionary; reset deleting state
                        setIsDeleting(false);
                    } else {
                        setIndex(nextIndex);
                        setIsDeleting(false);
                    }
                }
            }
        }

        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [display, current, index, texts.length, speed, pause, loop, isDeleting]);

    // Reset when text prop changes
    useEffect(() => {
        setDisplay("");
        setIsDeleting(false);
        setIndex(0);
    }, [text]);

    return (
        <span className={className} aria-live="polite" style={{ whiteSpace: "pre" }}>
            <span>{display}</span>
            <span
                aria-hidden
                style={{
                    display: "inline-block",
                    marginLeft: 2,
                    opacity: cursorVisible ? 1 : 0,
                    transition: "opacity 120ms linear",
                }}
            >
                {cursor}
            </span>
        </span>
    );
}