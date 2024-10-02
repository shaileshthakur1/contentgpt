import React from 'react';
import { TEMPLATE } from './TemplateListSection';
import Image from 'next/image'
import  Link  from 'next/link'

function TemplateCard({ name, desc, icon }: TEMPLATE) {
  const slug = name.toLowerCase().replace(/ /g, '-');
  return (
    <Link href={'/dashboard/content/'+slug}>
    <div className='p-5 shadow-md rounded-md border
     bg-white flex flex-col gap-3 cursor-pointer hover:scale-105 transition-all'>
      <Image src={icon} alt='icon' width={30} height={30} />
      <h2 className='font-medium text-lg'>{name}</h2>
      <p className='text-gray-500 line-clamp-3'>{desc}</p>
    </div>
    </Link>
  );
}

export default TemplateCard;
