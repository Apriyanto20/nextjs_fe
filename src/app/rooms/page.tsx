"use client";

import { useEffect, useState } from "react";

type Room = {
    id: number;
    name: string;
    categoryId: number;
    price: number;
    capacity: number;
    description: string;
};

export default function RoomsTable() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [newRoom, setNewRoom] = useState({
        name: "",
        categoryId: 2, // Default value sesuai contoh API
        price: 0,
        capacity: 0,
        description: "",
    });

    useEffect(() => {
        fetchRooms();
    }, []);

    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return '';
    };

    const fetchRooms = async () => {
        // 1. Ambil token dan cookie
        const token = localStorage.getItem("token");
        const cookie = getCookie('sessionId'); // Ganti dengan nama cookie sebenarnya
        
        
        // 2. Validasi token
        if (!token) {
            setError("Token tidak ditemukan. Silakan login ulang.");
            return;
        }

        try {
            // 3. Tambahkan timeout untuk fetch
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // Timeout 10 detik

            // 4. Lakukan request
            const res = await fetch("https://simaru.amisbudi.cloud/api/rooms?status=approved", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Cookie': `sessionId=${getCookie('sessionId')}`, // Format cookie yang benar
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Origin": "http://localhost:3000"
                },
                credentials: "include",
            });

            clearTimeout(timeoutId); // Clear timeout jika request berhasil

            // 5. Handle response
            if (!res.ok) {
                // Coba parse error message dari response
                const errorData = await res.json().catch(() => ({
                    message: `HTTP error! Status: ${res.status}`
                }));

                // Handle khusus untuk status 401 (Unauthorized)
                if (res.status === 401) {
                    localStorage.removeItem("token");
                    throw new Error("Sesi telah berakhir. Silakan login kembali");
                }

                throw new Error(errorData.message || `Gagal mengambil data. Status: ${res.status}`);
            }

            // 6. Parse data
            const data = await res.json();

            // 7. Validasi struktur data
            if (!Array.isArray(data?.data)) {
                throw new Error("Format data tidak valid dari server");
            }

            // 8. Update state
            setRooms(data.data);
            setError(""); // Clear error jika sebelumnya ada

        } catch (err: any) {
            // 9. Error handling spesifik
            if (err.name === 'AbortError') {
                setError("Request timeout. Coba lagi atau periksa koneksi internet Anda");
            } else if (err.message.includes("Failed to fetch")) {
                setError("Tidak dapat terhubung ke server. Periksa koneksi internet Anda");
            } else {
                setError(err.message || "Terjadi kesalahan saat mengambil data ruangan");
            }

            console.error("Detail error:", {
                error: err,
                time: new Date().toISOString(),
                endpoint: "rooms?status=approved"
            });

            // 10. Reset data jika error
            setRooms([]);
        }
    };

    const handleAddRoom = async () => {
        const token = localStorage.getItem("token");
        const cookie = getCookie('your_cookie_name'); // Ganti dengan nama cookie sebenarnya

        if (!token) {
            setError("Token tidak ditemukan. Silakan login ulang.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            // Validasi lebih ketat
            if (!newRoom.name.trim()) {
                throw new Error("Nama ruangan harus diisi");
            }
            if (newRoom.capacity <= 0) {
                throw new Error("Kapasitas harus lebih dari 0");
            }

            const response = await fetch("https://simaru.amisbudi.cloud/api/rooms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Cookie": `your_cookie_name=${cookie}`, // Sesuaikan format
                    "Accept": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    name: newRoom.name,
                    categoryId: newRoom.categoryId,
                    price: newRoom.price,
                    capacity: newRoom.capacity,
                    description: newRoom.description
                })
            });

            // Debugging response
            console.log("Response status:", response.status);
            const responseData = await response.json();
            console.log("Response data:", responseData);

            if (!response.ok) {
                throw new Error(responseData.message || `Error ${response.status}: Gagal menambahkan ruangan`);
            }

            await fetchRooms();
            setIsModalOpen(false);
            setNewRoom({
                name: "",
                categoryId: 2,
                price: 0,
                capacity: 0,
                description: "",
            });

        } catch (err: any) {
            console.error("Full error:", err);
            setError(err.message || "Terjadi kesalahan tidak terduga");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Daftar Ruangan Disetujui</h2>
            {error && <p className="text-red-500">{error}</p>}

            <button
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => setIsModalOpen(true)}
            >
                Tambah Data
            </button>

            <table className="min-w-full bg-white border">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Category</th>
                        <th className="py-2 px-4 border">Price</th>
                        <th className="py-2 px-4 border">Capacity</th>
                        <th className="py-2 px-4 border">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => (
                        <tr key={room.id}>
                            <td className="py-2 px-4 border">{room.name}</td>
                            <td className="py-2 px-4 border">{room.categoryId}</td>
                            <td className="py-2 px-4 border">Rp {room.price.toLocaleString()}</td>
                            <td className="py-2 px-4 border">{room.capacity}</td>
                            <td className="py-2 px-4 border">{room.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Tambah Data Room</h3>

                        <input
                            className="border p-2 w-full mb-2"
                            placeholder="Name"
                            value={newRoom.name}
                            onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                        />
                        <input
                            className="border p-2 w-full mb-2"
                            placeholder="Category ID"
                            type="number"
                            value={newRoom.categoryId}
                            onChange={(e) => setNewRoom({ ...newRoom, categoryId: Number(e.target.value) })}
                        />
                        <input
                            className="border p-2 w-full mb-2"
                            placeholder="Price"
                            type="number"
                            value={newRoom.price}
                            onChange={(e) => setNewRoom({ ...newRoom, price: Number(e.target.value) })}
                        />
                        <input
                            className="border p-2 w-full mb-2"
                            placeholder="Capacity"
                            type="number"
                            value={newRoom.capacity}
                            onChange={(e) => setNewRoom({ ...newRoom, capacity: Number(e.target.value) })}
                        />
                        <textarea
                            className="border p-2 w-full mb-4"
                            placeholder="Description"
                            value={newRoom.description}
                            onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Batal
                            </button>
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                                onClick={handleAddRoom}
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
