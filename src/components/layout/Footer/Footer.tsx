import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";
import logo from "@/assets/images/logo.svg"
const footerLinks = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Categories", href: "/Categories" },
      { label: "Brands", href: "/brands" },
      { label: "Electronics", href: "/shop?cat=electronics" },
      { label: "Men's Fashion", href: "/shop?cat=mens-fashion" },
      { label: "Women's Fashion", href: "/shop?cat=womens-fashion" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Account", href: "/account" },
      { label: "Order History", href: "/orders" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Shopping Cart", href: "/cart" },
      { label: "Sign In", href: "/signin" },
      { label: "Create Account", href: "/signup" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Help Center", href: "/help" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Returns & Refunds", href: "/returns" },
      { label: "Track Order", href: "/track" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];
 
const socialLinks = [
  { icon: "ri:facebook-fill", href: "#", label: "Facebook" },
  { icon: "ri:twitter-x-fill", href: "#", label: "Twitter" },
  { icon: "ri:instagram-line", href: "#", label: "Instagram" },
  { icon: "ri:youtube-fill", href: "#", label: "YouTube" },
];
 
const trustItems = [
  {
    icon: "mdi-truck",
    title: "Free Shipping",
    subtitle: "On orders over 500 EGP",
    color: "#2B7FFF",
    bg: "#EFF6FF",
  },
  {
    icon: "fa7-solid:arrow-left-rotate",
    title: "Easy Returns",
    subtitle: "14-day return policy",
    color: "#FF6900",
    bg: "#FFF7ED",
  },
  {
    icon: "fa7-solid:shield-halved",
    title: "Secure Payment",
    subtitle: "100% secure checkout",
    color: "#00BC7D",
    bg: "#ECFDF5",
  },
  {
    icon: "basil:headset-solid",
    title: "24/7 Support",
    subtitle: "Contact us anytime",
    color: "#AD46FF",
    bg: "#FAF5FF",
  },
];

export default function Footer() {
  return (
   <footer>
    
 
      <div className="bg-gray-900 text-gray-300">
        <div className="container py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
 
            <div className="lg:col-span-2">
            
              <Link href="/" className="inline-flex items-center gap-2 mb-4">
                <div className="bg-white rounded-lg px-3 py-1.5">
                 <Image src={logo} width={150} height={31} alt="freshCart"></Image>
                </div>
              </Link>
 
              <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
                FreshCart is your one-stop destination for quality products. From fashion to
                electronics, we bring you the best brands at competitive prices with a
                seamless shopping experience.
              </p>
 
            
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center gap-2">
                  <Icon icon="mingcute:phone-fill" className="text-emerald-400 size-4 shrink-0" />
                  <span>+1 (800) 123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="teenyicons:envelope-solid" className="text-emerald-400 size-4 shrink-0" />
                  <span>support@freshcart.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="mdi:location" className="text-emerald-400 size-4 shrink-0" />
                  <span>123 Commerce Street, New York, NY 10001</span>
                </li>
              </ul>
 
            
              <div className="flex items-center gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full bg-gray-800 hover:bg-emerald-600 flex items-center justify-center transition-colors duration-200"
                  >
                    <Icon icon={s.icon} className="size-4 text-gray-300" />
                  </a>
                ))}
              </div>
            </div>
 
          
            {footerLinks.map((col) => (
              <div key={col.title}>
                <h3 className="text-white font-semibold mb-4">{col.title}</h3>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-emerald-400 transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
 
      
        <div className="border-t border-gray-800">
          <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} FreshCart. All rights reserved.
            </p>
          
            <div className="flex items-center gap-3">
              <Icon icon="logos:visa" className="h-5" />
              <Icon icon="logos:mastercard" className="h-5" />
              <Icon icon="logos:paypal" className="h-5" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
