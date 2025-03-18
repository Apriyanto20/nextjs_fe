import React, { useState, useEffect } from "react";

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

type Props = {
    isOpen: boolean;
    onClose: () => void;
    room: Room | null;
    onEditRoom: (room: Room) => void;
};

export default function EditRoomModal({ isOpen, onClose, room, onEditRoom }: Props) {
    const [updatedRoom, setUpdatedRoom] = useState<Room | null>(room);

    useEffect(() => {
        if (room) {
            setUpdatedRoom(room);
        }
    }, [room]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (updatedRoom) {
            setUpdatedRoom({ ...updatedRoom, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = () => {
        if (updatedRoom) {
            onEditRoom(updatedRoom);
            onClose();
        }
    };

    if (!isOpen || !updatedRoom) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
                <h2 className="text-xl font-bold mb-4 text-center">Edit Room</h2>

                {/* Grid Layout 2 Kolom */}
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: "Nama", name: "name" },
                        { label: "Deskripsi", name: "description" },
                        { label: "Kategori", name: "categoryId" },
                        { label: "User ID", name: "userId" },
                        { label: "Gambar", name: "image" },
                        { label: "Kapasitas", name: "capacity", type: "number" },
                        { label: "Harga", name: "price", type: "number" },
                        { label: "Status", name: "status" }
                    ].map(({ label, name, type = "text" }) => (
                        <div key={name} className="flex flex-col">
                            <label className="text-sm font-semibold mb-1">{label}</label>
                            <input
                                type={type}
                                name={name}
                                value={updatedRoom[name as keyof Room]}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded-lg w-full"
                            />
                        </div>
                    ))}
                </div>

                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded-lg mr-2">Batal</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Simpan</button>
                </div>
            </div>
        </div>
    );
}
