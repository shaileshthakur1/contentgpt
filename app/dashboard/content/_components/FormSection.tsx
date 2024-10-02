"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import { TEMPLATE } from '../../_components/TemplateListSection';

interface PROPS {
    selectedTemplate?: TEMPLATE;
    userFormInput: (formData: any) => void;
    loading: boolean;
}

function FormSection({ selectedTemplate, userFormInput, loading }: PROPS) {
    const [formData, setFormData] = useState<any>({});

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        userFormInput(formData);
    };

    return (
        <div className='p-5 shadow-lg border rounded-lg bg-white h-full overflow-auto'>
            {selectedTemplate?.icon && (
                <Image 
                    src={selectedTemplate.icon as string} 
                    alt='icon' 
                    width={50} 
                    height={50} 
                />
            )}
            <h2 className='font-bold text-2xl mb-2 text-primary'>{selectedTemplate?.name}</h2>
            <p className='text-gray-500 text-sm'>{selectedTemplate?.desc}</p>

            <form className='mt-6' onSubmit={onSubmit}>
                {selectedTemplate?.form?.map((item, index) => (
                    <div className='my-2 flex flex-col gap-2 mb-7' key={index}>
                        <label className='font-bold'>{item.label}</label>
                        {item.field === 'input' ? (
                            <input
                                name={item.name}
                                required={item?.required}
                                onChange={handleInputChange}
                                className="border p-2 w-full mb-2"
                                type="text"
                            />
                        ) : item.field === 'textarea' ? (
                            <Textarea
                                name={item.name}
                                required={item?.required}
                                onChange={handleInputChange}
                                className="border p-2 w-full mb-2"
                            />
                        ) : null}
                    </div>
                ))}
                <Button type='submit' className='w-full py-6' disabled={loading}>
                    {loading && <Loader2Icon className='animate-spin' />}
                    Generate Button
                </Button>
            </form>
        </div>
    );
}

export default FormSection;
