'use client';
import React, { useState, useEffect } from 'react';
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

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShow(false);
    } else {
      setShow(true);
    }
    setLastScrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <UnmountStudio>
      <header className={`text-sm py-6 md:px-16 px-6 border-b dark:border-zinc-800 border-zinc-200 z-30 md:mb-28 mb-10 sticky top-0 shadow-sm transition-all duration-500 ${
          show ? "translate-y-0" : "-translate-y-full"
        }`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Image src={Logo} width={35} height={35} alt="logo" />
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
            <MobileMenu show={show} onOpen={() => setShow(true)} />
          </div>
        </div>
      </header>
    </UnmountStudio>
  );
}
