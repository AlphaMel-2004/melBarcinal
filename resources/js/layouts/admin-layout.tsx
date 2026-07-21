import { Link, usePage } from '@inertiajs/react';
import {
    FolderKanban,
    Home,
    Inbox,
    LayoutDashboard,
    LogOut,
    Settings,
} from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { home, logout } from '@/routes';
import { dashboard } from '@/routes/admin';
import { index as messagesIndex } from '@/routes/admin/messages';
import { index as projectsIndex } from '@/routes/admin/projects';
import { edit as settingsEdit } from '@/routes/admin/settings';

export default function AdminLayout({ children }: PropsWithChildren) {
    const { url, props } = usePage();
    const flash = props.flash as { success?: string } | undefined;
    const nav = [
        { label: 'Dashboard', href: dashboard(), icon: LayoutDashboard },
        { label: 'Projects', href: projectsIndex(), icon: FolderKanban },
        { label: 'Messages', href: messagesIndex(), icon: Inbox },
        { label: 'Site settings', href: settingsEdit(), icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-[#f4f4f1] text-[#1d1d1a] dark:bg-[#121311] dark:text-[#f3f3ef]">
            <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-current/10 bg-white px-5 py-6 lg:flex lg:flex-col dark:bg-[#171815]">
                <Link
                    href={dashboard()}
                    className="flex items-center gap-3 font-semibold"
                >
                    <span className="flex size-9 items-center justify-center bg-[#1d1d1a] text-sm text-white dark:bg-white dark:text-black">
                        RE
                    </span>
                    Portfolio owner
                </Link>
                <nav className="mt-10 grid gap-1">
                    {nav.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 text-sm ${url.startsWith(item.href.url) ? 'bg-[#e8e8e2] font-semibold dark:bg-[#272823]' : 'text-current/65 hover:text-current'}`}
                        >
                            <item.icon className="size-4" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="mt-auto grid gap-1">
                    <Link
                        href={home()}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-current/65"
                    >
                        <Home className="size-4" />
                        View portfolio
                    </Link>
                    <Link
                        href={logout()}
                        method="post"
                        as="button"
                        className="flex items-center gap-3 px-3 py-2.5 text-left text-sm text-current/65"
                    >
                        <LogOut className="size-4" />
                        Log out
                    </Link>
                </div>
            </aside>
            <div className="lg:pl-64">
                <header className="sticky top-0 z-30 border-b border-current/10 bg-[#f4f4f1]/95 px-4 py-3 backdrop-blur lg:hidden dark:bg-[#121311]/95">
                    <nav className="flex gap-2 overflow-x-auto">
                        {nav.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="shrink-0 border border-current/15 px-3 py-2 text-xs font-semibold"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </header>
                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
                    {flash?.success && (
                        <div
                            role="status"
                            className="mb-6 border border-green-700/25 bg-green-100 px-4 py-3 text-sm text-green-900 dark:bg-green-950 dark:text-green-100"
                        >
                            {flash.success}
                        </div>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}
