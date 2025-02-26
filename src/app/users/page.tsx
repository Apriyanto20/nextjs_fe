"use client"; // Pastikan komponen ini dijalankan di sisi client

import React, { useState, useEffect } from 'react';
import AddUserModal from './adduserform'; // Impor komponen AddUserModal

type User = {
    id: number;
    name: string;
    email: string;
};

async function getUsers(): Promise<User[]> {
    const res = await fetch('/users.json'); // Ambil data dari file JSON di folder public
    if (!res.ok) {
        throw new Error('Gagal mengambil data');
    }
    return res.json();
}

export default function UsersPage() {
    const [searchTerm, setSearchTerm] = useState(''); // State untuk menyimpan nilai pencarian
    const [users, setUsers] = useState<User[]>([]); // State untuk menyimpan data users
    const [loading, setLoading] = useState(true); // State untuk loading
    const [error, setError] = useState<string | null>(null); // State untuk error
    const [isModalOpen, setIsModalOpen] = useState(false); // State untuk mengontrol modal
    const [currentPage, setCurrentPage] = useState(1); // State untuk pagination
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // State untuk pengurutan nama
    const itemsPerPage = 10; // Jumlah item per halaman

    // Ambil data users saat komponen dimuat
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (err) {
                setError('Gagal mengambil data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Fungsi untuk memfilter data berdasarkan nama dan email
    const filteredUsers = users.filter((user) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            user.name.toLowerCase().includes(searchLower) ||
            user.email.toLowerCase().includes(searchLower)
        );
    });

    // Fungsi untuk mengurutkan data berdasarkan nama
    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });

    // Fungsi untuk menambahkan user baru
    const handleAddUser = (newUser: User) => {
        // Cari ID terakhir
        const lastId = users.length > 0 ? users[users.length - 1].id : 0;
        // Generate ID baru (increment dari ID terakhir)
        const newUserId = lastId + 1;

        // Tambahkan user baru dengan ID yang benar
        setUsers((prev) => [...prev, { ...newUser, id: newUserId }]);

        // Tampilkan alert berhasil
        alert('Data berhasil ditambahkan!');
    };

    // Fungsi untuk menghapus user berdasarkan ID
    const handleDeleteUser = (userId: number) => {
        // Tampilkan alert konfirmasi
        const isConfirmed = window.confirm('Apakah Anda yakin ingin menghapus data ini?');

        // Jika pengguna memilih "OK", hapus data
        if (isConfirmed) {
            // Filter data users untuk menghapus user dengan ID yang sesuai
            const updatedUsers = users.filter((user) => user.id !== userId);
            setUsers(updatedUsers); // Perbarui state users
        }
    };

    // Fungsi untuk mengubah halaman
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Fungsi untuk mengubah urutan pengurutan
    const toggleSortOrder = () => {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    };

    // Hitung total halaman
    const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

    // Ambil data untuk halaman saat ini
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage);

    // Tampilkan loading state
    if (loading) {
        return <div className="p-6">Memuat data...</div>;
    }

    // Tampilkan error state
    if (error) {
        return <div className="p-6 text-red-500">{error}</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">User Data</h1>

            {/* Tombol untuk membuka modal */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Tambah User
            </button>

            {/* Modal untuk form tambah data */}
            <AddUserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddUser={handleAddUser}
            />

            {/* Input Pencarian */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Cari berdasarkan nama atau email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Tabel */}
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b cursor-pointer" onClick={toggleSortOrder}>
                            Name {sortOrder === 'asc' ? '↑' : '↓'}
                        </th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b text-center">{user.id}</td>
                            <td className="py-2 px-4 border-b text-center">{user.name}</td>
                            <td className="py-2 px-4 border-b text-center">{user.email}</td>
                            <td className="py-2 px-4 border-b text-center">
                                <button
                                    onClick={() => handleDeleteUser(user.id)} // Panggil fungsi hapus
                                    className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4 flex justify-center space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 ${currentPage === index + 1
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700'
                            } rounded-lg hover:bg-blue-600`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}