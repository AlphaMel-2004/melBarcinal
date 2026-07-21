<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class SiteSettingsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->is_owner === true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'full_name' => ['required', 'string', 'max:255'],
            'headline' => ['required', 'string', 'max:255'],
            'introduction' => ['required', 'string', 'max:1000'],
            'about' => ['required', 'string', 'max:10000'],
            'location' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email:rfc', 'max:255'],
            'phone' => ['required', 'string', 'max:40'],
            'availability_status' => ['nullable', 'string', 'max:255'],
            'site_title' => ['required', 'string', 'max:255'],
            'logo_text' => ['required', 'string', 'max:12'],
            'accent_color' => ['required', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'default_theme' => ['required', 'in:light,dark,system'],
            'footer_text' => ['required', 'string', 'max:255'],
            'seo_description' => ['required', 'string', 'max:500'],
            'search_indexing' => ['required', 'boolean'],
            'hero_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'resume' => ['nullable', 'file', 'mimes:pdf', 'max:10240'],
            'sections' => ['nullable', 'array'],
            'sections.*.id' => ['required', 'integer', 'exists:portfolio_sections,id'],
            'sections.*.is_visible' => ['required', 'boolean'],
            'sections.*.sort_order' => ['required', 'integer', 'min:0', 'max:999'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $sections = collect($this->input('sections', []))->map(fn (array $section): array => [
            ...$section,
            'is_visible' => filter_var($section['is_visible'] ?? false, FILTER_VALIDATE_BOOL),
        ])->all();

        $this->merge(['search_indexing' => $this->boolean('search_indexing'), 'sections' => $sections]);
    }
}
