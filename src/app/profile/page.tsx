import ProfileSidebar from "@/components/profile/ProfileSidebar/ProfileSidebar";
import FeaturesData from "@/components/Shared/FeaturesData/FeaturesData";
import { footerFeaturesData } from "@/constants/features";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (

    <>
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center border border-white/10">
            <Icon icon="mdi:account" className="text-white text-3xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">My Account</h1>
            <p className="text-green-100 text-sm">Manage your personal information and addresses</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-gray-500 flex gap-2">
        <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Profile</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16 flex flex-col md:flex-row gap-8">
        <ProfileSidebar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
    <FeaturesData featuresData={footerFeaturesData}  isFooter={true}/>
    
    </>
    
  );
}