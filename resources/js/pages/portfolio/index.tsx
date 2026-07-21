import { Head, Link } from '@inertiajs/react';
import {
    ArrowDown,
    ArrowRight,
    ArrowUpRight,
    Download,
    Github,
    Linkedin,
    Mail,
    MapPin,
    Phone,
} from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import { ContactForm } from '@/components/public/contact-form';
import { PortfolioNavigation } from '@/components/public/portfolio-navigation';
import { show as showProject } from '@/routes/projects';
import type {
    Achievement,
    Certification,
    Education,
    Experience,
    PortfolioSection,
    Project,
    SiteProfile,
    SiteSettings,
    SkillCategory,
    SocialLink,
} from '@/types';

type Props = {
    profile: SiteProfile | null;
    settings: SiteSettings | null;
    sections: PortfolioSection[];
    projects: Project[];
    experiences: Experience[];
    educations: Education[];
    skillCategories: SkillCategory[];
    achievements: Achievement[];
    certifications: Certification[];
    socialLinks: SocialLink[];
};

const defaultProfile: SiteProfile = {
    id: 0,
    full_name: 'Rumel B. Eumague Jr.',
    headline: 'Frontend-Focused Full-Stack Developer',
    introduction:
        'I design and build responsive, secure, and user-friendly digital products using Laravel, React, JavaScript, MySQL, Firebase, and modern UI/UX practices.',
    about: 'I build practical digital systems with a focus on responsive interfaces, clear user experiences, dependable implementation, and continuous learning.',
    location: 'Davao City, Philippines',
    email: 'eumaguerumel4@gmail.com',
    phone: '09815864687',
    availability_status: 'Available for selected opportunities',
    hero_image_path: '/images/rumel-barong.jpg',
    profile_image_path: null,
    resume_path: null,
};

const defaultSettings: SiteSettings = {
    id: 0,
    site_title: 'Rumel Eumague - Developer Portfolio',
    logo_text: 'RE',
    accent_color: '#B45309',
    default_theme: 'system',
    footer_text: 'Designed and built by Rumel B. Eumague Jr.',
    seo_description:
        'Portfolio of Rumel B. Eumague Jr., frontend-focused full-stack developer in Davao City.',
    social_image_path: null,
    search_indexing: true,
};

const fallbackSections = [
    'work',
    'experience',
    'about',
    'skills',
    'education',
    'achievements',
    'contact',
].map((key, index) => ({
    id: index,
    key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    is_visible: true,
    sort_order: index,
}));

function SectionHeading({
    number,
    eyebrow,
    title,
    children,
}: {
    number: string;
    eyebrow: string;
    title: string;
    children?: ReactNode;
}) {
    return (
        <div className="grid gap-5 border-t border-current/20 pt-5 md:grid-cols-[11rem_1fr]">
            <p className="text-xs font-semibold text-current/55 uppercase">
                {number} / {eyebrow}
            </p>
            <div className="grid gap-4">
                <h2 className="max-w-3xl text-4xl leading-tight font-semibold sm:text-5xl lg:text-6xl">
                    {title}
                </h2>
                {children}
            </div>
        </div>
    );
}

