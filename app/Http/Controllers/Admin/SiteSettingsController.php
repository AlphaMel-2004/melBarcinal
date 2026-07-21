<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SiteSettingsRequest;
use App\Models\ActivityLog;
use App\Models\PortfolioSection;
use App\Models\SiteProfile;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class SiteSettingsController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('admin/settings/edit', [
            'profile' => SiteProfile::query()->first(),
            'settings' => SiteSetting::query()->first(),
            'sections' => PortfolioSection::query()->orderBy('sort_order')->get(),
        ]);
    }

    public function update(SiteSettingsRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $profile = SiteProfile::query()->firstOrNew(['id' => 1]);
        $settings = SiteSetting::query()->firstOrNew(['id' => 1]);

        $profile->fill(Arr::only($validated, ['full_name', 'headline', 'introduction', 'about', 'location', 'email', 'phone', 'availability_status']));
        $settings->fill(Arr::only($validated, ['site_title', 'logo_text', 'accent_color', 'default_theme', 'footer_text', 'seo_description', 'search_indexing']));

        if ($request->hasFile('hero_image')) {
            $this->deleteStoredFile($profile->hero_image_path);
            $profile->hero_image_path = '/storage/'.$request->file('hero_image')->store('portfolio', 'public');
        }

        if ($request->hasFile('resume')) {
            $this->deleteStoredFile($profile->resume_path);
            $profile->resume_path = '/storage/'.$request->file('resume')->store('portfolio', 'public');
        }

        $profile->save();
        $settings->save();

        foreach ($validated['sections'] ?? [] as $sectionData) {
            PortfolioSection::query()->whereKey($sectionData['id'])->update([
                'is_visible' => $sectionData['is_visible'],
                'sort_order' => $sectionData['sort_order'],
            ]);
        }

        ActivityLog::query()->create([
            'user_id' => $request->user()?->id,
            'action' => 'site.settings.updated',
            'subject_type' => $settings->getMorphClass(),
            'subject_id' => $settings->getKey(),
            'ip_address' => $request->ip(),
        ]);
        Cache::forget('portfolio.home');

        return back()->with('success', 'Portfolio settings updated.');
    }

    private function deleteStoredFile(?string $path): void
    {
        if ($path !== null && Str::startsWith($path, '/storage/')) {
            Storage::disk('public')->delete(Str::after($path, '/storage/'));
        }
    }
}
