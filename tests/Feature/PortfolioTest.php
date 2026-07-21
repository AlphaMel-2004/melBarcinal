<?php

use App\Models\Project;
use Database\Seeders\PortfolioSeeder;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->seed(PortfolioSeeder::class);
});

test('public portfolio loads with the grayscale hero portrait content', function () {
    $this->get(route('home'))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('portfolio/index')
            ->where('profile.hero_image_path', '/images/rumel-barong.jpg')
            ->has('projects', 5));
});

test('published featured projects are visible while drafts are hidden', function () {
    Project::factory()->create(['title' => 'Published work', 'slug' => 'published-work', 'is_featured' => true]);
    Project::factory()->draft()->create(['title' => 'Private draft', 'slug' => 'private-draft', 'is_featured' => true]);

    $this->get(route('home'))->assertInertia(fn (Assert $page) => $page
        ->where('projects', fn ($projects) => $projects->contains('title', 'Published work') && ! $projects->contains('title', 'Private draft')));
});

test('published project details load and drafts return not found', function () {
    $published = Project::factory()->create();
    $draft = Project::factory()->draft()->create();

    $this->get(route('projects.show', $published))->assertSuccessful()->assertInertia(fn (Assert $page) => $page->component('portfolio/project')->where('project.id', $published->id));
    $this->get(route('projects.show', $draft))->assertNotFound();
});

test('portfolio exposes configurable seo settings', function () {
    $this->get(route('home'))->assertInertia(fn (Assert $page) => $page
        ->where('settings.search_indexing', true)
        ->where('settings.site_title', 'Rumel Eumague - Developer Portfolio'));
});
