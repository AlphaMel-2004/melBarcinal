import { Form } from '@inertiajs/react';
import { ArrowUpRight, LoaderCircle } from 'lucide-react';
import { store } from '@/routes/contact';

const fieldClass =
    'w-full border-0 border-b border-current/25 bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-current/40 focus:border-[#a04622] focus:ring-0';

export function ContactForm() {
    return (
        <Form {...store.form()} resetOnSuccess className="grid gap-5">
            {({ errors, processing, recentlySuccessful }) => (
                <>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <label className="grid gap-1 text-sm">
                            Name
                            <input
                                name="name"
                                autoComplete="name"
                                className={fieldClass}
                                placeholder="Your name"
                            />
                            {errors.name && (
                                <span className="text-xs text-red-700">
                                    {errors.name}
                                </span>
                            )}
                        </label>
                        <label className="grid gap-1 text-sm">
                            Email
                            <input
                                name="email"
                                type="email"
                                autoComplete="email"
                                className={fieldClass}
                                placeholder="you@example.com"
                            />
                            {errors.email && (
                                <span className="text-xs text-red-700">
                                    {errors.email}
                                </span>
                            )}
                        </label>
                    </div>
                    <label className="grid gap-1 text-sm">
                        Subject
                        <input
                            name="subject"
                            className={fieldClass}
                            placeholder="What would you like to discuss?"
                        />
                        {errors.subject && (
                            <span className="text-xs text-red-700">
                                {errors.subject}
                            </span>
                        )}
                    </label>
                    <label className="grid gap-1 text-sm">
                        Message
                        <textarea
                            name="message"
                            rows={5}
                            className={fieldClass}
                            placeholder="Tell me about the work, team, or problem."
                        />
                        {errors.message && (
                            <span className="text-xs text-red-700">
                                {errors.message}
                            </span>
                        )}
                    </label>
                    <label
                        className="absolute -left-[9999px]"
                        aria-hidden="true"
                    >
                        Company
                        <input
                            name="company"
                            tabIndex={-1}
                            autoComplete="off"
                        />
                    </label>
                    <p className="text-xs text-current/55">
                        Your details are used only to respond to this inquiry.
                    </p>
                    <div className="flex items-center gap-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex min-h-11 items-center gap-2 bg-[#181815] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#a04622] disabled:opacity-60 dark:bg-white dark:text-black"
                        >
                            {processing ? (
                                <LoaderCircle className="size-4 animate-spin" />
                            ) : (
                                <ArrowUpRight className="size-4" />
                            )}{' '}
                            Send message
                        </button>
                        {recentlySuccessful && (
                            <p
                                role="status"
                                className="text-sm font-medium text-green-800 dark:text-green-300"
                            >
                                Message received. Thank you.
                            </p>
                        )}
                    </div>
                </>
            )}
        </Form>
    );
}
