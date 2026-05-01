import React from 'react'


interface SectionTitleProps{
  subtitle:string,
  type:string
}
export default function SectionTittle({subtitle,type}:SectionTitleProps) {
  return (
    <div className='my-8 gap-3'>
      <h2 className='leading-9  text-gray-800 font-bold text-3xl ps-3 relative before:content-[""] before:absolute before:w-1.5 before:top-1/2 
       before:-translate-y-1/2 before:rounded-sm before:h-8 before:inset-s-0 before:bg-gradient-to-b  before:from-emerald-500 before:to-emerald-700'>{subtitle}<span className=' ms-1 text-3xl leading-9  font-bold text-emerald-600'>{type}</span></h2> 
    </div>
  )
}
