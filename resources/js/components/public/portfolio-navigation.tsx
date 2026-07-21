import { Link } from '@inertiajs/react';
import { Download, Menu, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { useAppearance } from '@/hooks/use-appearance';
import { home } from '@/routes';
import type { PortfolioSection } from '@/types';

type Props = {
    logoText: string;
    sections: PortfolioSection[];
    resumePath: string | null;
};

export function PortfolioNavigation({ logoText, sections, resumePath }: Props) {
    const [activeSection, setActiveSection] = useState('work');
    const { resolvedAppearance, updateAppearance } = useAppearance();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) =>
                entries.forEach(
                    (entry) =>
                        entry.isIntersecting &&
                        setActiveSection(entry.target.id),
                ),
            { rootMargin: '-30% 0px -60% 0px' },
        );

        sections.forEach((section) => {
            const element = document.getElementById(section.key);

            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [sections]);

    const navItems = sections.filter((section) => section.key !== 'education');

    return (
        <header className="fixed inset-x-0 top-0 z-40 border-b border-black/10 bg-[#f5f2eb]/90 backdrop-blur-md dark:border-white/10 dark:bg-[#11110f]/90">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
                <Link
                    href={home()}
                    aria-label="Portfolio home"
                    className="flex size-9 items-center justify-center border border-current text-sm font-semibold"
                >
                    {logoText}
                </Link>

                <nav
                    aria-label="Primary navigation"
                    className="hidden items-center gap-6 lg:flex"
                >
                    {navItems.map((section) => (
                        <a
                            key={section.id}
                            href={`#${section.key}`}
                            className={`text-sm transition-colors hover:text-[#a04622] ${activeSection === section.key ? 'text-[#a04622]' : 'text-current/65'}`}
                        >
                            {section.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    {resumePath && (
                        <a
                            href={resumePath}
                            download
                            className="hidden items-center gap-2 border border-current px-3 py-2 text-xs font-semibold sm:inline-flex"
                        >
                            <Download className="size-4" /> Resume
                        </a>
                    )}
                    <button
                        type="button"
                        onClick={() =>
                            updateAppearance(
                                resolvedAppearance === 'dark'
                                    ? 'light'
                                    : 'dark',
                            )
                        }
                        className="flex size-9 items-center justify-center border border-current/20"
                        aria-label={`Use ${resolvedAppearance === 'dark' ? 'light' : 'dark'} theme`}
                    >
                        {resolvedAppearance === 'dark' ? (
                            <Sun className="size-4" />
                        ) : (
                            <Moon className="size-4" />
                        )}
                    </button>
                    <Sheet>
                        <SheetTrigger asChild>
                            <button
                                type="button"
                                className="flex size-9 items-center justify-center border border-current/20 lg:hidden"
                                aria-label="Open navigation"
                            >
                                <Menu className="size-5" />
                            </button>
                        </SheetTrigger>
                        <SheetContent className="w-[min(88vw,22rem)] bg-[#f5f2eb] p-7 dark:bg-[#11110f]">
                            <SheetTitle className="text-left text-sm font-semibold">
                                Navigate
                            </SheetTitle>
                            <nav className="mt-8 flex flex-col border-t border-current/15">
                                {navItems.map((section) => (
                                    <SheetClose asChild key={section.id}>
                                        <a
                                            href={`#${section.key}`}
                                            className="border-b border-current/15 py-5 text-2xl font-medium"
                                        >
                                            {section.label}
                                        </a>
                                    </SheetClose>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
