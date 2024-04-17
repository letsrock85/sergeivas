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

  const navbarRef = useRef<HTMLElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > (navbarRef.current?.offsetHeight ?? 0)) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
  
    // Ensure we calculate the height after the component has mounted
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  
    window.addEventListener('scroll', handleScroll);
  
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  

  return (
    <UnmountStudio>
      <header ref={navbarRef} className={`text-sm py-6 md:px-16 px-6 border-b dark:border-zinc-800 border-zinc-200 z-30 md:mb-28 mb-10 md:sticky md:top-0 shadow-sm transition-all duration-500 ${visible ? 'md:translate-y-0' : 'md:-translate-y-full'}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Image src={Logo} width={35} height={35} alt="logo" priority />
          </Link>

          <nav className="md:block hidden">
            <ul className="flex items-center gap-x-8">
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
