import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminClientList = () => {
    const [clients, setClients] = useState([]);
    const [error, setError] = useState('');

    const fetchClients = async () => {
        const token = JSON.parse(sessionStorage.getItem('token'));

        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/user/clients`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.data.success) {
                setClients(res.data.data);
            } else {
                setError(res.data.message);
            }
        } catch (err) {
            console.error(err);
            setError('Failed to fetch clients.');
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">All Client Users</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {clients.length > 0 ? (
                <div className="overflow-x-auto rounded shadow border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">User Name</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Role</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {clients.map(user => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.userName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">{user.role}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500">No client users found.</p>
            )}
        </div>
    );
};

export default AdminClientList;
