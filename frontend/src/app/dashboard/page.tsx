'use client';
import { fetchRequests } from '@/lib/api/requestApi';
import React, { useEffect, useState } from 'react';

interface Requests {
  id: number;
  guestPhone: string;
  requestText: string;
  status: string;
  createdAt: string;
}

const DashboardPage = () => {
  const [requests, setRequests] = useState<Requests[]>([]);
  const [loading, setLoading] = useState(false);

  const loadRequests = async () => {
    const data = await fetchRequests();
    if (data) setRequests(data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true)
    loadRequests();
    const interval = setInterval(loadRequests, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Guest Requests Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">


            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Request
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                      <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{req.guestPhone}</td>
                      <td className="px-6 py-4">{req.requestText}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-2 py-1 rounded text-sm ${req.status === 'pending'
                            ? 'bg-yellow-200 text-yellow-800'
                            : 'bg-green-200 text-green-800'
                            }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{new Date(req.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
