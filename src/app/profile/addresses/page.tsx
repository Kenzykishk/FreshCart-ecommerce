import { getAddresses } from "@/actions/profile.action";
import AddressList from "@/components/profile/AddressList/AddressList";
import ProfileSidebar from "@/components/profile/ProfileSidebar/ProfileSidebar";
import FeaturesData from "@/components/Shared/FeaturesData/FeaturesData";
import { footerFeaturesData } from "@/constants/features";

export default async function AddressesPage() {
  const { data: addresses } = await getAddresses();

  return (

    <>
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-8 items-start">
          <ProfileSidebar />
          <div className="flex-1 min-w-0">
            <AddressList addresses={addresses || []} />
          </div>
        </div>
      </div>
    </section>
        <FeaturesData featuresData={footerFeaturesData}  isFooter={true}/>
    
    </>
    
  );
}