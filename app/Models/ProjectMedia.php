<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['project_id', 'path', 'alt_text', 'sort_order', 'is_published'])]
class ProjectMedia extends Model
{
    protected $table = 'project_media';

    protected $attributes = ['sort_order' => 0, 'is_published' => true];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    protected function casts(): array
    {
        return ['sort_order' => 'integer', 'is_published' => 'boolean'];
    }
}
