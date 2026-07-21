<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['site_title', 'logo_text', 'accent_color', 'default_theme', 'footer_text', 'seo_description', 'social_image_path', 'search_indexing'])]
class SiteSetting extends Model
{
    protected $attributes = [
        'logo_text' => 'RE',
        'accent_color' => '#B45309',
        'default_theme' => 'system',
        'search_indexing' => true,
    ];

    protected function casts(): array
    {
        return ['search_indexing' => 'boolean'];
    }
}
