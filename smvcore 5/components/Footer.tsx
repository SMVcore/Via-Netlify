import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-business-blue text-slate-400 py-12 border-t border-slate-800">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h4 className="text-white font-bold text-xl mb-1">SMVcore</h4>
          <p className="text-sm">Fundamentet til ejerledere.</p>
        </div>
        <div className="text-sm">
          &copy; {new Date().getFullYear()} SMVcore ApS. Alle rettigheder forbeholdes.
        </div>
      </div>
    </footer>
  );
};

export default Footer;