"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

const RegisterPage: React.FC = () => {
    const router = useRouter();
    const { login } = useAuth(); // login otomatis setelah register (opsional)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('https://simaru.amisbudi.cloud/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    password_confirmation: passwordConfirmation,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Gagal mendaftar');
            }

            localStorage.setItem('token', data.access_token);
            login(data); // atau langsung login jika konteks mendukung
            router.push('/');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="font-sans h-screen overflow-y-auto bg-gray-100 pt-20">
            <div className="relative min-h-full flex flex-col sm:justify-center items-center py-10 px-4">
                <div className="relative sm:max-w-sm w-full">
                    <div className="card bg-green-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6" />
                    <div className="card bg-yellow-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6" />
                    <div className="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
                        <label className="block mt-3 text-sm text-gray-700 text-center font-semibold">
                            Daftar Akun
                        </label>
                        {error && (
                            <div className="text-red-500 text-sm text-center mt-2">{error}</div>
                        )}
                        <form className="mt-10" onSubmit={handleRegister}>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Nama Lengkap"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-green-100 focus:bg-green-100 focus:ring-0"
                                />
                            </div>

                            <div className="mt-5">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-green-100 focus:bg-green-100 focus:ring-0"
                                />
                            </div>

                            <div className="mt-5">
                                <input
                                    type="password"
                                    placeholder="Kata Sandi"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-green-100 focus:bg-green-100 focus:ring-0"
                                />
                            </div>

                            <div className="mt-5">
                                <input
                                    type="password"
                                    placeholder="Ulangi Kata Sandi"
                                    value={passwordConfirmation}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    required
                                    className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-green-100 focus:bg-green-100 focus:ring-0"
                                />
                            </div>

                            <div className="mt-7">
                                <button
                                    type="submit"
                                    className="bg-green-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                                >
                                    Daftar
                                </button>
                            </div>

                            <div className="flex mt-7 items-center text-center">
                                <hr className="border-gray-300 border-1 w-full rounded-md" />
                                <label className="block font-medium text-sm text-gray-600 w-full">
                                    Daftar dengan
                                </label>
                                <hr className="border-gray-300 border-1 w-full rounded-md" />
                            </div>

                            <div className="flex mt-7 justify-center w-full">
                                <button
                                    type="button"
                                    className="mr-5 bg-blue-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                                >
                                    Facebook
                                </button>

                                <button
                                    type="button"
                                    className="bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                                >
                                    Google
                                </button>
                            </div>

                            <div className="mt-7">
                                <div className="flex justify-center items-center">
                                    <label className="mr-2">Sudah punya akun?</label>
                                    <a
                                        href="/login"
                                        className="text-blue-500 transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                                    >
                                        Masuk di sini
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
