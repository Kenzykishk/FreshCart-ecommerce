import FeaturesData from "@/components/Shared/FeaturesData/FeaturesData";
import PageHeader from "@/components/Shared/PageHeader/PageHeader";
import { footerFeaturesData } from "@/constants/features";
import { Icon } from "@iconify/react";

const contactConfig = {
  title: "Contact Us",
  subtitle: "We'd love to hear from you. Get in touch with our team.",
  
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Contact Us" },
  ],
};

const contactInfo = [
  {
    icon: "mdi:phone",
    title: "Phone",
    lines: ["Mon-Fri from 8am to 6pm"],
    link: { label: "+1 (800) 123-4567", href: "tel:+18001234567" },
  },
  {
    icon: "mdi:email-outline",
    title: "Email",
    lines: ["We'll respond within 24 hours"],
    link: { label: "support@freshcart.com", href: "mailto:support@freshcart.com" },
  },
  {
    icon: "mdi:map-marker-outline",
    title: "Office",
    lines: ["123 Commerce Street", "New York, NY 10001", "United States"],
  },
  {
    icon: "mdi:clock-outline",
    title: "Business Hours",
    lines: ["Monday - Friday: 8am - 6pm", "Saturday: 9am - 4pm", "Sunday: Closed"],
  },
];

const socialLinks = [
  { icon: "mdi:facebook", href: "#" },
  { icon: "mdi:twitter", href: "#" },
  { icon: "mdi:instagram", href: "#" },
  { icon: "mdi:linkedin", href: "#" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader config={contactConfig} />

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div className="flex flex-col gap-4">
            {contactInfo.map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <Icon icon={item.icon} className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{item.title}</p>
                  {item.lines.map((line) => (
                    <p key={line} className="text-gray-500 text-sm">{line}</p>
                  ))}
                  {item.link && (
                    <a href={item.link.href} className="text-green-600 text-sm font-medium hover:underline">
                      {item.link.label}
                    </a>
                  )}
                </div>
              </div>
            ))}

=            <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <p className="font-semibold text-gray-800 mb-3">Follow Us</p>
              <div className="flex items-center gap-3">
                {socialLinks.map((s) => (
                  <a key={s.icon} href={s.href} className="w-9 h-9 rounded-full  flex items-center bg-gray-200 justify-center text-gray-500 hover:text-white hover:bg-green-500  transition">
                    <Icon icon={s.icon} className="text-lg" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">

        
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <Icon icon="basil:headset-solid" className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Send us a Message</p>
                  <p className="text-gray-500 text-sm">Fill out the form and we'll get back to you</p>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-600">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-400 transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-600">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-400 transition"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-600">Subject</label>
                  <select className="border border-gray-200 rounded-xl px-4 py-2.5 text-md text-gray-500 outline-none focus:border-green-400 transition appearance-none bg-white">
                    <option value="">Select a subject</option>
                    <option value="order">  General Inquiry</option>
                    <option value="order">  Order Support</option>
                    <option value="order">  General Inquiry</option>
                    <option value="order">  Shipping Question</option>
                    <option value="return">Returns & Refund</option>
                    <option value="order">  Product Information</option>
                    <option value="order"> Feedback & Suggestions</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-600">Message</label>
                  <textarea
                    rows={5}
                    placeholder="How can we help you?"
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-400 transition resize-none"
                  />
                </div>

                <button className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl py-3 transition w-fit px-6">
                  <Icon icon="mdi:send" />
                  Send Message
                </button>
              </div>
            </div>

        
            <div className="bg-green-50 rounded-2xl border border-green-100 p-5 flex items-start gap-4">
              <div className="w-12 h-13 rounded-xl bg-white flex items-center justify-center shrink-0">
                <Icon icon="mdi:question-mark-circle" className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Looking for quick answers?</p>
                <p className="text-gray-500 text-sm mt-0.5">
                  Check out our Help Center for frequently asked questions about orders, shipping, returns, and more.
                </p>
                <a href="#" className="text-green-600 text-sm font-medium hover:underline mt-1 inline-block">
                  Visit Help Center →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
      <FeaturesData featuresData={footerFeaturesData}  isFooter={true}/>
      
    </>
  );
}