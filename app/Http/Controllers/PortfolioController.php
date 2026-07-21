<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use App\Models\Certification;
use App\Models\Education;
use App\Models\Experience;
use App\Models\PortfolioSection;
use App\Models\Project;
use App\Models\SiteProfile;
use App\Models\SiteSetting;
use App\Models\SkillCategory;
use App\Models\SocialLink;
use Illuminate\Http\Response as HttpResponse;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('portfolio/index', [
            'profile' => SiteProfile::query()->first(),
            'settings' => SiteSetting::query()->first(),
            'sections' => PortfolioSection::query()->visible()->orderBy('sort_order')->get(),
            'projects' => Project::query()->published()->where('is_featured', true)->orderBy('sort_order')->get(),
            'experiences' => Experience::query()->published()->orderBy('sort_order')->get(),
            'educations' => Education::query()->published()->orderBy('sort_order')->get(),
            'skillCategories' => SkillCategory::query()->published()->with(['skills' => fn ($query) => $query->where('is_published', true)->orderBy('sort_order')])->orderBy('sort_order')->get(),
            'achievements' => Achievement::query()->published()->orderBy('sort_order')->get(),
            'certifications' => Certification::query()->published()->orderBy('sort_order')->get(),
            'socialLinks' => SocialLink::query()->published()->orderBy('sort_order')->get(),
        ]);
    }

    public function show(Project $project): Response
    {
        abort_unless($project->is_published && $project->published_at !== null, 404);

        return Inertia::render('portfolio/project', [
            'project' => $project->load(['media' => fn ($query) => $query->where('is_published', true)->orderBy('sort_order')]),
            'settings' => SiteSetting::query()->first(),
        ]);
    }

    public function sitemap(): HttpResponse
    {
        $urls = Project::query()->published()->orderBy('updated_at')->get(['slug', 'updated_at']);

        return response()->view('sitemap', ['projects' => $urls])->header('Content-Type', 'application/xml');
    }
}
