'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import Theme from "./Theme";
import UnmountStudio from "./Unmount";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const data = [
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Projects",
      href: "/projects",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Photos",
      href: "/photos",
    },
  ];
  const SCROLL_UP_THRESHOLD = 5;
  const navbarRef = useRef<HTMLElement>(null);

  const [isTop, setIsTop] = useState(true); // состояние для отслеживания нахождения в верху страницы
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [navbarHeight, setNavbarHeight] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    // Определите, находится ли пользователь в самом верху страницы
    setIsTop(currentScrollY === 0);

    if (currentScrollY > lastScrollY.current && currentScrollY > navbarHeight) {
        isVisible && setIsVisible(false);
    } else if (lastScrollY.current - currentScrollY > SCROLL_UP_THRESHOLD) {
        !isVisible && setIsVisible(true);
    }
    lastScrollY.current = currentScrollY;
};

  useEffect(() => {
    setNavbarHeight(navbarRef.current?.offsetHeight || 0);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, navbarHeight, isTop]); // Only re-run effect if isVisible 
    

  return (
    <UnmountStudio>
      <header ref={navbarRef} className={`text-sm py-6 md:px-16 px-6 border-b dark:border-zinc-800 border-zinc-200 z-30 md:mb-28 mb-10 sticky top-0 translate-all duration-[400ms] shadow-sm ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} ${isTop ? 'bg-transparent' : 'bg-[#ebebeb]/70 dark:bg-zinc-900/70'}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Image src={Logo} width={158} height={35} alt="logo" priority />
          </Link>

          <nav className="md:flex hidden flex-1 justify-end ">
            <ul className="flex items-center gap-x-8 mr-12">
              {data.map((link, id) => (
                <li key={id}>
                  <Link
                    href={link.href}
                    className="font-incognito dark:text-white text-zinc-600 dark:hover:text-primary-color hover:text-zinc-900 duration-300 text-base"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-x-4">
            <Theme />
            <MobileMenu />
          </div>
        </div>
      </header>
    </UnmountStudio>
  );
}
