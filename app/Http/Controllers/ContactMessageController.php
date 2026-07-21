<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactMessageRequest;
use App\Models\ContactMessage;
use App\Models\SiteProfile;
use App\Notifications\NewContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Notification;

class ContactMessageController extends Controller
{
    public function store(StoreContactMessageRequest $request): RedirectResponse
    {
        if ($request->filled('company')) {
            return back()->with('success', 'Thanks. Your message has been received.');
        }

        $message = ContactMessage::query()->create($request->safe()->except('company') + [
            'ip_hash' => hash_hmac('sha256', (string) $request->ip(), (string) config('app.key')),
        ]);

        $recipient = SiteProfile::query()->value('email');
        if ($recipient !== null && config('mail.default') !== null) {
            Notification::route('mail', $recipient)->notify(new NewContactMessage($message));
        }

        return back()->with('success', 'Thanks. Your message has been received.');
    }
}
