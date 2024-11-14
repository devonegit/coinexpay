import React from 'react';

const PageHeadings = ({ title, breadcrumbs }) => {
  return (
    <div className="bg-white p-2 flex justify-between items-center rounded-md">
      <h1 className="text-gray-600 text-sm font-bold">{title}</h1>
      <nav aria-label="breadcrumb">
        <ol className="flex space-x-2 text-xs text-gray-500">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={index} className="breadcrumb-item flex items-center">
              {index !== breadcrumbs.length - 1 ? (
                <a href={breadcrumb.href} className="text-blue-600 hover:underline">
                  {breadcrumb.label}
                </a>
              ) : (
                <span className="text-gray-500">{breadcrumb.label}</span>
              )}
              {index !== breadcrumbs.length - 1 && <span className="mx-2">/</span>}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default PageHeadings;
