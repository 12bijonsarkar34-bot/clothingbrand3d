'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  { title: 'The Anatomy of Craft', sub: 'Ricq, in every considered detail.' },
  { title: 'Pure Cotton Foundation', sub: 'Natural fibres. A softer beginning.' },
  { title: 'Structure, Held Close', sub: 'Precision in every seam.' },
  { title: 'The Complete Silhouette', sub: 'Designed to move with you.' },
];

export default function HomeExperience() {
  const preloader = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const targetTime = useRef(0);
  const raf = useRef(0);
  const seeking = useRef(false);
  const [chapter, setChapter] = useState(0);
  const [introDone, setIntroDone] = useState(false);

  // Intro: transparent logo spins 360°, then the black curtains part.
  // IMPORTANT: the preloader is unmounted by React (via `introDone`) and never removed
  // from the DOM by GSAP. Calling element.remove() on a React-managed node made React
  // throw "removeChild" when the homepage unmounted on navigation, which triggered
  // error.tsx ("We'll be right back") on every subpage.
  useEffect(() => {
    const root = preloader.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIntroDone(true);
      return;
    }
    const ctx = gsap.context(() => {
      gsap.set('.preload-emblem', { transformPerspective: 900, transformOrigin: '50% 50%', opacity: 0, scale: 0.92 });
      gsap.set('.preload-glow', { opacity: 0, scale: 0.7 });
      const tl = gsap.timeline({ delay: 0.1, onComplete: () => setIntroDone(true) });
      tl.to('.preload-emblem', { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }, 0)
        .to('.preload-glow', { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' }, 0)
        .to('.preload-emblem', { rotationY: 360, duration: 2.2, ease: 'power2.inOut' }, 0)
        .to('.preload-glow', { opacity: 0.55, scale: 1.12, duration: 0.55, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 1.1)
        .to(['.preload-emblem', '.preload-glow'], { opacity: 0, scale: 1.08, duration: 0.4, ease: 'power2.in' }, '+=0.15')
        .to('.preload-curtain-left', { xPercent: -101, duration: 0.9, ease: 'power3.inOut' })
        .to('.preload-curtain-right', { xPercent: 101, duration: 0.9, ease: 'power3.inOut' }, '<');
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const element = section.current;
    const media = video.current;
    const canvasEl = canvas.current;
    if (!element || !media || !canvasEl) return;

    const ctx = canvasEl.getContext('2d', { alpha: false });
    if (!ctx) return;
    let disposed = false;

    const draw = () => {
      if (media.readyState < 2 || !media.videoWidth) return;
      const maxWidth = 1920;
      const scale = Math.min(1, maxWidth / media.videoWidth);
      const width = Math.round(media.videoWidth * scale);
      const height = Math.round(media.videoHeight * scale);
      if (canvasEl.width !== width || canvasEl.height !== height) {
        canvasEl.width = width;
        canvasEl.height = height;
      }
      ctx.drawImage(media, 0, 0, width, height);
    };

    const schedule = () => {
      if (!raf.current && !disposed) raf.current = requestAnimationFrame(tick);
    };
    const tick = () => {
      raf.current = 0;
      if (disposed) return;
      const delta = targetTime.current - media.currentTime;
      if (Math.abs(delta) > 0.035 && !seeking.current && media.readyState >= 1) {
        seeking.current = true;
        const next = Math.max(0, Math.min(media.duration || 0, media.currentTime + Math.max(-0.22, Math.min(0.22, delta))));
        try {
          if (typeof media.fastSeek === 'function' && Math.abs(delta) > 0.45) media.fastSeek(next);
          else media.currentTime = next;
        } catch {
          seeking.current = false;
        }
      }
      draw();
      if (Math.abs(delta) > 0.035 || seeking.current) schedule();
    };
    const onSeeked = () => {
      seeking.current = false;
      draw();
      if (Math.abs(targetTime.current - media.currentTime) > 0.035) schedule();
    };
    const onReady = () => {
      draw();
      schedule();
    };

    media.addEventListener('seeked', onSeeked);
    media.addEventListener('loadeddata', onReady);
    media.addEventListener('loadedmetadata', onReady);
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top top',
      end: 'bottom bottom',
      scrub: false,
      onUpdate: (self) => {
        if (!media.duration) return;
        targetTime.current = self.progress * media.duration;
        const next = Math.min(3, Math.floor(self.progress * 4));
        setChapter((previous) => previous === next ? previous : next);
        schedule();
      },
    });

    return () => {
      disposed = true;
      trigger.kill();
      media.removeEventListener('seeked', onSeeked);
      media.removeEventListener('loadeddata', onReady);
      media.removeEventListener('loadedmetadata', onReady);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {!introDone && (
        <div className="preloader" ref={preloader} role="status" aria-label="Loading Ricq">
          <div className="preload-curtain preload-curtain-left" />
          <div className="preload-curtain preload-curtain-right" />
          <div className="preload-stage">
            <span className="preload-glow" aria-hidden="true" />
            <img className="preload-emblem" src="/logo.png.png" alt="" aria-hidden="true" width={1254} height={1254} />
          </div>
        </div>
      )}
      <section ref={section} className="assembly-section">
        <div className="assembly-sticky h-[calc(100svh-68px)] min-h-[75svh] md:h-[calc(100svh-82px)]">
          <video ref={video} className="assembly-source" src="/hero-sequence.mp4.mp4" muted playsInline preload="metadata" aria-hidden="true" />
          <canvas ref={canvas} className="assembly-video block h-full w-full object-cover object-[center_15%]" aria-label="Ricq garment assembly film" />
          <div className="assembly-shade" />
          <div className="assembly-copy">
            <span className="eyebrow">01 — THE MAKING</span>
            <h1>{chapters[chapter].title}<br /><i>— {chapter === 0 ? 'Ricq' : chapters[chapter].sub}</i></h1>
            <p>{chapter === 0 ? 'Objects of everyday life, made extraordinary.' : chapters[chapter].sub}</p>
            <Link href="/shop" className="button button-light">Shop collection <span>↗</span></Link>
          </div>
          <div className="scroll-note">SCROLL TO DISCOVER <span>↓</span></div>
          <span className="chapter-count">0{chapter + 1} / 04</span>
        </div>
      </section>
      <RunwayShowcase />
      <section className="home-editorial">
        <div><span className="eyebrow">A WARDROBE, RECONSIDERED</span><h2>Less, but<br /><i>better.</i></h2></div>
        <p>We believe the pieces you reach for most should be the pieces made with the most care. Explore modern forms, honest materials and details that reward a closer look.</p>
        <Link href="/about" className="text-link">Discover the Ricq point of view ↗</Link>
      </section>
    </>
  );
}

function RunwayShowcase() {
  return (
    <section className="runway-section" id="runway">
      <div className="runway-heading"><span className="eyebrow">02 — IN MOTION</span><h2>Made to <i>move.</i></h2><p>Quiet confidence, from every angle.</p></div>
      <div className="runway-grid h-[75svh] min-h-[75svh] md:h-screen">
        <LazyRunwayVideo src="/runway1.mp4.mp4" />
        <LazyRunwayVideo src="/runway2.mp4.mp4" />
        <span className="runway-caption">THE RICQ EDIT — 2025</span>
      </div>
    </section>
  );
}

function LazyRunwayVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let observer: IntersectionObserver | undefined;
    const loadAndPlay = () => {
      if (!element.src) {
        element.preload = 'metadata';
        element.src = src;
        element.load();
      }
      if (element.readyState >= 2) void element.play().catch(() => undefined);
      else element.addEventListener('loadeddata', () => {
        if (!document.hidden) void element.play().catch(() => undefined);
      }, { once: true });
    };
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) loadAndPlay();
          else element.pause();
        });
      }, { rootMargin: '120px 0px', threshold: 0.15 });
      observer.observe(element);
    } else loadAndPlay();
    return () => {
      observer?.disconnect();
      element.pause();
    };
  }, [src]);

  return <video ref={ref} data-src={src} className="h-full w-full object-cover object-[center_15%]" autoPlay muted loop playsInline preload="none" />;
}