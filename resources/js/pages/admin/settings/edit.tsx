import { Form, Head } from '@inertiajs/react';
import { LoaderCircle, Save } from 'lucide-react';
import { update } from '@/routes/admin/settings';
import type { PortfolioSection, SiteProfile, SiteSettings } from '@/types';

const inputClass =
    'mt-1 w-full border border-current/20 bg-white px-3 py-2.5 text-sm outline-none focus:border-current dark:bg-[#171815]';

export default function SiteSettingsEdit({
    profile,
    settings,
    sections,
}: {
    profile: SiteProfile;
    settings: SiteSettings;
    sections: PortfolioSection[];
}) {
    return (
        <>
            <Head title="Portfolio settings" />
            <p className="text-xs font-semibold text-current/50 uppercase">
                Appearance and content
            </p>
            <h1 className="mt-2 text-3xl font-semibold">Site settings</h1>
            <Form {...update.form()} className="mt-8 grid gap-10">
                {({ errors, processing }) => (
                    <>
                        <section className="grid gap-5 border-t border-current/15 pt-6 md:grid-cols-2">
                            <div className="md:col-span-2">
                                <h2 className="text-lg font-semibold">
                                    Profile and hero
                                </h2>
                                <p className="mt-1 text-sm text-current/50">
                                    Update the public identity and hero media.
                                </p>
                            </div>
                            <label className="text-sm">
                                Full name
                                <input
                                    name="full_name"
                                    defaultValue={profile.full_name}
                                    className={inputClass}
                                />
                            </label>
                            <label className="text-sm">
                                Headline
                                <input
                                    name="headline"
                                    defaultValue={profile.headline}
                                    className={inputClass}
                                />
                            </label>
                            <label className="text-sm md:col-span-2">
                                Introduction
                                <textarea
                                    name="introduction"
                                    rows={3}
                                    defaultValue={profile.introduction}
                                    className={inputClass}
                                />
                            </label>
                            <label className="text-sm md:col-span-2">
                                About
                                <textarea
                                    name="about"
                                    rows={7}
                                    defaultValue={profile.about}
                                    className={inputClass}
                                />
                            </label>
                            <label className="text-sm">
                                Location
                                <input
                                    name="location"
                                    defaultValue={profile.location}
                                    className={inputClass}
                                />
                            </label>
                            <label className="text-sm">
                                Availability status
                                <input
                                    name="availability_status"
                                    defaultValue={
                                        profile.availability_status ?? ''
                                    }
                                    className={inputClass}
                                />
                            </label>
                            <label className="text-sm">
                                Email
                                <input
                                    name="email"
                                    type="email"
                                    defaultValue={profile.email}
                                    className={inputClass}
                                />
                            </label>
                            <label className="text-sm">
                                Phone
                                <input
                                    name="phone"
                                    defaultValue={profile.phone}
                                    className={inputClass}
                                />
                            </label>
                            <label className="text-sm">
                                Hero image
                                <input
                                    name="hero_image"
                                    type="file"
                                    accept=".jpg,.jpeg,.png,.webp"
                                    className={inputClass}
                                />
                                <span className="mt-1 block text-xs text-current/45">
                                    Current: {profile.hero_image_path}
                                </span>
                            </label>
                            <label className="text-sm">
                                Resume PDF
                                <input
                                    name="resume"
                                    type="file"
                                    accept="application/pdf"
                                    className={inputClass}
                                />
                            </label>
                        </section>
                        <section className="grid gap-5 border-t border-current/15 pt-6 md:grid-cols-2">
                            <div className="md:col-span-2">
                                <h2 className="text-lg font-semibold">
                                    Brand and SEO
                                </h2>
                            </div>
                            <label className="text-sm">
                                Site title
                                <input
                                    name="site_title"
                                    defaultValue={settings.site_title}
                                    className={inputClass}
                                />
                            </label>
                            <label className="text-sm">
                                Logo initials
                                <input
                                    name="logo_text"
                                    defaultValue={settings.logo_text}
                                    maxLength={12}
                                    className={inputClass}
                                />
                            </label>
                            <label className="text-sm">
                                Accent color
                                <input
                                    name="accent_color"
                                    type="color"
                                    defaultValue={settings.accent_color}
                                    className="mt-1 h-11 w-full border border-current/20 bg-transparent p-1"
                                />
                            </label>
                            <label className="text-sm">
                                Default theme
                                <select
                                    name="default_theme"
                                    defaultValue={settings.default_theme}
                                    className={inputClass}
                                >
                                    <option value="system">System</option>
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                </select>
                            </label>
                            <label className="text-sm md:col-span-2">
                                SEO description
                                <textarea
                                    name="seo_description"
                                    rows={3}
                                    defaultValue={settings.seo_description}
                                    className={inputClass}
                                />
                            </label>
                            <label className="text-sm md:col-span-2">
                                Footer text
                                <input
                                    name="footer_text"
                                    defaultValue={settings.footer_text}
                                    className={inputClass}
                                />
                            </label>
                            <label className="flex items-center gap-3 text-sm">
                                <input
                                    type="hidden"
                                    name="search_indexing"
                                    value="0"
                                />
                                <input
                                    type="checkbox"
                                    name="search_indexing"
                                    value="1"
                                    defaultChecked={settings.search_indexing}
                                    className="size-4"
                                />
                                Allow search indexing
                            </label>
                        </section>
                        <section className="border-t border-current/15 pt-6">
                            <h2 className="text-lg font-semibold">
                                Portfolio sections
                            </h2>
                            <div className="mt-5 grid border-t border-l border-current/15 sm:grid-cols-2">
                                {sections.map((section, index) => (
                                    <div
                                        key={section.id}
                                        className="grid grid-cols-[1fr_6rem] gap-4 border-r border-b border-current/15 bg-white p-4 dark:bg-[#171815]"
                                    >
                                        <input
                                            type="hidden"
                                            name={`sections[${index}][id]`}
                                            value={section.id}
                                        />
                                        <label className="flex items-center gap-3 text-sm font-semibold">
                                            <input
                                                type="hidden"
                                                name={`sections[${index}][is_visible]`}
                                                value="0"
                                            />
                                            <input
                                                type="checkbox"
                                                name={`sections[${index}][is_visible]`}
                                                value="1"
                                                defaultChecked={
                                                    section.is_visible
                                                }
                                                className="size-4"
                                            />
                                            {section.label}
                                        </label>
                                        <label className="text-xs text-current/50">
                                            Order
                                            <input
                                                name={`sections[${index}][sort_order]`}
                                                type="number"
                                                min="0"
                                                defaultValue={
                                                    section.sort_order
                                                }
                                                className={inputClass}
                                            />
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </section>
                        {Object.keys(errors).length > 0 && (
                            <p className="text-sm text-red-700">
                                Review the highlighted form values and try
                                again.
                            </p>
                        )}
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
                                Save settings
                            </button>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}
