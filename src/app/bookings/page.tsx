"use client";

import React, { useState, useEffect } from "react";
import AddBookingModal from "./AddBookingsRoom";
import EditBookingModal from "./EditBookingsRoom";

type Booking = {
    id: number;
    roomId: number;
    userId: number;
    startDate: string;
    endDate: string;
    bookingDate: string;
};

async function getBookings(): Promise<Booking[]> {
    const res = await fetch("/bookings.json"); // Pastikan path ini benar
    if (!res.ok) {
        throw new Error("Gagal mengambil data booking");
    }
    return res.json();
}


export default function BookingPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const pagesPerView = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBookings();
                setBookings(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const handleEditBooking = (updatedBooking: Booking) => {
        setBookings(bookings.map((booking) => (booking.id === updatedBooking.id ? updatedBooking : booking)));
        setIsEditModalOpen(false);
    };

    const filteredBookings = bookings.filter((booking) =>
        booking.roomId.toString().includes(searchTerm) || booking.userId.toString().includes(searchTerm)
    );

    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
    const displayedBookings = filteredBookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="container mx-auto px-4 py-6 mt-16">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold mb-4">Booking Management</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Add Booking
                </button>
            </div>
            <input
                type="text"
                placeholder="Search bookings..."
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-3">No</th>
                        <th className="p-3">Room ID</th>
                        <th className="p-3">User ID</th>
                        <th className="p-3">Start Date</th>
                        <th className="p-3">End Date</th>
                        <th className="p-3">Booking Date</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedBookings.map((booking, index) => (
                        <tr key={booking.id} className="border-t hover:bg-gray-50">
                            <td className="p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                            <td className="p-3">{booking.roomId}</td>
                            <td className="p-3">{booking.userId}</td>
                            <td className="p-3">{booking.startDate}</td>
                            <td className="p-3">{booking.endDate}</td>
                            <td className="p-3">{booking.bookingDate}</td>
                            <td className="p-3 flex space-x-2">
                                
                                <button
                                    onClick={() => {
                                        setEditingBooking(booking);
                                        setIsEditModalOpen(true);
                                    }}
                                    className="px-2 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
                                            setBookings(bookings.filter((b) => b.id !== booking.id));
                                        }
                                    }}
                                    className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav className="flex justify-center mt-6">
                <ul className="flex items-center space-x-1">
                    <li>
                        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-3 h-8 leading-tight border rounded-s-lg">
                            &laquo;
                        </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <li key={page}>
                            <button onClick={() => goToPage(page)} className={`px-3 h-8 leading-tight border ${currentPage === page ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}>
                                {page}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 h-8 leading-tight border rounded-e-lg">
                            &raquo;
                        </button>
                    </li>
                </ul>
            </nav>

            <AddBookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddBooking={(newBooking: Booking) => {
                const lastId = bookings.length > 0 ? bookings[bookings.length - 1].id : 0;
                setBookings([...bookings, { ...newBooking, id: lastId + 1 }]);
            }} />

            <EditBookingModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} booking={editingBooking} onEditBooking={handleEditBooking} />
        </div>
    );
}
