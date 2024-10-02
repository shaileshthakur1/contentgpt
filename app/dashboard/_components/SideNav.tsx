'use client';
import { useEffect } from 'react';
import { FileClock, HomeIcon, Settings, WalletCards } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image'; // Importing Image from next/image
import UsageTrack from './UsageTrack';

function SideNav() {
  const MenuList = [
    {
      name: 'Home',
      icon: HomeIcon,
      path: '/dashboard',
    },
    {
      name: 'History',
      icon: FileClock,
      path: '/dashboard/history',
    },
    {
      name: 'Billing',
      icon: WalletCards,
      path: '/dashboard/billing',
    },
    {
      name: 'Setting',
      icon: Settings,
      path: '/dashboard/setting',
    },
  ];

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="h-screen shadow-sm border bg-white">
      <div className="ml-0 flex justify-center">
        <Image src={'/logo.svg'} alt="logo" width={100} height={100} /> {/* Changed to Image component */}
      </div>
      <hr className="my-6 border" />
      <div className="mt-3 h-3">
        {MenuList.map((menu, index) => (
          <div
            key={index} // Added unique key prop
            className={`flex gap-2 b-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer items-center ${path == menu.path && 'bg-primary text-white'}`}
          >
            <menu.icon className="h-6 w-6" />
            <h2 className="text-lg">{menu.name}</h2>
          </div>
        ))}
      </div>
      <div>
        <UsageTrack />
      </div>
    </div>
  );
}

export default SideNav;
