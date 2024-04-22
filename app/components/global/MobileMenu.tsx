"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { HiBeaker, HiBookmarkAlt, HiCamera, HiOutlineX, HiUser } from 'react-icons/hi';
import Logo from '../../../public/logo.png';

export default function MobileMenu() {
  const [navShow, setNavShow] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const data = [
    { title: 'About', href: '/about', icon: HiUser },
    { title: 'Projects', href: '/projects', icon: HiBeaker },
    { title: 'Blog', href: '/blog', icon: HiBookmarkAlt },
    { title: 'Photos', href: '/photos', icon: HiCamera },
  ];

  useEffect(() => {
    
    if (navShow) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => setIsHidden(false), 100); // Delay to start animation
    } else {
      document.body.style.overflow = '';
      setTimeout(() => setIsHidden(true), 300); // Wait for animation to finish
    }
  }, [navShow]);

  const toggleNav = () => {
    if (!navShow) {
      setIsHidden(false);
      setTimeout(() => {
        setNavShow(true);
      }, 100); // Delay to allow hidden state change to apply
    } else { 
      setNavShow(false);
      setTimeout(() => {
        setIsHidden(true);
      }, 300); // Delay after animation
    }
  };

  return (
    <>
      <button
        aria-label="Toggle Menu"
        onClick={toggleNav}
        className="md:hidden dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 rounded-md p-2"
      >
        <RxHamburgerMenu className="text-xl" />
      </button>
      <div
        className={`fixed left-0 top-0 z-10 h-screen w-full transition-transform duration-300 ease-in-out dark:bg-zinc-900 bg-white ${
          navShow ? 'translate-x-0 rounded-none' : 'translate-x-full'
        } ${isHidden ? 'hidden' : ''}`}
      >
        <div className="flex items-center justify-between mt-6 px-8">
          <Link href="/" onClick={toggleNav}>
            <Image src={Logo} width={158} height={35} alt="logo" />
          </Link>

          <button
            aria-label="Toggle Menu"
            onClick={toggleNav}
            className={`md:hidden dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 rounded-full p-2 duration-500 ${
              !navShow ? "-rotate-[360deg]" : null
            }`}
          >
            <HiOutlineX className="text-xl" />
          </button>
        </div>

        <nav className="flex flex-col mt-6">
          {data.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="flex items-center gap-x-2 font-incognito font-semibold text-lg dark:shadow-line-dark shadow-line-light p-6 group"
              onClick={toggleNav}
            >
              <link.icon
                className="text-zinc-500 group-hover:dark:text-white group-hover:text-zinc-800 duration-300"
                aria-hidden="true"
              />
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
