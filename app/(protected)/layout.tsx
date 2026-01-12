import Sidebar from "@/components/dashboard/Sidebar"
import { BackButton } from "@/components/back-button"

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
            <Sidebar />
            <main className="flex-1 overflow-y-auto w-full pt-16 md:pt-0 relative">
                <div className="sticky top-0 z-30 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-2 flex items-center gap-4 h-14">
                    <BackButton />
                    {/* Future: Add Breadcrumbs here */}
                </div>
                <div className="p-0">
                    {children}
                </div>
            </main>
        </div>
    )
}
