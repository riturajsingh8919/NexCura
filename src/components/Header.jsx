"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import { FaChevronDown } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/features/auth/authSlice";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const cartCount = useSelector((state) => state.cart.count);
  const { email, initial, isLoggedIn } = useSelector((state) => state.auth);
  const firstLetter = initial || (email ? email.charAt(0).toUpperCase() : "");

  const handleSignOut = async () => {
    await dispatch(logout()).unwrap();
    router.push("/signin");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 py-2 w-full h-[64px] flex items-center transition-all duration-300 ${isScrolled ? "text-gray-800" : "text-white"
        }`}
    >
      {/* Glassmorphism background */}
      <div
        className={`absolute inset-0 backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 ${isScrolled
          ? "bg-white/70 border-b border-gray-200/50 shadow-lg"
          : "border-b border-white/10"
          }`}
        style={
          !isScrolled
            ? {
              background:
                "linear-gradient(166.77deg, rgba(20, 69, 163, 0.1) 31.42%, rgba(133, 14, 128, 0.15) 99.23%, rgba(9, 41, 100, 0.1) 106.33%)",
            }
            : {}
        }
      ></div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo + Navigation */}
          <div className="flex items-center justify-between gap-16 w-full lg:w-auto">
            <Link href="/">
              <Image
                className={`w-[200px] h-auto object-cover transition-all duration-300 ${isScrolled
                  ? "brightness-0 saturate-100 contrast-200"
                  : "brightness-100"
                  }`}
                src="/logo.svg"
                alt="Logo"
                width={100}
                height={100}
              />
            </Link>
            <Navigation isScrolled={isScrolled} />
          </div>

          {/* Right-side actions */}
          <div className="hidden lg:flex items-center gap-6">
            {!isLoggedIn && (
              <>
                <Link
                  href={"/signin"}
                  className={`px-4 py-1.5 rounded-sm cursor-pointer text-base hover:scale-105 transition duration-300 ${isScrolled
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-black"
                    }`}
                  style={
                    !isScrolled
                      ? {
                        background:
                          "linear-gradient(250.3deg, #FEE6FF 36.49%, #DBF1FF 88.46%)",
                      }
                      : {}
                  }
                >
                  Sign In
                </Link>
              </>)}
            {/* Contact Us button */}
            <Link
              href={"/contact-us"}
              className={`px-4 py-1.5 rounded-sm cursor-pointer text-base hover:scale-105 transition duration-300 ${isScrolled
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "text-black"
                }`}
              style={
                !isScrolled
                  ? {
                    background:
                      "linear-gradient(250.3deg, #FEE6FF 36.49%, #DBF1FF 88.46%)",
                  }
                  : {}
              }
            >
              Contact Us
            </Link>
              <>
                {/* Cart */}
                <Link href="/cart" className="relative flex items-center gap-2">
                  <div className="relative">
                    <Image
                      width={26}
                      height={26}
                      alt="cart icon"
                      src="/images/shopping-cart.svg"
                      className={isScrolled ? "brightness-0" : ""}
                    />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 right-0 bg-pink-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  {/* <span
    className={`hidden md:block text-sm font-medium ${
      isScrolled ? "text-gray-800" : "text-white"
    }`}
  >
    Cart
  </span> */}
                </Link>

                {firstLetter && (
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <button className="flex items-center focus:outline-none">
                        <div className="h-10 w-10 flex items-center justify-center rounded-full 
        bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold shadow-md border border-white/20">
                          {firstLetter}
                        </div>
                        <FaChevronDown
                          className={`ml-2 ${isScrolled ? "text-gray-800" : "text-white"}`}
                          size={14}
                        />
                      </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                      <DropdownMenu.Content
                        sideOffset={8}
                        align="end"
                        className="min-w-[160px] bg-grey backdrop-blur-xl border border-gray-200 
                 rounded-lg shadow-xl p-1 z-50"
                      >
                        {/* My Orders */}
                        <DropdownMenu.Item
                          className="flex items-center gap-2 px-3 py-2 text-sm text-white cursor-pointer rounded-md hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white"
                          onSelect={() => router.push("/orders")}
                        >
                          <Image width={18} height={18} alt="orders icon" src="/images/order-Icon.png" />
                          <span>My Orders</span>
                        </DropdownMenu.Item>

                        <div className="border-t border-gray-200 my-1"></div>

                        {/* Sign Out */}
                        <DropdownMenu.Item
                          className="flex items-center gap-2 px-3 py-2 text-sm text-white cursor-pointer rounded-md hover:bg-gradient-to-r hover:from-pink-600 hover:to-red-500 hover:text-white"
                          onSelect={handleSignOut}
                        >
                          <Image width={18} height={18} alt="sign out icon" src="/images/Sign-out.svg" />
                          <span>Sign Out</span>
                        </DropdownMenu.Item>

                        <DropdownMenu.Arrow className="fill-white/95" />
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>

                )}
              </>
            {/* )} */}

          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
