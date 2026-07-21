import { Form, Head, Link } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { destroy, index, update } from '@/routes/admin/messages';
import type { Paginated } from '@/types';

type Message = {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: string;
    created_at: string;
};

export default function MessagesIndex({
    messages,
    status,
}: {
    messages: Paginated<Message>;
    status: string;
}) {
    return (
        <>
            <Head title="Contact messages" />
            <p className="text-xs font-semibold text-current/50 uppercase">
                Inbox
            </p>
            <h1 className="mt-2 text-3xl font-semibold">Contact messages</h1>
            <div className="mt-6 flex flex-wrap gap-2">
                {['', 'unread', 'read', 'replied', 'archived'].map((filter) => (
                    <Link
                        key={filter || 'all'}
                        href={index({
                            query: filter ? { status: filter } : {},
                        })}
                        className={`border px-3 py-2 text-xs font-semibold ${status === filter ? 'border-current bg-current text-white dark:text-black' : 'border-current/15'}`}
                    >
                        {filter || 'all'}
                    </Link>
                ))}
            </div>
            <div className="mt-6 grid gap-3">
                {messages.data.length === 0 ? (
                    <p className="border-t border-current/15 py-12 text-sm text-current/50">
                        No messages in this view.
                    </p>
                ) : (
                    messages.data.map((message) => (
                        <article
                            key={message.id}
                            className="border border-current/15 bg-white p-5 dark:bg-[#171815]"
                        >
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <p className="font-semibold">
                                        {message.subject}
                                    </p>
                                    <a
                                        href={`mailto:${message.email}`}
                                        className="mt-1 block text-sm text-current/50"
                                    >
                                        {message.name} / {message.email}
                                    </a>
                                </div>
                                <span className="bg-[#e8e8e2] px-2 py-1 text-xs font-semibold text-black">
                                    {message.status}
                                </span>
                            </div>
                            <p className="mt-5 text-sm leading-relaxed whitespace-pre-wrap text-current/75">
                                {message.message}
                            </p>
                            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-current/10 pt-4">
                                <time className="text-xs text-current/45">
                                    {new Date(
                                        message.created_at,
                                    ).toLocaleString()}
                                </time>
                                <div className="flex gap-2">
                                    <Form {...update.form(message.id)}>
                                        <select
                                            name="status"
                                            defaultValue={message.status}
                                            onChange={(event) =>
                                                event.currentTarget.form?.requestSubmit()
                                            }
                                            className="h-9 border border-current/15 bg-transparent px-2 text-xs"
                                        >
                                            <option value="unread">
                                                Unread
                                            </option>
                                            <option value="read">Read</option>
                                            <option value="replied">
                                                Replied
                                            </option>
                                            <option value="archived">
                                                Archived
                                            </option>
                                        </select>
                                    </Form>
                                    <Form {...destroy.form(message.id)}>
                                        <button
                                            type="submit"
                                            className="flex size-9 items-center justify-center border border-red-700/25 text-red-700"
                                            aria-label="Delete message"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                    </Form>
                                </div>
                            </div>
                        </article>
                    ))
                )}
            </div>
        </>
    );
}
