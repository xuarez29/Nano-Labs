import React from 'react';

const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

export const FullPageSpinner = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <Spinner />
        <p className="text-lg font-medium text-gray-700 animate-pulse">{message}</p>
        <p className="text-sm text-gray-500">Esto puede tardar un momento...</p>
    </div>
);