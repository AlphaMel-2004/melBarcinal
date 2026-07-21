<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ContactMessageController extends Controller
{
    public function index(Request $request): Response
    {
        $status = $request->string('status')->toString();

        return Inertia::render('admin/messages/index', [
            'messages' => ContactMessage::query()
                ->when($status !== '', fn ($query) => $query->where('status', $status))
                ->latest()->paginate(20)->withQueryString(),
            'status' => $status,
        ]);
    }

    public function update(Request $request, ContactMessage $message): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in(['unread', 'read', 'archived', 'replied'])],
        ]);

        $message->update($validated + [
            'read_at' => $validated['status'] === ContactMessage::STATUS_UNREAD ? null : ($message->read_at ?? now()),
            'replied_at' => $validated['status'] === ContactMessage::STATUS_REPLIED ? now() : $message->replied_at,
        ]);

        return back()->with('success', 'Message status updated.');
    }

    public function destroy(ContactMessage $message): RedirectResponse
    {
        $message->delete();

        return back()->with('success', 'Message archived from the inbox.');
    }
}
