import React from 'react';

const NavBar = ({ role }) => {
  
  const capitalizedRole = role ? role.charAt(0).toUpperCase() + role.slice(1) : "";

  return (
    <nav className={`sticky text-white bg-gray-600 dark:bg-blue-800 rounded-lg ${role=="admin"?"dark:bg-green-800":(role=="teacher"?"dark:bg-red-800":"dark:bg-blue-800")}`}>
      <div className='px-4 py-3 flex items-center justify-between'>
        <div className='font-extrabold text-xl py-4'>{capitalizedRole}</div>
      </div>
    </nav>
  );
};

export default NavBar;
