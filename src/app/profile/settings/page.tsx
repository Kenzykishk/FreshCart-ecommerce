import ProfileInfoForm from "@/components/profile/ProfileInfoForm/ProfileInfoForm";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm/ChangePasswordForm";
import ProfileSidebar from "@/components/profile/ProfileSidebar/ProfileSidebar";
import FeaturesData from "@/components/Shared/FeaturesData/FeaturesData";
import { footerFeaturesData } from "@/constants/features";

export default function SettingsPage() {
  return (

    <>
      <section className="py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-8 items-start">
          <ProfileSidebar />
          <div className="flex-1 min-w-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Update your profile information and change your password
              </p>
            </div>
            <ProfileInfoForm />
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    </section>
    <FeaturesData featuresData={footerFeaturesData}  isFooter={true}/>
    
    </>
  
  );
}