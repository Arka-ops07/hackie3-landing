"use client";

import { useEffect, useRef } from "react";

// ─── tuning knobs ────────────────────────────────────────────────────────────
const SCALE        = 3;      // sim-grid pixel size (higher = faster, less sharp)
const DAMPING      = 0.982;  // wave decay (0.98 = quick fade, 0.99 = long ripples)
const RIPPLE_STR   = 500;    // disturbance strength on mouse move
const RIPPLE_R     = 7;      // disturbance radius (sim cells)
const DOT_COUNT    = 160;    // number of green sprinkle dots
const REFRACT      = 0.35;   // how much wave displaces dot positions

// ─── base colour (deep navy-indigo) ─────────────────────────────────────────
const BASE_R = 8;
const BASE_G = 6;
const BASE_B = 28;

// ─── colour shift toward lavender on wave crests ─────────────────────────────
const CREST_DR = 72;   // red   channel boost at wave peak
const CREST_DG = 48;   // green channel boost
const CREST_DB = 130;  // blue  channel boost  → gives lilac / lavender tint

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;

    // ── sizing ────────────────────────────────────────────────────────────────
    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let w = Math.ceil(W / SCALE);
    let h = Math.ceil(H / SCALE);

    // ── wave buffers ──────────────────────────────────────────────────────────
    let cur  = new Float32Array(w * h);
    let prev = new Float32Array(w * h);

    // ── offscreen for pixel-level rendering ───────────────────────────────────
    const off    = document.createElement("canvas");
    off.width    = w;
    off.height   = h;
    const offCtx = off.getContext("2d")!;
    let   imgD   = offCtx.createImageData(w, h);

    // ── green sprinkle dots ───────────────────────────────────────────────────
    const dots = Array.from({ length: DOT_COUNT }, () => ({
      sx:    Math.random() * w,
      sy:    Math.random() * h,
      r:     Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.55 + 0.2,
    }));

    // ── mouse state ───────────────────────────────────────────────────────────
    let mx = W / 2, my = H / 2;
    let pmx = mx,  pmy = my;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMove);

    // ── add disturbance to wave field ─────────────────────────────────────────
    const addRipple = (rx: number, ry: number, str: number) => {
      const gx = Math.floor(rx / SCALE);
      const gy = Math.floor(ry / SCALE);
      for (let dy = -RIPPLE_R; dy <= RIPPLE_R; dy++) {
        for (let dx = -RIPPLE_R; dx <= RIPPLE_R; dx++) {
          const nx = gx + dx, ny = gy + dy;
          if (nx > 0 && nx < w - 1 && ny > 0 && ny < h - 1) {
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d <= RIPPLE_R) {
              prev[ny * w + nx] += str * Math.cos((d / RIPPLE_R) * Math.PI * 0.5);
            }
          }
        }
      }
    };

    // ── main loop ─────────────────────────────────────────────────────────────
    let animId: number;

    const tick = () => {
      // continuous ripple from mouse velocity
      const ddx = mx - pmx, ddy = my - pmy;
      const spd = Math.sqrt(ddx * ddx + ddy * ddy);
      if (spd > 0.5) {
        addRipple(mx, my, Math.min(spd * 18, RIPPLE_STR));
        pmx = mx; pmy = my;
      }

      // ── wave propagation (2-D Laplacian) ────────────────────────────────────
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const i  = y * w + x;
          const lap =
            prev[(y - 1) * w + x] +
            prev[(y + 1) * w + x] +
            prev[y * w + x - 1]   +
            prev[y * w + x + 1];
          cur[i] = lap * 0.5 - cur[i];
          cur[i] *= DAMPING;
        }
      }

      // ── pixel colour ────────────────────────────────────────────────────────
      for (let i = 0; i < w * h; i++) {
        const v = Math.max(-1, Math.min(1, cur[i] / 320));
        const t = v > 0 ? v : 0;          // only crests tint lavender

        imgD.data[i * 4]     = Math.min(255, BASE_R + (CREST_DR * t) | 0);
        imgD.data[i * 4 + 1] = Math.min(255, BASE_G + (CREST_DG * t) | 0);
        imgD.data[i * 4 + 2] = Math.min(255, BASE_B + (CREST_DB * t) | 0);
        imgD.data[i * 4 + 3] = 255;
      }

      offCtx.putImageData(imgD, 0, 0);

      // scale up smoothly
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(off, 0, 0, W, H);

      // ── green glow dots with wave refraction ─────────────────────────────────
      dots.forEach(dot => {
        const gx = Math.floor(dot.sx);
        const gy = Math.floor(dot.sy);
        if (gx < 1 || gx >= w - 1 || gy < 1 || gy >= h - 1) return;

        // gradient of wave → displacement
        const gvx = (cur[gy * w + gx + 1] - cur[gy * w + gx - 1]) * REFRACT;
        const gvy = (cur[(gy + 1) * w + gx] - cur[(gy - 1) * w + gx]) * REFRACT;
        const sx  = dot.sx * SCALE + gvx;
        const sy  = dot.sy * SCALE + gvy;
        const sr  = dot.r * SCALE * 0.6;

        // outer glow
        const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, sr * 3.5);
        grd.addColorStop(0, `rgba(74, 222, 128, ${dot.alpha})`);
        grd.addColorStop(0.4, `rgba(34, 197, 94, ${dot.alpha * 0.4})`);
        grd.addColorStop(1, "rgba(34, 197, 94, 0)");

        ctx.beginPath();
        ctx.arc(sx, sy, sr * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // hard core
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 243, 208, ${dot.alpha + 0.2})`;
        ctx.fill();
      });

      // swap
      [cur, prev] = [prev, cur];
      animId = requestAnimationFrame(tick);
    };

    tick();

    // ── resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      w = Math.ceil(W / SCALE);
      h = Math.ceil(H / SCALE);
      cur  = new Float32Array(w * h);
      prev = new Float32Array(w * h);
      off.width  = w;
      off.height = h;
      imgD = offCtx.createImageData(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -10,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
