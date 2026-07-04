"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import "./RippleButton.css";

interface RippleLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
}

export default function RippleLink({ children, href, className = "", ...props }: RippleLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const rippleRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const createRipple = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (isHovered || !linkRef.current || !rippleRef.current) return;

      setIsHovered(true);

      const link = linkRef.current;
      const ripple = rippleRef.current;
      const rect = link.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.classList.remove("ripple-leave");
      ripple.classList.add("ripple-enter");
    },
    [isHovered]
  );

  const removeRipple = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.target !== event.currentTarget) return;
    if (!linkRef.current || !rippleRef.current) return;

    setIsHovered(false);

    const link = linkRef.current;
    const ripple = rippleRef.current;
    const rect = link.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.remove("ripple-enter");
    ripple.classList.add("ripple-leave");

    const handleAnimationEnd = () => {
      if (ripple) {
        ripple.classList.remove("ripple-leave");
        ripple.removeEventListener("animationend", handleAnimationEnd);
      }
    };

    ripple.addEventListener("animationend", handleAnimationEnd);
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (!linkRef.current || !rippleRef.current || !isHovered) return;

      const link = linkRef.current;
      const ripple = rippleRef.current;
      const rect = link.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
    },
    [isHovered]
  );

  return (
    <Link
      ref={linkRef as any}
      href={href}
      className={`duration-[300ms] relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white p-[1.3rem] text-[1.2rem] font-semibold text-blue-600 shadow-lg transition-colors hover:text-white ${className}`}
      onMouseEnter={(e) => {
        if (e.target === e.currentTarget) {
          createRipple(e);
        }
      }}
      onMouseLeave={(e) => {
        if (e.target === e.currentTarget) {
          removeRipple(e);
        }
      }}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <span className="relative z-[2]">{children}</span>
      <span ref={rippleRef} className="ripple" />
    </Link>
  );
}