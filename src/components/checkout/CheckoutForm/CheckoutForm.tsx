"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { createOrder } from '@/actions/payment.actions';
import { AddressPayloadType, addressSchema, defaultValues } from '@/schema/address.schema';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import Image from 'next/image';

interface CartItem {
  product: { _id: string; title: string; imageCover: string };
  count: number;
  price: number;
  _id: string;
}

interface CheckoutFormProps {
  cartId: string;
  cartItems: CartItem[];
  totalPrice: number;
}

export default function CheckoutForm({ cartId, cartItems, totalPrice }: CheckoutFormProps) {
  const router = useRouter();
  const freeShipping = totalPrice >= 500;

  const { handleSubmit, control, getValues, formState: { isSubmitting } } = useForm<AddressPayloadType>({
    defaultValues,
    resolver: zodResolver(addressSchema),
    mode: 'onChange'
  });

  async function onSubmit(formValues: AddressPayloadType) {
    const res = await createOrder(cartId, formValues);
    if (res.status) {
      if (getValues('paymentMethod') === "cash") {
        toast.success("Order Created Successfully!", { duration: 2000 });
        router.push('/allorders');
      } else {
        open(res.session.url, "_self");
      }
    } else {
      toast.error(res?.message || "An error occurred");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        <div className=" mx-auto px-4">

      
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-2.5 rounded-xl">
              <Icon icon="material-symbols:receipt" className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Complete Your Order</h1>
            </div>
          </div>

          <Link href="/cart" className="flex items-center gap-1.5 text-green-600 hover:text-green-700 text-sm font-medium transition">
            <Icon icon="mdi:arrow-left" />
            Back to Cart
          </Link>
        </div>

        <p className="text-gray-500  font-medium text-lg mb-7 mt-2 ">Review your items and complete your purchase</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            <div className="flex-1 space-y-6">

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-green-600 px-6 py-4 flex items-center gap-2">
                  <Icon icon="mdi:home" className="text-white text-xl" />
                  <div>
                    <p className="text-white font-bold text-lg">Shipping Address</p>
                    <p className="text-green-100 text-md">Where should we deliver your order?</p>
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                    <Icon icon="mdi:information" className="text-blue-500 text-lg mt-0.5 shrink-0" />
                    <div>
                      <p className="text-blue-700 font-semibold text-sm">Delivery Information</p>
                      <p className="text-blue-500 text-xs">Please ensure your address is accurate for smooth delivery</p>
                    </div>
                  </div>

                  <Controller
                    name="city"
                    control={control}
                    render={({ field, fieldState }) => (
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                          City <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Icon icon="mdi:city" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                          <Input
                            {...field}
                            placeholder="e.g. Cairo, Alexandria, Giza"
                            className={`pl-10 h-12 rounded-xl border-gray-200 ${fieldState.invalid ? 'border-red-400 focus-visible:ring-red-400' : ''}`}
                          />
                        </div>
                        {fieldState.error && <p className="text-red-500 text-xs">{fieldState.error.message}</p>}
                      </div>
                    )}
                  />

                  <Controller
                    name="details"
                    control={control}
                    render={({ field, fieldState }) => (
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                          Street Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Icon icon="mdi:map-marker" className="absolute left-3 top-4 text-gray-400 text-lg" />
                          <textarea
                            {...field}
                            placeholder="Street name, building number, floor, apartment..."
                            rows={3}
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${fieldState.invalid ? 'border-red-400' : 'border-gray-200'}`}
                          />
                        </div>
                        {fieldState.error && <p className="text-red-500 text-xs">{fieldState.error.message}</p>}
                      </div>
                    )}
                  />

                  <Controller
                    name="phone"
                    control={control}
                    render={({ field, fieldState }) => (
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Icon icon="mdi:phone" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                          <Input
                            {...field}
                            placeholder="01xxxxxxxxx"
                            className={`pl-10 h-12 rounded-xl border-gray-200 ${fieldState.invalid ? 'border-red-400' : ''}`}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">Egyptian numbers only</span>
                        </div>
                        {fieldState.error && <p className="text-red-500 text-xs">{fieldState.error.message}</p>}
                      </div>
                    )}
                  />

                  <Controller
                    name="postalCode"
                    control={control}
                    render={({ field, fieldState }) => (
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                          Postal Code <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Icon icon="mdi:mailbox" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                          <Input
                            {...field}
                            placeholder="e.g. 12345"
                            className={`pl-10 h-12 rounded-xl border-gray-200 ${fieldState.invalid ? 'border-red-400' : ''}`}
                          />
                        </div>
                        {fieldState.error && <p className="text-red-500 text-xs">{fieldState.error.message}</p>}
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-green-600 px-6 py-4 flex items-center gap-2">
                  <Icon icon="mdi:credit-card" className="text-white text-xl" />
                  <div>
                    <p className="text-white font-bold text-lg">Payment Method</p>
                    <p className="text-green-100 text-md">Choose how you'd like to pay</p>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <Controller
                    name="paymentMethod"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          htmlFor="cash"
                          className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${field.value === 'cash' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                          <div className={`px-3 py-3.5 rounded-xl ${field.value === 'cash' ? 'bg-green-600' : 'bg-gray-100'}`}>
                            <Icon icon="fa6-solid:money-bill" className={`text-xl ${field.value === 'cash' ? 'text-white' : 'text-gray-500'}`} />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 text-sm">Cash on Delivery</p>
                            <p className="text-gray-500 text-xs">Pay when your order arrives at your doorstep</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${field.value === 'cash' ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}>
                            {field.value === 'cash' && <Icon icon="mdi:check" className="text-white text-xs" />}
                          </div>
                          <input
                            type="radio"
                            id="cash"
                            value="cash"
                            checked={field.value === 'cash'}
                            onChange={() => field.onChange('cash')}
                            className="sr-only"
                          />
                        </label>

                        <label
                          htmlFor="card"
                          className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${field.value === 'card' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                          <div className={`p-3 rounded-xl ${field.value === 'card' ? 'bg-green-600' : 'bg-gray-100'}`}>
                            <Icon icon="heroicons:credit-card-20-solid" className={`text-xl ${field.value === 'card' ? 'text-white' : 'text-gray-500'}`} />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 text-sm">Pay Online</p>
                            <p className="text-gray-500 text-xs">Secure payment with Credit/Debit Card via Stripe</p>
                          <div className="flex gap-1.5 mt-2">
  {['brandico:visa', 'logos:mastercard', 'lineicons:amex'].map((card) => (
    <Icon key={card} icon={card} className="size-4" />
  ))}
</div>
                            </div>
                          
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${field.value === 'card' ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}>
                            {field.value === 'card' && <Icon icon="mdi:check" className="text-white text-xs" />}
                          </div>
                          <input
                            type="radio"
                            id="card"
                            value="card"
                            checked={field.value === 'card'}
                            onChange={() => field.onChange('card')}
                            className="sr-only"
                          />
                        </label>

                        <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                          <Icon icon="mdi:shield-lock" className="text-green-600 text-xl shrink-0" />
                          <div>
                            <p className="text-gray-700 font-semibold text-sm">Secure & Encrypted</p>
                            <p className="text-gray-400 text-xs">Your payment info is protected with 256-bit SSL encryption</p>
                          </div>
                        </div>
                      </>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="  shrink-0 sticky top-20">
              <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-6">
                <div className="bg-green-600 px-5 py-4">
                  <div className="flex items-center gap-2 text-white">
                    <Icon icon="mdi:shield-check" className="text-xl" />
                    <span className="font-bold text-lg">Order Summary</span>
                  </div>
                  <p className="text-green-100 text-xs mt-0.5">{cartItems.length} {cartItems.length !== 1 ? 'items' : 'item'} in your cart</p>
                </div>

                <div className="p-5 space-y-4">
                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {cartItems.map(item => (
                      <div key={item._id} className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-100 shrink-0">
                          <Image
                            src={item.product.imageCover}
                            alt={item.product.title}
                            width={48} height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-800 truncate">{item.product.title}</p>
                          <p className="text-xs text-gray-400">{item.count} × {item.price} EGP</p>
                        </div>
                        <p className="text-sm font-bold text-gray-900 shrink-0">{item.count * item.price}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600 text-md">
                      <span className='text-lg'>Subtotal</span>
                      <span className="font-semibold text-gray-900">{totalPrice.toLocaleString()} EGP</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span className='text-lg'>Shipping</span>
                      <span className={freeShipping ? "text-green-600 font-bold" : "text-gray-500"}>
                        {freeShipping ? "FREE" : "Calculated"}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                    <span className="font-bold text-gray-900 text-base">Total</span>
                    <span className="font-bold text-green-600 text-xl">
                      {totalPrice.toLocaleString()} <span className="text-sm font-normal text-gray-500">EGP</span>
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold rounded-xl py-3.5 transition text-base"
                  >
                    {isSubmitting
                      ? <><Icon icon="mdi:loading" className="animate-spin" /> Processing...</>
                      : <><Icon icon="mdi:cart-check" /> Place Order</>
                    }
                  </button>

                  <div className="flex justify-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Icon icon="mdi:shield-check-outline" className="text-green-500" />Secure</span>
                    <span className="text-gray-200">|</span>
                    <span className="flex items-center gap-1"><Icon icon="mdi:truck-fast-outline" className="text-green-500" />Fast Delivery</span>
                    <span className="text-gray-200">|</span>
                    <span className="flex items-center gap-1"><Icon icon="mdi:refresh" className="text-green-500" />Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
      </div>
    </div>
  );
}