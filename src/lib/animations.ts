"use client";

import { gsap } from "gsap";

/* ─── Check for reduced motion preference ─── */
function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ─── Fade-up on scroll ─── */
export function fadeUpOnScroll(
  elements: string | Element | Element[],
  options?: { delay?: number; duration?: number; stagger?: number }
) {
  if (prefersReducedMotion()) {
    gsap.set(elements, { opacity: 1, y: 0 });
    return;
  }

  gsap.fromTo(
    elements,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 0.9,
      delay: options?.delay ?? 0,
      stagger: options?.stagger ?? 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: typeof elements === "string" ? elements : (Array.isArray(elements) ? elements[0] : elements),
        start: "top 85%",
        once: true,
      },
    }
  );
}

/* ─── Stagger cards ─── */
export function staggerCards(
  container: string | Element,
  cardSelector: string,
  options?: { delay?: number; stagger?: number }
) {
  if (prefersReducedMotion()) {
    gsap.set(`${container} ${cardSelector}`, { opacity: 1, y: 0 });
    return;
  }

  gsap.fromTo(
    `${typeof container === "string" ? container : ""} ${cardSelector}`,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: options?.stagger ?? 0.15,
      delay: options?.delay ?? 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        once: true,
      },
    }
  );
}

/* ─── Count-up animation ─── */
export function countUp(
  element: Element,
  target: number,
  options?: { prefix?: string; suffix?: string; duration?: number; decimals?: number }
) {
  if (prefersReducedMotion()) {
    element.textContent = `${options?.prefix ?? ""}${target.toLocaleString()}${options?.suffix ?? ""}`;
    return;
  }

  const obj = { value: 0 };
  gsap.to(obj, {
    value: target,
    duration: options?.duration ?? 2,
    ease: "power1.out",
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      once: true,
    },
    onUpdate: () => {
      const val = options?.decimals
        ? obj.value.toFixed(options.decimals)
        : Math.floor(obj.value).toLocaleString();
      element.textContent = `${options?.prefix ?? ""}${val}${options?.suffix ?? ""}`;
    },
  });
}

/* ─── Hero stagger ─── */
export function heroStagger(containerSelector: string) {
  if (prefersReducedMotion()) {
    gsap.set(`${containerSelector} [data-hero]`, { opacity: 1, y: 0 });
    return;
  }

  gsap.fromTo(
    `${containerSelector} [data-hero]`,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      delay: 0.3,
    }
  );
}
