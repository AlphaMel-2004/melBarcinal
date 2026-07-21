<?php

namespace App\Models;

use Database\Factories\ProjectFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['title', 'slug', 'summary', 'description', 'responsibilities', 'technologies', 'role', 'project_type', 'year', 'status', 'thumbnail_path', 'demo_url', 'repository_url', 'is_featured', 'is_published', 'published_at', 'sort_order'])]
class Project extends Model
{
    /** @use HasFactory<ProjectFactory> */
    use HasFactory;

    use SoftDeletes;

    protected $attributes = [
        'status' => 'completed',
        'is_featured' => false,
        'is_published' => false,
        'sort_order' => 0,
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function media(): HasMany
    {
        return $this->hasMany(ProjectMedia::class)->orderBy('sort_order');
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true)->whereNotNull('published_at');
    }

    protected function casts(): array
    {
        return [
            'responsibilities' => 'array',
            'technologies' => 'array',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
            'published_at' => 'datetime',
            'sort_order' => 'integer',
        ];
    }
}
