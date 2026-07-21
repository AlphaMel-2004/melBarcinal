import { Head, Link } from '@inertiajs/react';
import { ArrowRight, FolderPlus, Settings } from 'lucide-react';
import { create as createProject } from '@/routes/admin/projects';
import { edit as settingsEdit } from '@/routes/admin/settings';

type Props = {
    stats: Record<
        | 'publishedProjects'
        | 'draftProjects'
        | 'experiences'
        | 'skills'
        | 'achievements'
        | 'unreadMessages',
        number
    >;
    recentActivity: Array<{
        id: number;
        action: string;
        created_at: string;
        user: { name: string } | null;
    }>;
};

export default function AdminDashboard({ stats, recentActivity }: Props) {
    const metrics = [
        ['Published projects', stats.publishedProjects],
        ['Draft projects', stats.draftProjects],
        ['Experience entries', stats.experiences],
        ['Skills', stats.skills],
        ['Achievements', stats.achievements],
        ['Unread messages', stats.unreadMessages],
    ];

    return (
        <>
            <Head title="Owner dashboard" />
            <div className="flex flex-wrap items-end justify-between gap-5">
                <div>
                    <p className="text-xs font-semibold text-current/50 uppercase">
                        Owner portal
                    </p>
                    <h1 className="mt-2 text-3xl font-semibold">
                        Portfolio dashboard
                    </h1>
                </div>
                <div className="flex gap-2">
                    <Link
                        href={createProject()}
                        className="inline-flex items-center gap-2 bg-[#1d1d1a] px-4 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-black"
                    >
                        <FolderPlus className="size-4" />
                        New project
                    </Link>
                    <Link
                        href={settingsEdit()}
                        className="inline-flex size-10 items-center justify-center border border-current/20"
                        aria-label="Site settings"
                    >
                        <Settings className="size-4" />
                    </Link>
                </div>
            </div>
            <div className="mt-8 grid border-t border-l border-current/15 sm:grid-cols-2 xl:grid-cols-3">
                {metrics.map(([label, value]) => (
                    <div
                        key={label}
                        className="min-h-36 border-r border-b border-current/15 bg-white p-5 dark:bg-[#171815]"
                    >
                        <p className="text-sm text-current/55">{label}</p>
                        <p className="mt-8 text-4xl font-semibold">{value}</p>
                    </div>
                ))}
            </div>
            <section className="mt-10">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Recent activity</h2>
                    <Link
                        href={settingsEdit()}
                        className="inline-flex items-center gap-2 text-sm"
                    >
                        Manage content <ArrowRight className="size-4" />
                    </Link>
                </div>
                <div className="mt-4 border-t border-current/15">
                    {recentActivity.length === 0 ? (
                        <p className="py-10 text-sm text-current/50">
                            Owner actions will appear here.
                        </p>
                    ) : (
                        recentActivity.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex justify-between gap-5 border-b border-current/15 py-4 text-sm"
                            >
                                <span>
                                    {activity.action.replaceAll('.', ' ')}
                                </span>
                                <span className="text-current/50">
                                    {new Date(
                                        activity.created_at,
                                    ).toLocaleString()}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </>
    );
}
