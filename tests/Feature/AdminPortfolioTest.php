<?php

use App\Models\PortfolioSection;
use App\Models\Project;
use App\Models\SiteProfile;
use App\Models\SiteSetting;
use App\Models\User;
use Database\Seeders\PortfolioSeeder;

beforeEach(function () {
    $this->seed(PortfolioSeeder::class);
});

test('admin routes require an authenticated owner', function () {
    $this->get(route('admin.dashboard'))->assertRedirect(route('login'));
    $this->actingAs(User::factory()->create())->get(route('admin.dashboard'))->assertForbidden();
});

test('public registration is unavailable', function () {
    $this->get('/register')->assertNotFound();
    $this->get('/admin/register')->assertNotFound();
});

test('owner can create update and delete a project', function () {
    $owner = User::factory()->owner()->create();
    $payload = [
        'title' => 'New Portfolio System',
        'slug' => '',
        'summary' => 'A concise summary for the portfolio system.',
        'description' => 'A complete case study for the portfolio system.',
        'responsibilities_text' => "UI design\nFrontend implementation",
        'technologies_text' => 'Laravel, React, MySQL',
        'role' => 'Full-Stack Developer',
        'project_type' => 'Web application',
        'year' => '2026',
        'status' => 'completed',
        'thumbnail_path' => null,
        'demo_url' => null,
        'repository_url' => null,
        'is_featured' => true,
        'is_published' => false,
        'sort_order' => 10,
    ];

    $this->actingAs($owner)->post(route('admin.projects.store'), $payload)->assertSessionHasNoErrors();
    $project = Project::query()->where('slug', 'new-portfolio-system')->firstOrFail();

    $this->actingAs($owner)->put(route('admin.projects.update', $project), [...$payload, 'title' => 'Updated Portfolio System', 'slug' => $project->slug, 'is_published' => true])->assertSessionHasNoErrors();
    expect($project->refresh()->title)->toBe('Updated Portfolio System')->and($project->is_published)->toBeTrue();

    $this->actingAs($owner)->delete(route('admin.projects.destroy', $project))->assertSessionHasNoErrors();
    expect($project->refresh()->trashed())->toBeTrue();
});

test('owner can hide a public section', function () {
    $owner = User::factory()->owner()->create();
    $profile = SiteProfile::query()->firstOrFail();
    $settings = SiteSetting::query()->firstOrFail();
    $sections = PortfolioSection::query()->orderBy('sort_order')->get();

    $payload = [...$profile->only(['full_name', 'headline', 'introduction', 'about', 'location', 'email', 'phone', 'availability_status']), ...$settings->only(['site_title', 'logo_text', 'accent_color', 'default_theme', 'footer_text', 'seo_description', 'search_indexing']), 'sections' => $sections->map(fn ($section) => ['id' => $section->id, 'is_visible' => $section->key !== 'achievements', 'sort_order' => $section->sort_order])->all()];

    $this->actingAs($owner)->post(route('admin.settings.update'), $payload)->assertSessionHasNoErrors();
    expect(PortfolioSection::query()->where('key', 'achievements')->value('is_visible'))->toBeFalse();
});
