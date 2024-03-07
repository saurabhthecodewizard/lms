import Protected from "@/hooks/useProtected"


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Protected>
            <div>{children}</div>
        </Protected>
    )
}
