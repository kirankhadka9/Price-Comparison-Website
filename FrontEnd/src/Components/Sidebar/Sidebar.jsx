import React, { useState } from 'react';
import * as Icons from 'react-icons/md';
import * as FiIcons from 'react-icons/fi';
import * as AiIcons from 'react-icons/ai';
import * as TbIcons from 'react-icons/tb';
import * as HiIcons from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const menus = [
    { name: 'dashboard', link: '/', icon: Icons.MdOutlineDashboard },
    { name: 'messages', link: '/', icon: FiIcons.FiMessageSquare },
    { name: 'user', link: '/', icon: AiIcons.AiOutlineUser },
    { name: 'analytics', link: '/', icon: TbIcons.TbReportAnalytics, margin: true },
    { name: 'File Manager', link: '/', icon: FiIcons.FiFolder },
    { name: 'Cart', link: '/', icon: FiIcons.FiShoppingCart },
    { name: 'Saved', link: '/', icon: AiIcons.AiOutlineHeart, margin: true },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      <div className="m-3 text-x1 text-white font-semibold">Sidebar</div>
      <div
        className={`bg-[#0e0e0e] min-h-[795px] ${
          open ? 'w-72' : 'w-16'
        } duration-500 text-gray-100 px-4`}
        style={{ marginLeft: 'auto' }}
      >
        <div className="py-3 flex justify-end">
          <HiIcons.HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={`${menu?.margin && 'mt-5'}flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: '20' })}</div>
              <h2
                style={{ transitionDelay: `${i + 3}00ms` }}
                className={`whitespace-pre duration-500 ${
                  !open && 'opacity-0 translate-x-28 overflow-hidden'
                }`}
              >
                {menu?.name}{' '}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
