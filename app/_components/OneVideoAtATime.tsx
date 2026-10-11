"use client";

import { useEffect } from "react";

const command = (frame: HTMLIFrameElement, payload: object) =>
  frame.contentWindow?.postMessage(JSON.stringify(payload), "*");

/** Pauses every other YouTube embed on the page when one starts playing. */
export function OneVideoAtATime() {
  useEffect(() => {
    const frames = () => Array.from(document.querySelectorAll<HTMLIFrameElement>("iframe[src*='youtube']"));

    // Ask each player to report state changes back to us.
    const listen = (frame: HTMLIFrameElement) => command(frame, { event: "listening" });
    const cleanups = frames().map((f) => {
      const handler = () => listen(f);
      f.addEventListener("load", handler);
      listen(f);
      return () => f.removeEventListener("load", handler);
    });

    const onMessage = (e: MessageEvent) => {
      if (typeof e.data !== "string") return;
      let data: { event?: string; info?: { playerState?: number } };
      try {
        data = JSON.parse(e.data);
      } catch {
        return;
      }
      if (data.event !== "onStateChange" || data.info?.playerState !== 1) return;
      frames().forEach((f) => {
        if (f.contentWindow !== e.source) command(f, { event: "command", func: "pauseVideo", args: [] });
      });
    };
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      cleanups.forEach((c) => c());
    };
  }, []);
  return null;
}
