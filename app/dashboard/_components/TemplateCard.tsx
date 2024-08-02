import React from 'react';
import { TEMPLATE } from './TemplateListSection';

function TemplateCard({ name, desc, icon }: TEMPLATE) {
  return (
    <div className='p-5 shadow-md rounded-md border
     bg-white flex flex-col gap-3 cursor-pointer hover:scale-105 transition-all'>
      <img src={icon} alt='icon' width={30} height={30} />
      <h2 className='font-medium text-lg'>{name}</h2>
      <p className='text-gray-500 line-clamp-3'>{desc}</p>
    </div>
  );
}

export default TemplateCard;
