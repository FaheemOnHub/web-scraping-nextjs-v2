import Image from "next/image";
import Link from "next/link";
import React from "react";
const navIcons = [
  { src: "/assets/icons/search.svg", alt: "search" },
  { src: "/assets/icons/black-heart.svg", alt: "favourite" },
  { src: "/assets/icons/user.svg", alt: "user" },
];
const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="nav">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/icons/logo.svg"
            alt=""
            width={27}
            height={27}
          ></Image>
          <p className="nav-logo">
            Price<span className="text-primary">Analyzer</span>
          </p>
        </Link>
        <div className="flex items-center gap-5">
          {navIcons.map((icons) => (
            <Image
              src={icons.src}
              alt={icons.alt}
              key={icons.alt}
              height={28}
              width={28}
              className="object-contain"
            />
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
