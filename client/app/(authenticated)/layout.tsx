import AcadiaAppBar from "@/components/layout/AcadiaAppBar"
import AcadiaDrawer from "@/components/layout/AcadiaDrawer"
import Protected from "@/hooks/useProtected"


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Protected>
            <div className="flex flex-col justify-start h-screen">
                <AcadiaAppBar />
                <div className="mt-16 mb-8 flex flex-grow overflow-auto">
                    <div className='fixed h-full'>
                        <AcadiaDrawer />
                    </div>
                    <main className="mt-8 px-6 md:px-20 lg:ml-80 xl:ml-72 2xl:ml-80 w-full">
                        {children}
                    </main>
                </div>
            </div>
        </Protected>
    )
}
