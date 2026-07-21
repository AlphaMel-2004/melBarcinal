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
        Schema::create('site_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('headline');
            $table->text('introduction');
            $table->longText('about');
            $table->string('location');
            $table->string('email');
            $table->string('phone');
            $table->string('availability_status')->nullable();
            $table->string('hero_image_path')->nullable();
            $table->string('profile_image_path')->nullable();
            $table->string('resume_path')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_profiles');
    }
};
