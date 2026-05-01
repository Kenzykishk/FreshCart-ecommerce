"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useSession, signOut } from "next-auth/react";
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "@/assets/images/logo.svg";
import { useWishlist } from '@/context/WishlistContext';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { data: sessionData, status } = useSession();
const { wishlistCount } = useWishlist();
  const [open, setOpen] = useState(false);
const { numOfCartItems } = useCart();


  function logoutHandler() {
    signOut({ callbackUrl: "/" });
  }
  const router = useRouter();
const [searchQuery, setSearchQuery] = useState('');

function handleSearch(e: React.FormEvent) {
  e.preventDefault();
  if (searchQuery.trim()) {
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery('');
  }
}

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      
    
      <div className="text-sm py-4 border-b lg:border-none">
        <div className="container text-gray-600 flex justify-between items-center px-4 mx-auto">
          
        
          <div className="hidden lg:flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Icon icon="mdi:truck" className="text-green-600" />
              Free Shipping on Orders 500 EGP
            </span>

            <span className="flex items-center gap-1">
              <Icon icon="mdi:gift" className="text-green-600" />
                  New Arrivals Daily
            </span>


          </div>

        
          <div className="  hidden lg:flex  items-center gap-4 ml-auto lg:ml-0">
            <span className="hidden lg:flex items-center gap-1">
              <Icon icon="mdi:phone" />
              +1 (800) 123-4567
            </span>

            {status !== "authenticated" ? (
              <div className="flex items-center gap-3">
                <Link href="/login" className="flex items-center gap-1 hover:text-green-600 transition">
                  <Icon icon="mdi:account" />
                  Sign In
                </Link>
                <Link href="/register" className="flex items-center gap-1 hover:text-green-600 transition">
                  <Icon icon="mdi:account-plus" />
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-green-600 font-medium flex items-center gap-1">
                  <Icon icon="mdi:account-check" />
                  {sessionData?.user?.name}
                </span>
                <button 
                  onClick={logoutHandler} 
                  className="flex items-center gap-1 hover:text-red-600 transition border-l pl-3"
                >
                  <Icon icon="mdi:logout" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

    
      <div className='border-t hidden lg:block'></div>
      <div className="container mx-auto px-4 py-3 flex items-center ">
        
      
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 shrink-0">
          <Image alt='logo' src={logo} priority />
        </Link>

      
      <form onSubmit={(e) => { handleSearch(e); setOpen(false); }} className="flex items-center border border-gray-200 rounded-full px-4 ms-2 py-2 gap-2">
  <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search products..."
    className="w-96 outline-none text-sm  text-gray-600 bg-transparent"
  />
  <button type="submit" className="bg-green-600 rounded-full p-1.5 text-white">
    <Icon icon="mdi:magnify" className="text-base size-5" />
  </button>
</form>

        

    

        
        <div className="flex items-center gap-3 ml-auto">
          



<nav className="hidden lg:flex items-center gap-1">
          <Link href="/" className="px-3 py-2 text-md font-medium text-gray-700 hover:text-green-600 transition">
            Home
          </Link>
          <Link href="/products" className="px-3 py-2 text-md font-medium text-gray-700 hover:text-green-600 transition">
            Shop
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-md font-medium text-gray-700 hover:text-green-600 bg-transparent">
                  Categories
                </NavigationMenuTrigger>
              <NavigationMenuContent>
  <ul className="p-4 w-48 space-y-3">
    <li>
      <Link href="/categories" className="text-md text-gray-600 hover:bg-green-50 hover:text-green-600 block">
        All Categories
      </Link>
    </li>
    <li>
      <Link href="/products?category=6439d2d167d9aa4ca970649f" className="text-lg  hover:bg-green-50 text-gray-600 hover:text-green-600 block">
        Electronics
      </Link>
    </li>
    <li>
      <Link href="/products?category=6439d58a0049ad0b52b9003f" className="text-lg hover:bg-green-50 text-gray-600 hover:text-green-600 block">
        Women's Fashion
      </Link>
    </li>
    <li>
      <Link href="/products?category=6439d5b90049ad0b52b90048" className="text-lg hover:bg-green-50 text-gray-600 hover:text-green-600 block">
        Men's Fashion
      </Link>
    </li>
    
  </ul>
</NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link href="/brands" className="px-3 py-2 text-md font-medium text-gray-700 hover:text-green-600 transition">
            Brands
          </Link>

        </nav>


    
  <Link href="/contactUs" className='hidden lg:flex flex-row gap-2 items-center hover:opacity-80 transition-opacity cursor-pointer'>
  <div className='rounded-full w-10 h-10 bg-green-50 justify-center items-center flex '>
    <Icon icon={"basil:headset-solid"} className='text-green-500 size-5 '></Icon>
  </div>

  <div className='flex flex-col'>
    <div className="text-gray-400 text-sm">Support</div>
    <div className="font-semibold text-gray-700 text-sm">24/7 Help</div>
  </div>
</Link>


    <Link href="/wishlist">
  <Button variant="ghost" size="icon" className="relative">
    <Icon icon="mdi:heart-outline" className="size-6 text-gray-600" />
    {wishlistCount > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
        {wishlistCount}
      </span>
    )}
  </Button>
</Link>

        
        <Link href="/cart">
  <Button variant="ghost" size="icon" className="relative">
    <Icon icon="tdesign:cart-filled" className="size-6 text-gray-600" />
    {numOfCartItems > 0 && (
      <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
        {numOfCartItems}
      </span>
    )}
  </Button>
</Link>

          
        {status === "authenticated" ? (
  <div className="hidden lg:block">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden border border-green-100 bg-green-50">
          <Icon icon="mdi:account" className="text-green-600 text-2xl" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 mt-2" align="end">
        <DropdownMenuLabel className="font-normal border-b pb-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold leading-none capitalize text-green-700">
              {sessionData?.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {sessionData?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuGroup className="py-3">
          <DropdownMenuItem asChild className='group'>
            <Link href="/profile/addresses" className="focus:bg-green-50 group-focus:text-green-600 mb-2 flex items-center cursor-pointer">
              <Icon icon="mdi:account-outline" className="mr-2 h-5 w-5 text-gray-400" />
              <span>My Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className='group'>
            <Link href="/allorders" className="focus:bg-green-50 group-focus:text-green-600 mb-2 flex items-center cursor-pointer">
              <Icon icon="mdi:package-variant-closed" className="mr-2 h-5 w-5 text-gray-400" />
              <span>My Orders</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className='group'>
            <Link href="/wishlist" className="focus:bg-green-50 group-focus:text-green-600 mb-2 flex items-center cursor-pointer">
              <Icon icon="mdi:heart-outline" className="mr-2 h-5 w-5 text-gray-400" />
              <span>My Wishlist</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={logoutHandler}
          className="text-red-600 focus:bg-red-50 focus:text-red-600 cursor-pointer py-2"
        >
          <Icon icon="mdi:logout" className="mr-2 h-5 w-5" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
) : (
  <Link href="/login" className="hidden lg:block">
    <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-4 gap-2">
      <Icon icon="mynaui:user" />
      Sign In
    </Button>
  </Link>
)}

            
          



          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button  size="icon" className="  lg:hidden bg-green-600 hover:bg-green-700 rounded-full w-10 h-10 ">
                <Icon icon="meteor-icons:bars" className="size-6 text-white " />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-80 p-0">
              <SheetHeader className="px-5 py-4 border-b">
                <SheetTitle className=" font-extrabold text-3xl flex items-center  gap-2">
                  <Icon icon="tdesign:cart-filled" className=" text-green-600 size-6 " />
                  FreshCart
                </SheetTitle>
              </SheetHeader>

              <div className="px-5 py-4 flex flex-col gap-4">



<form onSubmit={handleSearch} className="flex-1 hidden md:flex items-center border border-gray-200 rounded-full px-3 py-2 gap-2 max-w-xl">
  <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search for products, brands and more..."
    className="flex-1 outline-none text-sm text-gray-600 bg-transparent"
  />
  <button type="submit" className="bg-green-600 rounded-full p-2 text-white hover:bg-green-700 transition">
    <Icon icon="mdi:magnify" className="text-lg" />
  </button>
</form>
              
                <nav className="flex flex-col">
                  {[
                    { href: "/", label: "Home" },
                    { href: "/products", label: "Shop" },
                    { href: "/categories", label: "Categories" },
                    { href: "/brands", label: "Brands" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="py-3 px-3 text-gray-700 text-lg font-medium hover:text-green-600  hover:bg-green-50 hover:rounded-xl transition"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="flex flex-col gap-1">
                  <Link
                    href="/wishlist"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 py-3 text-lg text-gray-700 hover:text-green-600 "
                  >
                    <Icon icon="mdi:heart-outline" className="text-red-400 size-8 p-1.5  text-xl bg-red-50  rounded-full" />
                    Wishlist
                  </Link>

                  <Link
                    href="/cart"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 py-3 text-gray-700 text-lg hover:text-green-600 border-b border-gray-100"
                  >
                    <Icon icon="tdesign:cart-filled" className="text-green-600 text-xl size-8 p-1.5 bg-green-50 rounded-full" />
                    Cart
                  </Link>
                </div>

                {status !== "authenticated" ? (
                  <div className="flex gap-3 mt-2">
                    <Link href="/login" onClick={() => setOpen(false)} className="flex-1">
                      <Button className="w-full bg-green-600 hover:bg-green-700 py-6 text-white rounded-xl">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setOpen(false)} className="flex-1">
                      <Button variant="outline" className="w-full rounded-xl border-green-600 py-6 text-green-600 hover:bg-green-50">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 mt-2">
                    <p className="text-sm text-gray-500">
                      Signed in as <span className="text-green-600 font-semibold">{sessionData?.user?.name}</span>
                    </p>
                    <button
                      onClick={() => { logoutHandler(); setOpen(false); }}
                      className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm"
                    >
                      <Icon icon="mdi:logout" />
                      Sign Out
                    </button>
                  </div>
                )}

            
<Link
  href="/contactUs"
  onClick={() => setOpen(false)}
  className="mt-auto flex items-center gap-3 hover:bg-green-100 bg-gray-50 rounded-xl px-4 py-3 transition-colors cursor-pointer"
>
  <div className="rounded-full w-9 h-9 bg-green-100 flex items-center justify-center">
    <Icon icon="basil:headset-solid" className="text-green-500 text-lg" />
  </div>
  <div>
    <p className="text-xs text-gray-400">Need Help?</p>
    <p className="text-sm font-semibold text-green-600">Contact Support</p>
  </div>
</Link>

              </div>
            </SheetContent>
          </Sheet>
          

        </div>
      </div>
    </header>
  );
}