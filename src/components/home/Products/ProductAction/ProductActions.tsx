"use client"
import {  useState } from 'react';
import { Button } from "@/components/ui/button"
import { Icon } from '@iconify/react';

interface ProductActionsProps{
  quantity:number,
  price:number
}


export default function ProductActions({quantity , price}:ProductActionsProps) {

  console.log("qun",quantity)
  function Decrease() {
  if (count > 1 ) {
    setcount(count - 1)
  }
}
function Increase() {
  if(count<quantity){
  setcount(count + 1)

  }
}

  const [count, setcount] = useState(1)
  const total=count*price;
  return (
    <>
    <div>
      <span className=" text-sm font-medium text-gray-700 mb-2">Quantity</span>
      <div className='flex flex-row items-center gap-3'>
  <div className=' flex items-center justify-between border-2 border-gray-200 rounded-lg mt-2 w-40 h-12 overflow-hidden '>
        <Button variant="ghost"  onClick={Decrease} disabled={count <= 1} className='group disabled:opacity-50 disabled:cursor-not-allowed rounded-none h-full hover:bg-gray-100'>
          <Icon icon="ic:baseline-minus" className=' size-6 text-gray-600 group-hover:text-green-500'></Icon>
        </Button >
        <input type="number" value={count}  
        onChange={(e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) {
      setcount(val); 
    } else if (e.target.value === "") {
      setcount(0);  
    }
  }}
        
        className='w-16 text-center  border-0 text-lg font-medium'/>
        <Button variant="ghost"  onClick={Increase} className='group hover:bg-gray-100 rounded-none h-full'>
        <Icon icon="ic:outline-plus" className=' size-6 text-gray-600 group-hover:text-green-500 '></Icon>
        </Button >
      </div>
    <span className="text-md text-gray-500">{quantity} available</span>

      </div>
    


<div className='flex justify-between bg-gray-50 rounded-lg p-4 my-6'>
  <span className="text-gray-600">Total Price:</span>
  <span className="text-2xl font-bold text-green-600">{total}.00 EGP</span>
</div>

    </div>
    
    
    </>
  )
}
