import { Form, Head, Link } from '@inertiajs/react';
import { Edit3, Plus, Trash2 } from 'lucide-react';
import { create, destroy, edit } from '@/routes/admin/projects';
import type { Paginated, Project } from '@/types';

export default function ProjectsIndex({
    projects,
}: {
    projects: Paginated<Project>;
}) {
    return (
        <>
            <Head title="Manage projects" />
            <div className="flex items-end justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold text-current/50 uppercase">
                        Content
                    </p>
                    <h1 className="mt-2 text-3xl font-semibold">Projects</h1>
                </div>
                <Link
                    href={create()}
                    className="inline-flex items-center gap-2 bg-[#1d1d1a] px-4 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-black"
                >
                    <Plus className="size-4" />
                    Add project
                </Link>
            </div>
            <div className="mt-8 overflow-x-auto border border-current/15 bg-white dark:bg-[#171815]">
                <table className="w-full min-w-[760px] text-left text-sm">
                    <thead className="border-b border-current/15 text-xs text-current/50 uppercase">
                        <tr>
                            <th className="p-4">Project</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Order</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.data.map((project) => (
                            <tr
                                key={project.id}
                                className="border-b border-current/10 last:border-0"
                            >
                                <td className="p-4">
                                    <p className="font-semibold">
                                        {project.title}
                                    </p>
                                    <p className="mt-1 text-xs text-current/45">
                                        /{project.slug}
                                    </p>
                                </td>
                                <td className="p-4 text-current/65">
                                    {project.role}
                                </td>
                                <td className="p-4">
                                    <span
                                        className={`inline-flex px-2 py-1 text-xs font-semibold ${project.is_published ? 'bg-green-100 text-green-900' : 'bg-amber-100 text-amber-900'}`}
                                    >
                                        {project.is_published
                                            ? 'Published'
                                            : 'Draft'}
                                    </span>
                                </td>
                                <td className="p-4">{project.sort_order}</td>
                                <td className="p-4">
                                    <div className="flex justify-end gap-2">
                                        <Link
                                            href={edit(project.slug)}
                                            className="flex size-9 items-center justify-center border border-current/15"
                                            aria-label={`Edit ${project.title}`}
                                        >
                                            <Edit3 className="size-4" />
                                        </Link>
                                        <Form {...destroy.form(project.slug)}>
                                            <button
                                                type="submit"
                                                className="flex size-9 items-center justify-center border border-red-700/25 text-red-700"
                                                aria-label={`Delete ${project.title}`}
                                            >
                                                <Trash2 className="size-4" />
                                            </button>
                                        </Form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <nav className="mt-5 flex flex-wrap gap-2">
                {projects.links.map((link) =>
                    link.url ? (
                        <Link
                            key={link.label}
                            href={link.url}
                            className={`border px-3 py-2 text-xs ${link.active ? 'border-current bg-current text-white dark:text-black' : 'border-current/15'}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ) : (
                        <span
                            key={link.label}
                            className="border border-current/10 px-3 py-2 text-xs text-current/30"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ),
                )}
            </nav>
        </>
    );
}
