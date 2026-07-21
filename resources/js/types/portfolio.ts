export type SiteProfile = {
    id: number;
    full_name: string;
    headline: string;
    introduction: string;
    about: string;
    location: string;
    email: string;
    phone: string;
    availability_status: string | null;
    hero_image_path: string | null;
    profile_image_path: string | null;
    resume_path: string | null;
};

export type SiteSettings = {
    id: number;
    site_title: string;
    logo_text: string;
    accent_color: string;
    default_theme: 'light' | 'dark' | 'system';
    footer_text: string;
    seo_description: string;
    social_image_path: string | null;
    search_indexing: boolean;
};

export type PortfolioSection = {
    id: number;
    key: string;
    label: string;
    is_visible: boolean;
    sort_order: number;
};

export type ProjectMedia = {
    id: number;
    path: string;
    alt_text: string;
};

export type Project = {
    id: number;
    title: string;
    slug: string;
    summary: string;
    description: string;
    responsibilities: string[] | null;
    technologies: string[] | null;
    role: string;
    project_type: string | null;
    year: string | null;
    status: string;
    thumbnail_path: string | null;
    demo_url: string | null;
    repository_url: string | null;
    is_featured: boolean;
    is_published: boolean;
    published_at: string | null;
    sort_order: number;
    media?: ProjectMedia[];
};

export type Experience = {
    id: number;
    organization: string;
    position: string;
    employment_details: string | null;
    period: string;
    responsibilities: string[];
};

export type Education = {
    id: number;
    qualification: string;
    specialization: string | null;
    institution: string;
    period: string;
};

export type SkillCategory = {
    id: number;
    name: string;
    slug: string;
    skills: Array<{ id: number; name: string }>;
};

export type Achievement = { id: number; title: string; year: string | null };
export type Certification = {
    id: number;
    title: string;
    issuer: string | null;
};
export type SocialLink = { id: number; platform: string; url: string };

export type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
};
