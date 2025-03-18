"use client";

import React, { useState, useEffect } from "react";
import AddRoomModal from "./AddRoomModal";
import EditRoomModal from "./EditRoomModal";

type Room = {
    id: number;
    name: string;
    description: string;
    categoryId: string;
    userId: string;
    image: string;
    capacity: number;
    price: number;
    status: string;
};

async function getRooms(): Promise<Room[]> {
    // Simulasi fetch data
    return [
        { id: 1, name: "Room A", description: "Luxury room", categoryId: "1", userId: "101", image: "img1.jpg", capacity: 2, price: 100, status: "Available" },
        { id: 2, name: "Room B", description: "Standard room", categoryId: "2", userId: "102", image: "img2.jpg", capacity: 3, price: 80, status: "Booked" }
    ];
}

export default function RoomPage() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingRoom, setEditingRoom] = useState<Room | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const pagesPerView = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getRooms();
                setRooms(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const handleAddRoom = (newRoom: Room) => {
        setRooms([...rooms, { ...newRoom, id: Date.now() }]);
        alert("Room berhasil ditambahkan!");
    };

    const handleEditRoom = (updatedRoom: Room) => {
        setRooms(rooms.map((room) => (room.id === updatedRoom.id ? updatedRoom : room)));
        setIsEditModalOpen(false);
    };

    const handleDeleteRoom = (roomId: number) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus room ini?")) {
            setRooms(rooms.filter((room) => room.id !== roomId));
        }
    };

    const filteredRooms = rooms.filter((room) => room.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
    const displayedRooms = filteredRooms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const startPage = Math.floor((currentPage - 1) / pagesPerView) * pagesPerView + 1;
    const endPage = Math.min(startPage + pagesPerView - 1, totalPages);

    return (
        <div className="container mx-auto px-4 py-6 mt-16">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Room Management</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Tambah Room
                </button>
            </div>

            <input
                type="text"
                placeholder="Search rooms..."
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-3">No</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Capacity</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedRooms.map((room, index) => (
                        <tr key={room.id} className="border-t hover:bg-gray-50">
                            <td className="p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                            <td className="p-3 text-gray-500">{room.name}</td>
                            <td className="p-3 text-gray-500">{room.capacity}</td>
                            <td className="p-3 text-gray-500">${room.price}</td>
                            <td className="p-3 text-gray-500">{room.status}</td>
                            <td className="p-3 flex space-x-2">
                                <button
                                    onClick={() => {
                                        setEditingRoom(room);
                                        setIsEditModalOpen(true);
                                    }}
                                    className="px-2 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteRoom(room.id)}
                                    className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <nav aria-label="Page navigation" className="flex justify-center mt-6">
                <ul className="flex items-center space-x-1">
                    <li>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-3 h-8 leading-tight border rounded-s-lg ${currentPage === 1 ? "text-gray-400 bg-gray-200 cursor-not-allowed" : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                }`}
                        >
                            &laquo;
                        </button>
                    </li>
                    {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
                        <li key={page}>
                            <button
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 h-8 leading-tight border ${currentPage === page ? "text-white bg-blue-600 border-blue-300" : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                    }`}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`px-3 h-8 leading-tight border rounded-e-lg ${currentPage === totalPages ? "text-gray-400 bg-gray-200 cursor-not-allowed" : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                }`}
                        >
                            &raquo;
                        </button>
                    </li>
                </ul>
            </nav>

            <AddRoomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddRoom={handleAddRoom} />
            <EditRoomModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} room={editingRoom} onEditRoom={handleEditRoom} />
        </div>
    );
}