export default function PortfolioIndex({
    profile: profileProp,
    settings: settingsProp,
    sections: sectionProp,
    projects,
    experiences,
    educations,
    skillCategories,
    achievements,
    certifications,
    socialLinks,
}: Props) {
    const profile = profileProp ?? defaultProfile;
    const settings = settingsProp ?? defaultSettings;
    const sections = sectionProp.length > 0 ? sectionProp : fallbackSections;
    const visible = (key: string) =>
        sections.some((section) => section.key === key && section.is_visible);
    const linkedIn =
        socialLinks.find((link) => link.platform === 'LinkedIn')?.url ??
        'https://www.linkedin.com/in/rumel-eumague-778580310/';
    const github =
        socialLinks.find((link) => link.platform === 'GitHub')?.url ??
        'https://github.com/AlphaMel-2004';
    const pageStyle = {
        '--portfolio-accent': settings.accent_color,
    } as CSSProperties;

    return (
        <div
            style={pageStyle}
            className="portfolio-page bg-[#f5f2eb] text-[#181815] dark:bg-[#11110f] dark:text-[#f4f0e8]"
        >
            <Head title={settings.site_title}>
                <meta name="description" content={settings.seo_description} />
                <meta
                    name="robots"
                    content={
                        settings.search_indexing
                            ? 'index,follow'
                            : 'noindex,nofollow'
                    }
                />
                <meta property="og:title" content={settings.site_title} />
                <meta
                    property="og:description"
                    content={settings.seo_description}
                />
                <meta property="og:type" content="website" />
                {settings.social_image_path && (
                    <meta
                        property="og:image"
                        content={settings.social_image_path}
                    />
                )}
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Person',
                        name: profile.full_name,
                        jobTitle: profile.headline,
                        address: {
                            '@type': 'PostalAddress',
                            addressLocality: 'Davao City',
                            addressCountry: 'PH',
                        },
                        url: '/',
                        sameAs: [github, linkedIn],
                    })}
                </script>
            </Head>

            <PortfolioNavigation
                logoText={settings.logo_text}
                sections={sections}
                resumePath={profile.resume_path}
            />

            <main>
                <section
                    className="relative min-h-[92svh] w-full max-w-full overflow-hidden border-b border-black/15 pt-16 dark:border-white/15"
                    aria-labelledby="hero-title"
                >
                    <img
                        src={
                            profile.hero_image_path ??
                            '/images/rumel-barong.jpg'
                        }
                        alt={`Portrait of ${profile.full_name} wearing a Barong Tagalog`}
                        fetchPriority="high"
                        className="absolute inset-0 z-0 size-full object-cover object-[58%_22%] contrast-110 grayscale sm:object-[65%_24%] lg:object-[68%_35%]"
                    />
                    <div className="absolute inset-0 z-[1] bg-white/35 dark:bg-black/30" />
                    <div className="relative z-10 mx-auto flex min-h-[calc(92svh-4rem)] w-full max-w-7xl min-w-0 flex-col justify-between px-5 py-8 lg:px-8 lg:py-12">
                        <div className="flex flex-col items-start justify-between gap-3 text-xs font-semibold uppercase sm:flex-row sm:items-center">
                            <span className="inline-flex max-w-full items-center gap-2 bg-[#f5f2eb]/90 px-3 py-2 text-[#181815]">
                                <span className="size-2 shrink-0 bg-[var(--portfolio-accent)]" />
                                {profile.availability_status}
                            </span>
                            <span>{profile.location}</span>
                        </div>
                        <div className="w-full max-w-5xl min-w-0 py-8">
                            <p className="mb-5 w-full max-w-xl text-sm font-semibold break-words uppercase sm:text-lg">
                                Frontend development / Laravel / UI/UX / QA
                            </p>
                            <h1
                                id="hero-title"
                                className="max-w-full text-4xl leading-[0.94] font-semibold sm:text-7xl lg:text-8xl"
                            >
                                {profile.full_name}
                            </h1>
                            <p className="mt-6 w-full max-w-2xl text-base leading-relaxed break-words sm:text-xl">
                                {profile.introduction}
                            </p>
                            <div className="mt-8 grid w-full gap-3 sm:flex sm:flex-wrap">
                                <a
                                    href="#work"
                                    className="inline-flex min-h-11 w-full max-w-full items-center justify-between gap-2 bg-[#181815] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--portfolio-accent)] sm:w-auto dark:bg-white dark:text-black"
                                >
                                    View selected work{' '}
                                    <ArrowDown className="size-4" />
                                </a>
                                <a
                                    href="#contact"
                                    className="inline-flex min-h-11 w-full max-w-full items-center justify-between gap-2 border border-current bg-[#f5f2eb]/75 px-5 py-3 text-sm font-semibold sm:w-auto"
                                >
                                    Start a conversation{' '}
                                    <ArrowUpRight className="size-4" />
                                </a>
                                {profile.resume_path && (
                                    <a
                                        href={profile.resume_path}
                                        download
                                        className="inline-flex min-h-11 w-full items-center justify-between gap-2 border border-current bg-[#f5f2eb]/75 px-5 py-3 text-sm font-semibold sm:w-auto"
                                    >
                                        <Download className="size-4" /> Resume
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className="grid gap-5 border-t border-black/25 pt-5 sm:flex sm:items-end sm:justify-between dark:border-white/25">
                            <p className="max-w-lg text-sm">
                                {profile.headline}
                                <br />
                                UI/UX Designer / QA and Technical Support
                                Practitioner
                            </p>
                            <div className="flex gap-2">
                                <a
                                    href={github}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="GitHub profile"
                                    className="flex size-10 items-center justify-center border border-current"
                                >
                                    <Github className="size-4" />
                                </a>
                                <a
                                    href={linkedIn}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="LinkedIn profile"
                                    className="flex size-10 items-center justify-center border border-current"
                                >
                                    <Linkedin className="size-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {visible('work') && (
                    <section
                        id="work"
                        className="scroll-mt-24 px-5 py-24 lg:px-8 lg:py-32"
                    >
                        <div className="mx-auto max-w-7xl">
                            <SectionHeading
                                number="01"
                                eyebrow="Selected work"
                                title="Systems designed around real people and real workflows."
                            >
                                <p className="max-w-2xl text-base leading-relaxed text-current/65">
                                    A focused selection across education,
                                    operations, attendance, mapping, and
                                    client-service platforms.
                                </p>
                            </SectionHeading>
                            <div className="mt-14 grid gap-px bg-current/20 md:grid-cols-2">
                                {projects.map((project, index) => (
                                    <Link
                                        key={project.id}
                                        href={showProject(project.slug)}
                                        prefetch
                                        className={`group grid min-h-80 content-between bg-[#f5f2eb] p-6 transition-colors hover:bg-[#ebe6db] dark:bg-[#11110f] dark:hover:bg-[#1b1b18] ${index === 0 ? 'md:col-span-2 md:min-h-96' : ''}`}
                                    >
                                        <div className="flex justify-between gap-4">
                                            <span className="text-xs font-semibold uppercase">
                                                0{index + 1} / {project.status}
                                            </span>
                                            <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </div>
                                        <div>
                                            <p className="mb-4 text-sm text-[var(--portfolio-accent)]">
                                                {project.role}
                                            </p>
                                            <h3 className="text-3xl font-semibold sm:text-4xl">
                                                {project.title}
                                            </h3>
                                            <p className="mt-4 max-w-2xl leading-relaxed text-current/65">
                                                {project.summary}
                                            </p>
                                            <div className="mt-6 flex flex-wrap gap-2">
                                                {project.technologies
                                                    ?.slice(0, 5)
                                                    .map((technology) => (
                                                        <span
                                                            key={technology}
                                                            className="border border-current/20 px-2 py-1 text-xs"
                                                        >
                                                            {technology}
                                                        </span>
                                                    ))}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {visible('experience') && (
                    <section
                        id="experience"
                        className="scroll-mt-24 bg-[#202723] px-5 py-24 text-[#f4f0e8] lg:px-8 lg:py-32"
                    >
                        <div className="mx-auto max-w-7xl">
                            <SectionHeading
                                number="02"
                                eyebrow="Experience"
                                title="Working across interface design, software delivery, and technical operations."
                            />
                            <div className="mt-14 md:ml-44">
                                {experiences.map((experience) => (
                                    <article
                                        key={experience.id}
                                        className="grid gap-5 border-t border-white/20 py-8 md:grid-cols-[10rem_1fr]"
                                    >
                                        <p className="text-sm text-white/55">
                                            {experience.period}
                                        </p>
                                        <div>
                                            <h3 className="text-2xl font-semibold">
                                                {experience.position}
                                            </h3>
                                            <p className="mt-1 text-[var(--portfolio-accent)]">
                                                {experience.organization}
                                            </p>
                                            {experience.employment_details && (
                                                <p className="mt-3 text-sm text-white/55">
                                                    {
                                                        experience.employment_details
                                                    }
                                                </p>
                                            )}
                                            <ul className="mt-5 grid gap-2 text-sm leading-relaxed text-white/70">
                                                {experience.responsibilities.map(
                                                    (item) => (
                                                        <li
                                                            key={item}
                                                            className="flex gap-3"
                                                        >
                                                            <span aria-hidden="true">
                                                                -
                                                            </span>
                                                            {item}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {visible('about') && (
                    <section
                        id="about"
                        className="scroll-mt-24 px-5 py-24 lg:px-8 lg:py-32"
                    >
                        <div className="mx-auto max-w-7xl">
                            <SectionHeading
                                number="03"
                                eyebrow="About"
                                title="A developer who cares about clarity at every layer."
                            />
                            <div className="mt-14 grid gap-10 md:grid-cols-[1fr_2fr]">
                                <p className="text-sm font-semibold text-[var(--portfolio-accent)] uppercase">
                                    Designing with empathy.
                                    <br />
                                    Engineering with discipline.
                                </p>
                                <div>
                                    <p className="max-w-3xl text-2xl leading-relaxed sm:text-3xl">
                                        {profile.about}
                                    </p>
                                    <div className="mt-10 grid gap-px bg-current/20 sm:grid-cols-3">
                                        {[
                                            'Responsive interfaces',
                                            'Secure application delivery',
                                            'Quality and troubleshooting',
                                        ].map((item, index) => (
                                            <div
                                                key={item}
                                                className="bg-[#f5f2eb] p-5 dark:bg-[#11110f]"
                                            >
                                                <span className="text-xs text-current/45">
                                                    0{index + 1}
                                                </span>
                                                <p className="mt-8 font-semibold">
                                                    {item}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {visible('skills') && (
                    <section
                        id="skills"
                        className="scroll-mt-24 border-y border-current/15 px-5 py-24 lg:px-8 lg:py-32"
                    >
                        <div className="mx-auto max-w-7xl">
                            <SectionHeading
                                number="04"
                                eyebrow="Toolkit"
                                title="Technology chosen to fit the problem."
                            />
                            <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                                {skillCategories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="border-t border-current/25 pt-4"
                                    >
                                        <h3 className="text-sm font-semibold text-[var(--portfolio-accent)] uppercase">
                                            {category.name}
                                        </h3>
                                        <ul className="mt-5 grid gap-2">
                                            {category.skills.map((skill) => (
                                                <li
                                                    key={skill.id}
                                                    className="text-lg"
                                                >
                                                    {skill.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {visible('education') && (
                    <section
                        id="education"
                        className="scroll-mt-24 px-5 py-24 lg:px-8"
                    >
                        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
                            <div>
                                <p className="text-xs font-semibold text-current/55 uppercase">
                                    05 / Education
                                </p>
                                {educations.map((education) => (
                                    <article
                                        key={education.id}
                                        className="mt-6 border-t border-current/20 pt-5"
                                    >
                                        <p className="text-sm text-[var(--portfolio-accent)]">
                                            {education.period}
                                        </p>
                                        <h3 className="mt-3 text-2xl font-semibold">
                                            {education.qualification}
                                        </h3>
                                        {education.specialization && (
                                            <p className="mt-2">
                                                Specialization:{' '}
                                                {education.specialization}
                                            </p>
                                        )}
                                        <p className="mt-2 text-current/60">
                                            {education.institution}
                                        </p>
                                    </article>
                                ))}
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-current/55 uppercase">
                                    Languages
                                </p>
                                <p className="mt-6 text-4xl leading-tight font-semibold">
                                    English
                                    <br />
                                    Filipino
                                    <br />
                                    Bisaya
                                </p>
                            </div>
                        </div>
                    </section>
                )}

                {visible('achievements') && (
                    <section
                        id="achievements"
                        className="scroll-mt-24 bg-[#dfe5e2] px-5 py-24 text-[#181815] lg:px-8 lg:py-32"
                    >
                        <div className="mx-auto max-w-7xl">
                            <SectionHeading
                                number="06"
                                eyebrow="Recognition"
                                title="Learning, craft, and ideas recognized along the way."
                            />
                            <div className="mt-14 grid gap-px bg-black/20 md:grid-cols-2">
                                {achievements.map((achievement, index) => (
                                    <div
                                        key={achievement.id}
                                        className="flex min-h-32 gap-5 bg-[#dfe5e2] p-5"
                                    >
                                        <span className="text-xs text-black/45">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <p className="text-lg font-semibold">
                                            {achievement.title}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            {certifications.length > 0 && (
                                <div className="mt-10 border-t border-black/20 pt-6">
                                    <p className="text-xs font-semibold text-black/55 uppercase">
                                        Certification
                                    </p>
                                    {certifications.map((certification) => (
                                        <p
                                            key={certification.id}
                                            className="mt-3 text-2xl font-semibold"
                                        >
                                            {certification.title}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {visible('contact') && (
                    <section
                        id="contact"
                        className="scroll-mt-24 px-5 py-24 lg:px-8 lg:py-32"
                    >
                        <div className="mx-auto max-w-7xl">
                            <SectionHeading
                                number="07"
                                eyebrow="Contact"
                                title="Have a useful problem to solve? Let's talk."
                            />
                            <div className="mt-14 grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
                                <div className="grid content-start gap-5 text-sm">
                                    <a
                                        href={`mailto:${profile.email}`}
                                        className="flex items-center gap-3 hover:text-[var(--portfolio-accent)]"
                                    >
                                        <Mail className="size-4" />
                                        {profile.email}
                                    </a>
                                    <a
                                        href={`tel:${profile.phone}`}
                                        className="flex items-center gap-3 hover:text-[var(--portfolio-accent)]"
                                    >
                                        <Phone className="size-4" />
                                        {profile.phone}
                                    </a>
                                    <p className="flex items-center gap-3">
                                        <MapPin className="size-4" />
                                        {profile.location}
                                    </p>
                                    <a
                                        href={github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-5 inline-flex items-center gap-2 font-semibold"
                                    >
                                        Explore GitHub{' '}
                                        <ArrowRight className="size-4" />
                                    </a>
                                </div>
                                <ContactForm />
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <footer className="border-t border-current/15 px-5 py-8 lg:px-8">
                <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm sm:flex-row">
                    <p>{settings.footer_text}</p>
                    <p className="text-current/50">
                        Davao City, Philippines / {new Date().getFullYear()}
                    </p>
                </div>
            </footer>
        </div>
    );
}
