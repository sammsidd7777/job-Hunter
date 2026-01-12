import React, { useState, useEffect } from 'react';
import { useGetApplyListQuery } from '../../../RTK/AuthService';

const statusColors = {
  Applied: 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200',
  Interviewing: 'bg-blue-100 text-blue-600 dark:bg-blue-800/30 dark:text-blue-400',
  'Offer Received': 'bg-green-100 text-green-600 dark:bg-green-800/30 dark:text-green-400',
  Rejected: 'bg-red-100 text-red-600 dark:bg-red-800/30 dark:text-red-400',
};

const Application = () => {
  const { data: applyList, isLoading } = useGetApplyListQuery();
  const [status, setStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [status, applyList]);

  const filteredList =
    applyList?.filter(app => status === 'All' ? true : app?.status === status) || [];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedList = filteredList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  if (isLoading) return <p className="text-center mt-10">Loading applications...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Applications</h2>
      <p className="text-gray-500 dark:text-gray-400">
        Track and manage your current job applications.
      </p>

      {/* Status Filter Dropdown */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded p-2 text-sm mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
      >
        <option value="All">All</option>
        <option value="Applied">Applied</option>
        <option value="Interviewing">Interviewing</option>
        <option value="Offer Received">Offer Received</option>
        <option value="Rejected">Rejected</option>
      </select>

      {filteredList.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 mt-4">
          No applications found for "{status}".
        </p>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-900/50">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Job Role & Company
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Date Applied
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedList.map((app, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {app?.job?.title}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-400">
                      {app?.job?.company}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(app?.appliedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[app.status] || 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'}`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-blue-600 dark:text-blue-400 font-medium cursor-pointer hover:underline">
                    {app.status === 'Offer Received'
                      ? 'Review Offer →'
                      : app.status === 'Rejected'
                      ? 'Archive'
                      : 'View →'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-end px-6 py-4 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Application;
