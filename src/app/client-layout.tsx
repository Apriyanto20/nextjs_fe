// app/client-layout.tsx
"use client";

import { useAuth } from "@app/context/AuthContext";
import Navbar from "@/components/navbar";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isLoggedIn } = useAuth();

    return (
        <>
            {isLoggedIn && <Navbar />}
            <main>{children}</main>
        </>
    );
}
