<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['key', 'label', 'is_visible', 'sort_order'])]
class PortfolioSection extends Model
{
    protected $attributes = ['is_visible' => true, 'sort_order' => 0];

    public function scopeVisible(Builder $query): Builder
    {
        return $query->where('is_visible', true);
    }

    protected function casts(): array
    {
        return ['is_visible' => 'boolean', 'sort_order' => 'integer'];
    }
}
