<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['title', 'issuer', 'issued_at', 'credential_url', 'certificate_image_path', 'sort_order', 'is_published'])]
class Certification extends Model
{
    protected $attributes = ['sort_order' => 0, 'is_published' => true];

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }

    protected function casts(): array
    {
        return ['issued_at' => 'date', 'sort_order' => 'integer', 'is_published' => 'boolean'];
    }
}
