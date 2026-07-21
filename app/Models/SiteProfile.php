<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['full_name', 'headline', 'introduction', 'about', 'location', 'email', 'phone', 'availability_status', 'hero_image_path', 'profile_image_path', 'resume_path'])]
class SiteProfile extends Model {}
