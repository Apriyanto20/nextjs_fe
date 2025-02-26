"use client"; // Pastikan komponen ini dijalankan di sisi client

import React, { useState } from 'react';

type User = {
    id: number;
    name: string;
    email: string;
};

type AddUserModalProps = {
    isOpen: boolean; // Status modal (terbuka/tertutup)
    onClose: () => void; // Fungsi untuk menutup modal
    onAddUser: (newUser: User) => void; // Fungsi untuk menambahkan user baru
};

export default function AddUserModal({ isOpen, onClose, onAddUser }: AddUserModalProps) {
    const [newUser, setNewUser] = useState({ name: '', email: '' }); // State untuk form input

    // Fungsi untuk menangani perubahan input form
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    // Fungsi untuk menangani submit form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validasi input
        if (!newUser.name || !newUser.email) {
            alert('Nama dan email harus diisi!');
            return;
        }

        // Buat user baru dengan ID increment
        const newUserData: User = {
            id: 0, // ID sementara, akan di-generate di halaman utama
            name: newUser.name,
            email: newUser.email,
        };

        // Panggil fungsi onAddUser dari prop
        onAddUser(newUserData);

        // Reset form dan tutup modal
        setNewUser({ name: '', email: '' });
        onClose();
    };

    // Jika modal tidak terbuka, kembalikan null
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Tambah User Baru</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Nama"
                            value={newUser.name}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={newUser.email}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}