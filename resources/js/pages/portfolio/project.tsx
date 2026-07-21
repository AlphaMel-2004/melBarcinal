import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import { home } from '@/routes';
import type { Project, SiteSettings } from '@/types';

type Props = { project: Project; settings: SiteSettings | null };

export default function ProjectDetail({ project, settings }: Props) {
    return (
        <div className="min-h-screen bg-[#f5f2eb] text-[#181815] dark:bg-[#11110f] dark:text-[#f4f0e8]">
            <Head
                title={`${project.title} - ${settings?.site_title ?? 'Rumel Eumague'}`}
            >
                <meta name="description" content={project.summary} />
                <meta property="og:title" content={project.title} />
                <meta property="og:description" content={project.summary} />
            </Head>
            <header className="border-b border-current/15">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
                    <Link
                        href={home()}
                        className="inline-flex items-center gap-2 text-sm font-semibold"
                    >
                        <ArrowLeft className="size-4" /> Portfolio
                    </Link>
                    <span className="text-xs font-semibold uppercase">
                        Case study
                    </span>
                </div>
            </header>
            <main>
                <section className="px-5 py-20 lg:px-8 lg:py-28">
                    <div className="mx-auto max-w-7xl">
                        <p className="text-sm font-semibold text-[#a04622] uppercase">
                            {project.role}
                        </p>
                        <h1 className="mt-5 max-w-5xl text-5xl leading-none font-semibold sm:text-7xl lg:text-8xl">
                            {project.title}
                        </h1>
                        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-current/65">
                            {project.summary}
                        </p>
                        <div className="mt-10 flex flex-wrap gap-3">
                            {project.demo_url && (
                                <a
                                    href={project.demo_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 bg-[#181815] px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-black"
                                >
                                    Live project{' '}
                                    <ArrowUpRight className="size-4" />
                                </a>
                            )}
                            {project.repository_url && (
                                <a
                                    href={project.repository_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 border border-current px-5 py-3 text-sm font-semibold"
                                >
                                    <Github className="size-4" /> Repository
                                </a>
                            )}
                        </div>
                    </div>
                </section>
                <section className="border-y border-current/15 px-5 py-12 lg:px-8">
                    <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-3">
                        <div>
                            <p className="text-xs text-current/45 uppercase">
                                Role
                            </p>
                            <p className="mt-2 font-semibold">{project.role}</p>
                        </div>
                        <div>
                            <p className="text-xs text-current/45 uppercase">
                                Status
                            </p>
                            <p className="mt-2 font-semibold">
                                {project.status}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-current/45 uppercase">
                                Year
                            </p>
                            <p className="mt-2 font-semibold">
                                {project.year ?? 'Not specified'}
                            </p>
                        </div>
                    </div>
                </section>
                <section className="px-5 py-20 lg:px-8 lg:py-28">
                    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_2fr]">
                        <h2 className="text-sm font-semibold uppercase">
                            Project overview
                        </h2>
                        <div>
                            <p className="text-2xl leading-relaxed whitespace-pre-line">
                                {project.description}
                            </p>
                            {project.responsibilities &&
                                project.responsibilities.length > 0 && (
                                    <div className="mt-12 border-t border-current/20 pt-6">
                                        <h3 className="text-sm font-semibold uppercase">
                                            Responsibilities
                                        </h3>
                                        <ul className="mt-5 grid gap-3">
                                            {project.responsibilities.map(
                                                (responsibility) => (
                                                    <li
                                                        key={responsibility}
                                                        className="flex gap-3"
                                                    >
                                                        <span>-</span>
                                                        {responsibility}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                )}
                            <div className="mt-12 border-t border-current/20 pt-6">
                                <h3 className="text-sm font-semibold uppercase">
                                    Technology
                                </h3>
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {project.technologies?.map((technology) => (
                                        <span
                                            key={technology}
                                            className="border border-current/20 px-3 py-2 text-sm"
                                        >
                                            {technology}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {project.media && project.media.length > 0 && (
                    <section className="px-5 pb-20 lg:px-8 lg:pb-28">
                        <div className="mx-auto grid max-w-7xl gap-6">
                            {project.media.map((media) => (
                                <img
                                    key={media.id}
                                    src={media.path}
                                    alt={media.alt_text}
                                    loading="lazy"
                                    className="w-full border border-current/15 object-cover"
                                />
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
