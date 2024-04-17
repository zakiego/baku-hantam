"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { ArrowUpFromLineIcon } from "./icon";

type ButtonStatusType = "none" | "active";

export const BackToTopButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const backToTopButtonRevealEvent = () => {
    const scrollingElement = document.scrollingElement;
    const scrollPosition = scrollingElement?.scrollTop;
    const button = buttonRef.current;
    const status = button?.dataset.status as ButtonStatusType;

    if (scrollPosition === undefined) return;

    if (status === "none" && scrollPosition > 290)
      return button?.setAttribute("data-status", "active");

    if (status === "active" && scrollPosition < 290)
      return button?.setAttribute("data-status", "none");
  }
  const clickHandler = () => {
    const scrollingElement = document.scrollingElement;
    scrollingElement?.scrollTo({ top: 0, behavior: "smooth" });
  };


  useEffect(() => {
    window.addEventListener("scroll", backToTopButtonRevealEvent);
    return () => window.removeEventListener("scroll", backToTopButtonRevealEvent);
  })

  return (
    <button
      title="Back to top"
      className="flex justify-center items-start bg-white fixed bottom-9 right-8 md:right-auto md:left-9 p-2 border-2 border-slate-900 rounded-full transition-all data-[status=none]:scale-0 data-[status=none]:translate-y-8 data-[status=active]:scale-1 data-[status=active]:translate-y-0"
      type="button"
      onClick={clickHandler}
      data-status="none" /* "none" | "active" */
      ref={buttonRef}
    >
      <span className="sr-only">Back to top</span>
      <ArrowUpFromLineIcon />
    </button>
  );
};
