"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

const LoginPage: React.FC = () => {
    const router = useRouter();
    const { login } = useAuth(); // dari Context kamu
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("https://simaru.amisbudi.cloud/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Login gagal");
            }

            // Simpan token jika perlu
            localStorage.setItem("token", data.access_token);


            // Panggil context login
            login(data); // simpan user/token ke context

            // Redirect ke halaman utama/dashboard
            router.push("/");
        } catch (err: any) {
            setError(err.message || "Terjadi kesalahan");
        }
    };

    return (
        <div className="font-sans h-screen overflow-y-auto bg-gray-100 pt-20">
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100">
                <div className="relative sm:max-w-sm w-full">
                    {/* Card layer */}
                    <div className="card bg-blue-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6" />
                    <div className="card bg-red-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6" />
                    <div className="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
                        <label className="block mt-3 text-sm text-gray-700 text-center font-semibold">
                            Login
                        </label>

                        <form className="mt-10" onSubmit={handleLogin}>
                            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                            <input
                                type="email"
                                placeholder="Masukan Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                                required
                            />

                            <input
                                type="password"
                                placeholder="Masukan Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-7 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                                required
                            />

                            {/* ... form lainnya tetap sama ... */}

                            <button
                                type="submit"
                                className="bg-blue-500 w-full py-3 mt-7 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                            >
                                Login
                            </button>

                            <div className="mt-7 flex justify-center items-center">
                                <span className="text-sm">Belum punya akun?</span>
                                <Link href="/register" className="text-blue-500 ml-2">
                                    Daftar disini
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
