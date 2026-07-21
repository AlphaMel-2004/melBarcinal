<?php

namespace App\Http\Requests\Admin;

use App\Models\Project;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ProjectRequest extends FormRequest
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
        if ($this->isMethod('delete')) {
            return [];
        }

        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique(Project::class, 'slug')->ignore($this->route('project'))],
            'summary' => ['required', 'string', 'max:1000'],
            'description' => ['required', 'string', 'max:20000'],
            'responsibilities_text' => ['nullable', 'string', 'max:5000'],
            'technologies_text' => ['nullable', 'string', 'max:1000'],
            'role' => ['required', 'string', 'max:255'],
            'project_type' => ['nullable', 'string', 'max:120'],
            'year' => ['nullable', 'string', 'max:20'],
            'status' => ['required', Rule::in(['planned', 'active', 'completed', 'archived'])],
            'thumbnail_path' => ['nullable', 'string', 'max:2048'],
            'demo_url' => ['nullable', 'url:http,https', 'max:2048'],
            'repository_url' => ['nullable', 'url:http,https', 'max:2048'],
            'is_featured' => ['required', 'boolean'],
            'is_published' => ['required', 'boolean'],
            'sort_order' => ['required', 'integer', 'min:0', 'max:999'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'slug' => Str::slug((string) ($this->input('slug') ?: $this->input('title'))),
            'is_featured' => $this->boolean('is_featured'),
            'is_published' => $this->boolean('is_published'),
        ]);
    }

    /** @return array<string, mixed> */
    public function projectData(): array
    {
        $data = Arr::except($this->validated(), ['responsibilities_text', 'technologies_text']);
        $data['responsibilities'] = $this->lines((string) $this->validated('responsibilities_text', ''));
        $data['technologies'] = collect(explode(',', (string) $this->validated('technologies_text', '')))
            ->map(fn (string $technology): string => trim($technology))->filter()->values()->all();

        return $data;
    }

    /** @return list<string> */
    private function lines(string $value): array
    {
        return collect(preg_split('/\r\n|\r|\n/', $value) ?: [])->map(fn (string $line): string => trim($line))->filter()->values()->all();
    }
}
