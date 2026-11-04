"use client";

import { useEffect, useRef, useState } from "react";

// Dot + trailing ring cursor (desktop mouse only).
// Moves with transform only and stops its animation loop when the ring catches up,
// so it costs nothing while the mouse is still.
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;
    const ease = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 0.2;

    let mx = -100, my = -100, rx = -100, ry = -100;
    let frame = 0;
    let running = false;

    root.classList.add("has-cursor", "cursor-out");

    const tick = () => {
      rx += (mx - rx) * ease;
      ry += (my - ry) * ease;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      if (Math.abs(mx - rx) > 0.1 || Math.abs(my - ry) > 0.1) {
        frame = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      root.classList.remove("cursor-out");
      if (!running) {
        running = true;
        frame = requestAnimationFrame(tick);
      }
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;
      const field = target.closest("input, textarea, select, [contenteditable='true']");
      const view = target.closest<HTMLElement>("[data-cursor]");
      const link = target.closest("a, button, [role='button'], [role='menuitem'], [role='option'], [role='tab'], label, summary");
      const state = field ? "field" : view ? "view" : link ? "hover" : "";
      root.dataset.cursor = state;
      label.textContent = view && !field ? view.dataset.cursor || "" : "";
    };

    const onDown = () => root.classList.add("cursor-down");
    const onUp = () => root.classList.remove("cursor-down");
    const onLeave = () => root.classList.add("cursor-out");

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
      root.classList.remove("has-cursor", "cursor-out", "cursor-down");
      delete root.dataset.cursor;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <div className="ring" />
        <span ref={labelRef} />
      </div>
    </>
  );
}
