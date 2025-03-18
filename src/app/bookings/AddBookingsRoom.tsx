"use client";

import React, { useState } from "react";

type Booking = {
    roomId: string;
    userId: string;
    startDate: string;
    endDate: string;
    bookingDate: string;
};

type AddBookingModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onAddBooking: (newBooking: Booking) => void;
};

export default function AddBookingModal({ isOpen, onClose, onAddBooking }: AddBookingModalProps) {
    const [formData, setFormData] = useState<Booking>({
        roomId: "",
        userId: "",
        startDate: "",
        endDate: "",
        bookingDate: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddBooking(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">Add Booking</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold">Room ID</label>
                        <input type="text" name="roomId" value={formData.roomId} onChange={handleChange} className="p-2 border rounded" required />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold">User ID</label>
                        <input type="text" name="userId" value={formData.userId} onChange={handleChange} className="p-2 border rounded" required />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold">Start Date</label>
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="p-2 border rounded" required />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold">End Date</label>
                        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="p-2 border rounded" required />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold">Booking Date</label>
                        <input type="date" name="bookingDate" value={formData.bookingDate} onChange={handleChange} className="p-2 border rounded" required />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="px-3 py-2 bg-gray-300 rounded">Cancel</button>
                        <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
