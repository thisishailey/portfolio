"use client";

import { useEffect } from "react";
import { animate, stagger, useCycle } from "framer-motion";
import LocaleButton from "./switchLocale";
import ThemeButton from "./switchTheme";
import MenuButton from "./menuButton";

export interface MenuProps {
  localeValues: {
    en: string;
    ko: string;
  };
}

export default function Menu({ localeValues }: MenuProps) {
  const [isOpen, toggleMenu] = useCycle(false, true);

  useEffect(() => {
    const rect = (
      document.getElementById("menu-button") as HTMLButtonElement
    ).getBoundingClientRect();
    const x = rect.x + rect.width / 2;
    const y = rect.y + rect.height / 2;
    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;
    const clip = Math.max(clientHeight, clientWidth) * 2;

    if (isOpen) {
      animate(
        "#menu",
        {
          display: "block",
          clipPath: `circle(${clip}px at ${x}px ${y}px)`,
        },
        { type: "spring", stiffness: 20 }
      );
      animate(
        "#menu li",
        { opacity: 1, y: 0 },
        { delay: stagger(0.3), duration: 0.4 }
      );
      animate("footer", { opacity: 1 }, { delay: 0.4 });
    } else {
      animate(
        "#menu li",
        { opacity: 0, y: 30 },
        { delay: stagger(0.1, { from: "last" }), duration: 0.4 }
      );
      animate(
        "#menu",
        {
          display: "none",
          clipPath: `circle(0px at ${x}px ${y}px)`,
        },
        {
          delay: 0.4,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }
      );
      animate("footer", { opacity: 0 }, { delay: 0.2 });
    }
  }, [isOpen]);

  return (
    <div className="flex gap-2 xs:gap-5 sm:gap-8">
      <LocaleButton localeValues={localeValues} />
      <ThemeButton />
      <MenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
    </div>
  );
}
