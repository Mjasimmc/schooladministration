import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const headerItems = [
  { label: 'Admin', href: '/admin' },
  { label: 'Blogs', href: '#' },
  { label: 'About', href: '#' },
  { label: 'School', href: '/school', ariaLabel: 'Log in' }
];

const LandingHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link to="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
          </Link>
        </div>
        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:gap-x-12">
          {headerItems.slice(0, -1).map((item, index) => (
            <Link key={index} to={item.href} className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600">
              {item.label}
            </Link>
          ))}
        </div>
        {/* Actions */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {headerItems.slice(-1).map((action, index) => (
            <Link key={index} to={action.href} aria-label={action.ariaLabel} className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600">
              {action.label}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          ))}
        </div>
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </nav>
      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 duration-500 sm:ring-gray-900/10 lg:hidden">
          <div className="flex items-center justify-between">
            <div className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            </div>
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Close menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-6 space-y-4">
            {headerItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.href)}
                aria-label={item.ariaLabel}
                className="block py-2 text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingHeader;
