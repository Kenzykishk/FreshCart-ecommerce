"use client";
import { Icon } from "@iconify/react";
import AddAddressModal from "../AddAddressModal/AddAddressModal";
import AddressCard from "../AddressCard/AddressCard";

interface AddressListProps {
  addresses: any[];
}

export default function AddressList({ addresses }: AddressListProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
    
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
          <p className="text-sm text-gray-500 mt-0.5">Manage your saved delivery addresses</p>
        </div>
        <AddAddressModal label="+ Add Address" />
      </div>

      {addresses?.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 bg-white rounded-lg shadow-md">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <Icon icon="mdi:location" className="text-3xl text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">No Addresses Yet</h3>
          <p className="text-sm text-gray-500 text-center max-w-xs">
            Add your first delivery address to make checkout faster and easier.
          </p>
          <AddAddressModal label="+ Add Your First Address" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses?.map((addr: any) => (
            <AddressCard key={addr._id} address={addr} />
          ))}
        </div>
      )}
    </div>
  );
}