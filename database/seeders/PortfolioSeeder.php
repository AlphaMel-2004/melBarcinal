<?php

namespace Database\Seeders;

use App\Models\Achievement;
use App\Models\Certification;
use App\Models\Education;
use App\Models\Experience;
use App\Models\PortfolioSection;
use App\Models\Project;
use App\Models\SiteProfile;
use App\Models\SiteSetting;
use App\Models\SkillCategory;
use App\Models\SocialLink;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PortfolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SiteProfile::query()->updateOrCreate(['id' => 1], [
            'full_name' => 'Rumel B. Eumague Jr.',
            'headline' => 'Frontend-Focused Full-Stack Developer',
            'introduction' => 'I design and build responsive, secure, and user-friendly digital products using Laravel, React, JavaScript, MySQL, Firebase, and modern UI/UX practices.',
            'about' => 'I am a frontend-focused developer experienced in building practical systems for educational and business environments. My work spans responsive interface implementation, Laravel application development, UI/UX design, system architecture, quality assurance, secure coding, and technical troubleshooting. I value clear communication, dependable delivery, and continuous learning.',
            'location' => 'Davao City, Philippines',
            'email' => 'eumaguerumel4@gmail.com',
            'phone' => '09815864687',
            'availability_status' => 'Available for selected opportunities',
            'hero_image_path' => '/images/rumel-barong.jpg',
        ]);

        SiteSetting::query()->updateOrCreate(['id' => 1], [
            'site_title' => 'Rumel Eumague - Developer Portfolio',
            'logo_text' => 'RE',
            'accent_color' => '#B45309',
            'default_theme' => 'system',
            'footer_text' => 'Designed and built by Rumel B. Eumague Jr.',
            'seo_description' => 'Portfolio of Rumel B. Eumague Jr., a frontend-focused full-stack developer, UI/UX designer, Laravel developer, and QA practitioner in Davao City.',
            'search_indexing' => true,
        ]);

        foreach (['work', 'experience', 'about', 'skills', 'education', 'achievements', 'contact'] as $order => $key) {
            PortfolioSection::query()->updateOrCreate(['key' => $key], [
                'label' => Str::headline($key),
                'is_visible' => true,
                'sort_order' => $order + 1,
            ]);
        }

        $projects = [
            ['Acadex', 'UI/UX Designer / Frontend Developer', 'An outcome-based automated grading system built with Laravel to simplify the grading process for educators through organized workflows and user-friendly interfaces.', ['Laravel', 'PHP', 'JavaScript', 'MySQL']],
            ['Tracademics', 'Full-Stack Developer', 'A faculty compliance monitoring system designed to centralize compliance submissions, improve tracking and reporting, and support institutional academic documentation workflows.', ['Laravel', 'PHP', 'JavaScript', 'MySQL', 'HTML', 'CSS', 'Node.js']],
            ['BC Attendly', 'Quality Assurance Specialist', 'A Flutter and Firebase event attendance and evaluation application supporting QR-based attendance, exportable reports, and real-time monitoring for students and staff.', ['Flutter', 'Dart', 'Firebase Authentication', 'Cloud Firestore', 'QR Code Generation']],
            ['BC Campus Compass', 'UI/UX Designer / Quality Assurance Specialist', 'A Laravel-based campus system with secure student and faculty access, clinical tracking, interactive mapping, and system and email notifications.', ['Laravel', 'PHP', 'MySQL', 'Leaflet.js', 'SMTP']],
            ['Xendra Workspace', 'Quality Assurance Specialist', 'An integrated workspace for client-service teams covering project management, time tracking, invoicing, files, and client portals.', ['Laravel', 'PHP', 'Inertia.js', 'React', 'Tailwind CSS', 'MySQL', 'Vite']],
        ];

        foreach ($projects as $order => [$title, $role, $description, $technologies]) {
            Project::query()->updateOrCreate(['slug' => Str::slug($title)], [
                'title' => $title,
                'summary' => $description,
                'description' => $description,
                'responsibilities' => [$role],
                'technologies' => $technologies,
                'role' => $role,
                'status' => 'completed',
                'is_featured' => true,
                'is_published' => true,
                'published_at' => now(),
                'sort_order' => $order + 1,
            ]);
        }

        $experiences = [
            ['AgLend Finance', 'UI/UX and Frontend Developer', 'Australia-based remote, project-based work through the Philippine branch', '2025', ['Designed wireframes and interactive prototypes using Figma.', 'Developed responsive and user-friendly interfaces.', 'Contributed to project delivery, database architecture, system design, and client-specific customization.', 'Collaborated with team members to meet project requirements.']],
            ['AppleOne Brokenshire Medical Center', 'Technical Support Intern', null, '2025-2026', ['Diagnosed and repaired computer systems.', 'Assisted with server installation, configuration, and server-room maintenance.', 'Configured and maintained routers, switches, VLANs, and virtual servers.', 'Resolved technical concerns through a ticketing system.', 'Prepared and deployed computer units.']],
            ['Brokenshire College, Inc.', 'Software Development Intern', null, '2025-2026', ['Developed Tracademics using Laravel and MySQL.', 'Designed features for faculty compliance and academic documentation.', 'Prepared software analysis, design, and development documentation.', 'Coordinated with stakeholders regarding institutional requirements.']],
        ];

        foreach ($experiences as $order => [$organization, $position, $details, $period, $responsibilities]) {
            Experience::query()->updateOrCreate(['organization' => $organization, 'position' => $position], [
                'employment_details' => $details,
                'period' => $period,
                'responsibilities' => $responsibilities,
                'sort_order' => $order + 1,
                'is_published' => true,
            ]);
        }

        $educations = [
            ['Bachelor of Science in Information Technology', 'Software Development', 'Brokenshire College, Davao City', '2022-2026'],
            ['Science, Technology, Engineering, and Mathematics', null, 'A.L. Navarro National High School', '2020-2022'],
        ];

        foreach ($educations as $order => [$qualification, $specialization, $institution, $period]) {
            Education::query()->updateOrCreate(['qualification' => $qualification], [
                'specialization' => $specialization,
                'institution' => $institution,
                'period' => $period,
                'sort_order' => $order + 1,
                'is_published' => true,
            ]);
        }

        $skillGroups = [
            'Frontend' => ['React', 'JavaScript', 'TypeScript', 'Vue.js', 'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'Inertia.js'],
            'Backend' => ['Laravel', 'PHP', 'Node.js', 'Python'],
            'Database and Cloud' => ['MySQL', 'Firebase', 'Cloud Firestore', 'AWS backup workflows'],
            'Design' => ['Figma', 'Wireframing', 'Interactive prototyping', 'Responsive design', 'UI/UX design'],
            'Development and AI Tools' => ['GitHub', 'Git', 'CI/CD workflows', 'OpenAI', 'Gemini', 'Claude', 'AI-assisted development'],
            'Technical Support and Security' => ['Hardware troubleshooting', 'Software troubleshooting', 'System installation', 'Basic network diagnostics', 'Risk management', 'Internal security monitoring', 'Audit preparation'],
        ];

        $categoryOrder = 1;
        foreach ($skillGroups as $categoryName => $skills) {
            $category = SkillCategory::query()->updateOrCreate(['slug' => Str::slug($categoryName)], [
                'name' => $categoryName,
                'sort_order' => $categoryOrder++,
                'is_published' => true,
            ]);

            foreach ($skills as $skillOrder => $skill) {
                $category->skills()->updateOrCreate(['name' => $skill], [
                    'sort_order' => $skillOrder + 1,
                    'is_published' => true,
                ]);
            }
        }

        $achievements = [
            'Dean\'s Lister - First Year, First and Second Semesters',
            'Dean\'s Lister - Third Year, Second Semester',
            'Dean\'s Lister - Fourth Year, First and Second Semesters',
            'Techpreneur Award - NETGUARDIAN, 2025',
            'Most Unique Business Idea Award - NETGUARDIAN, 2025',
            'Code Wizard Award - Third Year',
            'Best Paper Award - Contours of Knowledge Research Conference, 2026',
            'IT Innovation Award, 2026',
        ];

        foreach ($achievements as $order => $title) {
            Achievement::query()->updateOrCreate(['title' => $title], ['sort_order' => $order + 1, 'is_published' => true]);
        }

        Certification::query()->updateOrCreate(['title' => 'Laravel 101'], ['sort_order' => 1, 'is_published' => true]);

        foreach ([['GitHub', 'https://github.com/AlphaMel-2004'], ['LinkedIn', 'https://www.linkedin.com/in/rumel-eumague-778580310/']] as $order => [$platform, $url]) {
            SocialLink::query()->updateOrCreate(['platform' => $platform], [
                'url' => $url,
                'sort_order' => $order + 1,
                'is_published' => true,
            ]);
        }
    }
}
