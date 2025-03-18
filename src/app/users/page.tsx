"use client";

import React, { useState, useEffect } from "react";
import AddUserModal from "./adduserform"; // Komponen untuk menambah user
import EditUserModal from "./edituserform"; // Komponen untuk mengedit user

type User = {
    id: number;
    name: string;
    email: string;
};

async function getUsers(): Promise<User[]> {
    const res = await fetch("/users.json");
    if (!res.ok) {
        throw new Error("Gagal mengambil data");
    }
    return res.json();
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const itemsPerPage = 10;
    const pagesPerView = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const handleEditUser = (updatedUser: User) => {
        setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
        setIsEditModalOpen(false);
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const displayedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const startPage = Math.floor((currentPage - 1) / pagesPerView) * pagesPerView + 1;
    const endPage = Math.min(startPage + pagesPerView - 1, totalPages);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="container mx-auto px-4 py-6 mt-16">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Users</h1>
            </div>

            <input
                type="text"
                placeholder="Search users..."
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="mb-4 text-gray-500">
                <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-3">No</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedUsers.map((user, index) => (
                            <tr key={user.id} className="border-t hover:bg-gray-50">
                                <td className="p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                <td className="p-3 text-gray-500">{user.name}</td>
                                <td className="p-3 text-gray-500">{user.email}</td>
                                <td className="p-3 flex space-x-2">
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Add user
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditingUser(user);
                                            setIsEditModalOpen(true);
                                        }}
                                        className="px-2 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
                                                setUsers(users.filter((u) => u.id !== user.id));
                                            }
                                        }}
                                        className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <nav aria-label="Page navigation example" className="flex justify-center mt-6">
                <ul className="flex items-center space-x-1">
                    <li>
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 h-8 leading-tight border rounded-s-lg ${currentPage === 1
                                ? "text-gray-400 bg-gray-200 cursor-not-allowed"
                                : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                }`}
                        >
                            &laquo;
                        </button>
                    </li>
                    {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
                        <li key={page}>
                            <button
                                onClick={() => goToPage(page)}
                                className={`px-3 h-8 leading-tight border ${currentPage === page
                                    ? "text-white bg-blue-600 border-blue-300"
                                    : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                    }`}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-3 h-8 leading-tight border rounded-e-lg ${currentPage === totalPages
                                ? "text-gray-400 bg-gray-200 cursor-not-allowed"
                                : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                }`}
                        >
                            &raquo;
                        </button>
                    </li>
                </ul>
            </nav>

            <AddUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddUser={(newUser: User) => {
                const lastId = users.length > 0 ? users[users.length - 1].id : 0;
                setUsers([...users, { ...newUser, id: lastId + 1 }]);
                alert("Data berhasil ditambahkan!");
            }} />

            <EditUserModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} user={editingUser} onEditUser={handleEditUser} />
        </div>
    );
}