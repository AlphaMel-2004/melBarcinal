<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('site_title');
            $table->string('logo_text', 12)->default('RE');
            $table->string('accent_color', 7)->default('#B45309');
            $table->string('default_theme')->default('system');
            $table->string('footer_text');
            $table->text('seo_description');
            $table->string('social_image_path')->nullable();
            $table->boolean('search_indexing')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
