
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import FeaturesData from "@/components/Shared/FeaturesData/FeaturesData";
import { footerFeaturesData } from "@/constants/features";
import { getUserOrders } from "@/services/orders.action";

type OrderStatus = "processing" | "delivered" | "cancelled";

interface StatusOption {
  id: OrderStatus;
  label: string;
  bg: string;
  text: string;
  icon: string;
}

const statusOptions: StatusOption[] = [
  { id: "processing", label: "Processing", bg: "bg-yellow-100", text: "text-yellow-700", icon: "mdi:clock-outline" },
  { id: "delivered",  label: "Delivered",  bg: "bg-green-100",  text: "text-green-700",  icon: "mdi:check-circle-outline" },
  { id: "cancelled",  label: "Cancelled",  bg: "bg-red-100",    text: "text-red-700",    icon: "mdi:close-circle-outline" },
];

export default async function MyOrdersPage() {
  const { data: orders } = await getUserOrders();
  const totalOrders = orders?.length ?? 0;

  return (
    <>
      <div className=" bg-gray-50 py-10">
        <div className=" container px-4">

        
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-green-600 p-2.5 rounded-xl">
                <Icon icon="fa7-solid:box" className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
                <p className="text-gray-500 text-md">
                  Track and manage your {totalOrders} {totalOrders !== 1 ? "orders" : "order"}
                </p>
              </div>
            </div>
            <Link
              href="/products"
              className="flex items-center gap-1.5 text-green-600 hover:text-green-700 text-sm font-medium transition"
            >
              <Icon icon="mdi:shopping" className="text-base" />
              Continue Shopping
            </Link>
          </div>

        
          {totalOrders === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 flex flex-col items-center gap-4 text-center">
              <div className="bg-gray-100 p-6 rounded-2xl">
                <Icon icon="fa7-solid:box-open" className="text-4xl text-gray-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">No orders yet</h2>
              <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
                When you place orders, they'll appear here so you can track them.
              </p>
              <Link
                href="/products"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-xl transition flex items-center gap-2"
              >
                <Icon icon="material-symbols:shopping-bag" className="text-lg" />
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order: any) => {
                const status = (order.status?.toLowerCase() ?? "processing") as OrderStatus;
                const style = statusOptions.find(s => s.id === status) ?? statusOptions[0];
                const firstImage = order.cartItems?.[0]?.product?.imageCover;
                const extraCount = (order.cartItems?.length ?? 1) - 1;
                const date = new Date(order.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric", month: "short", year: "numeric",
                });

                return (
                  <div
                    key={order._id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-4">

                      <div className="relative shrink-0">
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                          {firstImage && (
                            <Image
                              src={firstImage}
                              alt="product"
                              width={64} height={64}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        {extraCount > 0 && (
                          <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                            +{extraCount}
                          </span>
                        )}
                      </div>

                    <div className="flex-1 min-w-0">
  
  <div className="flex items-start justify-between">
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full mb-2 ${style.bg} ${style.text}`}>
      <Icon icon={style.icon} className="text-sm" />
      {style.label}
    </span>

    <div className="w-11 h-11 rounded-md bg-gray-100 flex justify-center items-center">
      <Icon icon="fa7-solid:money-bill" className="text-gray-600 size-6" />
    </div>
  </div>

  <p className="font-bold text-gray-900 text-base flex items-center gap-1">
    <Icon icon="mdi:pound" className="text-gray-400 text-sm" />
    {order.id}
  </p>

  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-400">
    <span className="flex items-center gap-1">
      <Icon icon="mdi:calendar" className="text-sm" />
      {date}
    </span>
    <span className="flex items-center gap-1">
      <Icon icon="mdi:package-variant" className="text-sm" />
      {order.cartItems?.length} {order.cartItems?.length !== 1 ? "items" : "item"}
    </span>
    <span className="flex items-center gap-1">
      <Icon icon="mdi:map-marker" className="text-sm" />
      {order.shippingAddress?.city}
    </span>
  </div>

  <div className="flex flex-row justify-between items-center mt-2">
    <p className="font-bold text-gray-900 text-lg">
      {order.totalOrderPrice?.toLocaleString()}{" "}
      <span className="text-sm font-normal text-gray-400">EGP</span>
    </p>
    <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg transition-all duration-300 font-medium">
      <span className="text-lg">Details</span>
      <Icon icon="mdi:chevron-down" className="text-xl pt-0.5" />
    </button>
  </div>

</div>

                  

                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>

      <FeaturesData featuresData={footerFeaturesData} isFooter={true} />
    </>
  );
}