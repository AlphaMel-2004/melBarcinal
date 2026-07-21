<?php

use App\Models\ContactMessage;
use App\Notifications\NewContactMessage;
use Database\Seeders\PortfolioSeeder;
use Illuminate\Support\Facades\Notification;

beforeEach(function () {
    $this->seed(PortfolioSeeder::class);
});

test('contact form validates required fields', function () {
    $this->post(route('contact.store'), [])->assertSessionHasErrors(['name', 'email', 'subject', 'message']);
});

test('contact form stores a message and queues an owner notification', function () {
    Notification::fake();

    $this->post(route('contact.store'), [
        'name' => 'Portfolio Visitor',
        'email' => 'visitor@example.com',
        'subject' => 'Laravel project inquiry',
        'message' => 'I would like to discuss a practical Laravel application with you.',
        'company' => '',
    ])->assertSessionHasNoErrors()->assertSessionHas('success');

    $message = ContactMessage::query()->firstOrFail();
    expect($message->status)->toBe(ContactMessage::STATUS_UNREAD);
    Notification::assertSentOnDemand(NewContactMessage::class);
});

test('honeypot submissions are accepted without storing spam', function () {
    $this->post(route('contact.store'), [
        'name' => 'Bot',
        'email' => 'bot@example.com',
        'subject' => 'Automated inquiry',
        'message' => 'This message is long enough to pass normal validation checks.',
        'company' => 'Spam Incorporated',
    ])->assertSessionHas('success');

    expect(ContactMessage::query()->count())->toBe(0);
});

test('contact form is rate limited', function () {
    $payload = ['name' => 'Visitor', 'email' => 'visitor@example.com', 'subject' => 'Project inquiry', 'message' => 'This is a sufficiently detailed message for the contact form.', 'company' => ''];
    foreach (range(1, 3) as $attempt) {
        $this->post(route('contact.store'), $payload)->assertRedirect();
    }

    $this->post(route('contact.store'), $payload)->assertTooManyRequests();
});
