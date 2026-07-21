<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProjectRequest;
use App\Models\ActivityLog;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('admin/projects/index', [
            'projects' => Project::query()->latest()->paginate(20)->withQueryString(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('admin/projects/form', ['project' => null]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProjectRequest $request): RedirectResponse
    {
        $data = $request->projectData();
        $data['published_at'] = $data['is_published'] ? now() : null;
        $project = Project::query()->create($data);

        $this->log($request, 'project.created', $project);
        Cache::forget('portfolio.home');

        return to_route('admin.projects.index')->with('success', 'Project created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project): RedirectResponse
    {
        return to_route('admin.projects.edit', $project);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project): Response
    {
        return Inertia::render('admin/projects/form', ['project' => $project]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProjectRequest $request, Project $project): RedirectResponse
    {
        $data = $request->projectData();
        $data['published_at'] = $data['is_published'] ? ($project->published_at ?? now()) : null;
        $project->update($data);

        $this->log($request, 'project.updated', $project);
        Cache::forget('portfolio.home');

        return to_route('admin.projects.edit', $project)->with('success', 'Project updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProjectRequest $request, Project $project): RedirectResponse
    {
        $this->log($request, 'project.deleted', $project);
        $project->delete();
        Cache::forget('portfolio.home');

        return to_route('admin.projects.index')->with('success', 'Project moved to trash.');
    }

    private function log(ProjectRequest $request, string $action, Project $project): void
    {
        ActivityLog::query()->create([
            'user_id' => $request->user()?->id,
            'action' => $action,
            'subject_type' => $project->getMorphClass(),
            'subject_id' => $project->getKey(),
            'metadata' => ['title' => $project->title],
            'ip_address' => $request->ip(),
        ]);
    }
}
