import React from 'react';

const Header = () => (
  <header className="bg-white shadow-sm sticky top-0 z-10">
    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-3">
        <svg className="h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Intérprete de Informes Clínicos con IA</h1>
            <p className="text-sm text-gray-500">Transformando informes médicos en información clara y procesable.</p>
        </div>
      </div>
    </div>
  </header>
);

export default Header;