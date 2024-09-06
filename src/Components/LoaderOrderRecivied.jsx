import React from 'react';
import { Skeleton } from '@mui/material';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline'; // Adjust import if necessary

const LoaderOrderRecived = () => {
  return (
    <div className="py-16">
          <div
      aria-hidden="true"
      className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
    >
      <div
        style={{
          clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
        }}
        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-br from-[#892dc2] via-[#e34680] to-[#db8ab3] opacity-50 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
      />
    </div>

    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
    >
      <div
        style={{
          clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
        }}
        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-br from-[#f2bed1] via-[#f8e8ee] to-[#d946ef] opacity-50 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
      />
    </div>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        {/* Title Skeleton */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Order Details</h2>


        {/* Card Skeleton */}
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md p-6 mb-8">
            {/* Name Skeleton */}
            <Skeleton variant="text" width={150} height={30} className="mb-4" />

            {/* Detail Skeletons */}
            <Skeleton variant="text" width={200} height={24} className="mb-2" />
            <Skeleton variant="text" width={200} height={24} className="mb-2" />
            <Skeleton variant="text" width={200} height={24} className="mb-2" />
            <Skeleton variant="text" width={250} height={24} className="mb-2" />
            <Skeleton variant="text" width={200} height={24} className="mb-2" />

            {/* Products Skeleton */}
            <div className="relative mt-6">
              <Skeleton variant="text" width={150} height={24} className="mb-2" />

              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <span>Loading Products...</span>
                  <ChevronDownIcon className="w-5 h-5 ml-2" />
                </Menu.Button>
                <Menu.Items className="z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-y-auto">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="p-4 border-b border-gray-200 last:border-b-0 flex items-center">
                      <Skeleton variant="rectangular" width={96} height={96} className="mr-4" />
                      <div className="flex-1">
                        <Skeleton variant="text" width={150} height={24} className="mb-2" />
                        <Skeleton variant="text" width={100} height={20} className="mb-2" />
                        <Skeleton variant="text" width={100} height={20} className="mb-2" />
                        <Skeleton variant="text" width={80} height={24} />
                      </div>
                    </div>
                  ))}
                </Menu.Items>
              </Menu>
            
            </div>

  {/* Buttons Skeleton */}
  <div className="mt-4 flex space-x-2">
              <Skeleton variant="rectangular" width={120} height={40} className="rounded-md shadow-sm" />
              <Skeleton variant="rectangular" width={120} height={40} className="rounded-md shadow-sm" />
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default LoaderOrderRecived;
