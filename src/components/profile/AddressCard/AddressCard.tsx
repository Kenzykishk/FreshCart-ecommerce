"use client";
import { Address } from "@/interfaces/address.interface";
import { deleteAddress } from "@/actions/profile.action";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";

export default function AddressCard({ address }: { address: Address }) {
  async function handleDelete() {
    const { ok } = await deleteAddress(address._id);
    if (ok) toast.success("Address removed");
    else toast.error("Failed to remove address");
  }

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-md p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <Icon icon="mdi:location" className="text-green-600" />
          </div>
          <span className="font-semibold text-gray-900">{address.name}</span>
        </div>
        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Icon icon="mdi:trash-can-outline" className="text-lg" />
        </button>
      </div>
      <p className="text-sm text-gray-600">{address.details}</p>
      <p className="text-sm text-gray-500 mt-1">{address.city}</p>
      <p className="text-sm text-gray-500">{address.phone}</p>
    </div>
  );
}