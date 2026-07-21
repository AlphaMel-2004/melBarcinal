<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use App\Models\ActivityLog;
use App\Models\ContactMessage;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Skill;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'publishedProjects' => Project::query()->published()->count(),
                'draftProjects' => Project::query()->where('is_published', false)->count(),
                'experiences' => Experience::query()->count(),
                'skills' => Skill::query()->count(),
                'achievements' => Achievement::query()->count(),
                'unreadMessages' => ContactMessage::query()->where('status', ContactMessage::STATUS_UNREAD)->count(),
            ],
            'recentActivity' => ActivityLog::query()->with('user:id,name')->latest()->limit(8)->get(),
        ]);
    }
}
