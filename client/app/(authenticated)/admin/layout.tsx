import AdminProtected from "@/hooks/useAdminProtected"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AdminProtected>
            <main className="w-full h-full">
                {children}
            </main>
        </AdminProtected>
    )
};
