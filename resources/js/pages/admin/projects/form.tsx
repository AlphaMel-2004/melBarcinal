import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft, LoaderCircle, Save } from 'lucide-react';
import { index, store, update } from '@/routes/admin/projects';
import type { Project } from '@/types';

const inputClass =
    'mt-1 w-full border border-current/20 bg-white px-3 py-2.5 text-sm outline-none focus:border-current dark:bg-[#171815]';

function ErrorText({ message }: { message?: string }) {
    return message ? (
        <p className="mt-1 text-xs text-red-700 dark:text-red-300">{message}</p>
    ) : null;
}

export default function ProjectForm({ project }: { project: Project | null }) {
    const route = project ? update.form(project.slug) : store.form();

    return (
        <>
            <Head title={project ? `Edit ${project.title}` : 'New project'} />
            <Link
                href={index()}
                className="inline-flex items-center gap-2 text-sm text-current/60"
            >
                <ArrowLeft className="size-4" />
                Projects
            </Link>
            <div className="mt-5">
                <p className="text-xs font-semibold text-current/50 uppercase">
                    {project ? 'Edit project' : 'Create project'}
                </p>
                <h1 className="mt-2 text-3xl font-semibold">
                    {project?.title ?? 'New project'}
                </h1>
            </div>
            <Form
                {...route}
                className="mt-8 grid gap-10"
                resetOnSuccess={!project}
            >
                {({ errors, processing }) => (
                    <>
                        <section className="grid gap-5 border-t border-current/15 pt-6 md:grid-cols-2">
                            <label className="text-sm">
                                Title
                                <input
                                    name="title"
                                    defaultValue={project?.title}
                                    className={inputClass}
                                />
                                <ErrorText message={errors.title} />
                            </label>
                            <label className="text-sm">
                                Slug
                                <input
                                    name="slug"
                                    defaultValue={project?.slug}
                                    className={inputClass}
                                    placeholder="Generated from title"
                                />
                                <ErrorText message={errors.slug} />
                            </label>
                            <label className="text-sm md:col-span-2">
                                Summary
                                <textarea
                                    name="summary"
                                    rows={3}
                                    defaultValue={project?.summary}
                                    className={inputClass}
                                />
                                <ErrorText message={errors.summary} />
                            </label>
                            <label className="text-sm md:col-span-2">
                                Full case study
                                <textarea
                                    name="description"
                                    rows={8}
                                    defaultValue={project?.description}
                                    className={inputClass}
                                />
                                <ErrorText message={errors.description} />
                            </label>
                        </section>
                        <section className="grid gap-5 border-t border-current/15 pt-6 md:grid-cols-2">
                            <label className="text-sm">
                                Role
                                <input
                                    name="role"
                                    defaultValue={project?.role}
                                    className={inputClass}
                                />
                                <ErrorText message={errors.role} />
                            </label>
                            <label className="text-sm">
                                Project type
                                <input
                                    name="project_type"
                                    defaultValue={project?.project_type ?? ''}
                                    className={inputClass}
                                />
                            </label>
                            <label className="text-sm">
                                Year
                                <input
                                    name="year"
                                    defaultValue={project?.year ?? ''}
                                    className={inputClass}
                                />
                            </label>
                            <label className="text-sm">
                                Status
                                <select
                                    name="status"
                                    defaultValue={
                                        project?.status ?? 'completed'
                                    }
                                    className={inputClass}
                                >
                                    <option value="planned">Planned</option>
                                    <option value="active">Active</option>
                                    <option value="completed">Completed</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </label>
                            <label className="text-sm md:col-span-2">
                                Responsibilities, one per line
                                <textarea
                                    name="responsibilities_text"
                                    rows={5}
                                    defaultValue={project?.responsibilities?.join(
                                        '\n',
                                    )}
                                    className={inputClass}
                                />
                            </label>
                            <label className="text-sm md:col-span-2">
                                Technologies, comma separated
                                <input
                                    name="technologies_text"
                                    defaultValue={project?.technologies?.join(
                                        ', ',
                                    )}
                                    className={inputClass}
                                />
                            </label>
                        </section>
                        <section className="grid gap-5 border-t border-current/15 pt-6 md:grid-cols-2">
                            <label className="text-sm">
                                Demo URL
                                <input
                                    name="demo_url"
                                    type="url"
                                    defaultValue={project?.demo_url ?? ''}
                                    className={inputClass}
                                />
                                <ErrorText message={errors.demo_url} />
                            </label>
                            <label className="text-sm">
                                Repository URL
                                <input
                                    name="repository_url"
                                    type="url"
                                    defaultValue={project?.repository_url ?? ''}
                                    className={inputClass}
                                />
                                <ErrorText message={errors.repository_url} />
                            </label>
                            <label className="text-sm">
                                Thumbnail path
                                <input
                                    name="thumbnail_path"
                                    defaultValue={project?.thumbnail_path ?? ''}
                                    className={inputClass}
                                />
                            </label>
                            <label className="text-sm">
                                Display order
                                <input
                                    name="sort_order"
                                    type="number"
                                    min="0"
                                    defaultValue={project?.sort_order ?? 0}
                                    className={inputClass}
                                />
                            </label>
                            <label className="flex items-center gap-3 text-sm">
                                <input
                                    type="hidden"
                                    name="is_featured"
                                    value="0"
                                />
                                <input
                                    type="checkbox"
                                    name="is_featured"
                                    value="1"
                                    defaultChecked={
                                        project?.is_featured ?? false
                                    }
                                    className="size-4"
                                />
                                Featured project
                            </label>
                            <label className="flex items-center gap-3 text-sm">
                                <input
                                    type="hidden"
                                    name="is_published"
                                    value="0"
                                />
                                <input
                                    type="checkbox"
                                    name="is_published"
                                    value="1"
                                    defaultChecked={
                                        project?.is_published ?? false
                                    }
                                    className="size-4"
                                />
                                Published
                            </label>
                        </section>
                        <div className="sticky bottom-4 flex justify-end border border-current/15 bg-white/95 p-3 backdrop-blur dark:bg-[#171815]/95">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex min-h-11 items-center gap-2 bg-[#1d1d1a] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-black"
                            >
                                {processing ? (
                                    <LoaderCircle className="size-4 animate-spin" />
                                ) : (
                                    <Save className="size-4" />
                                )}
                                {project ? 'Save changes' : 'Create project'}
                            </button>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}
