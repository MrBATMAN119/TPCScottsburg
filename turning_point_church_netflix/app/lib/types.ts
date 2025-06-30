
export interface ChurchData {
  report_date: string;
  church_info: {
    name: string;
    slogans: string[];
    location: {
      street_address: string;
      city: string;
      state: string;
      zip_code: string;
      country: string;
    };
    contact: {
      phone: string;
      email: string;
      mailing_address: string;
    };
    online_presence: {
      website: string;
      youtube: {
        url: string;
        handle: string;
        subscribers: number;
        video_count: number;
      };
      facebook: string;
      instagram_handle: string;
      giving_app: string;
    };
    mission_statement: string;
    affiliation: string;
  };
  pastors: Array<{
    status: string;
    name: string;
    title: string;
    spouse?: string;
    children?: string[];
    biography?: string;
    linkedin_url?: string;
    date_of_passing?: string;
    legacy?: string;
  }>;
  sermon_series: Array<{
    id: string;
    title: string;
    description: string;
  }>;
  sermons: Array<{
    id: string;
    title: string;
    speaker: string;
    date: string | null;
    series_id: string | null;
    video_url: string | null;
    format: string;
    duration_seconds: number | null;
    description?: string;
    scripture_focus?: string;
  }>;
  events: {
    recurring: Array<{
      name: string;
      day: string;
      time: string;
      frequency: string;
      description: string;
    }>;
    special: Array<{
      name: string;
      date: string;
      status: string;
      time_start?: string;
      time_end?: string;
      location?: string;
      description: string;
    }>;
  };
  programs: Array<{
    name: string;
    description?: string;
    target_audience?: string;
    slogan?: string;
    guiding_scripture?: string;
    meeting_schedule?: string;
    core_principles?: string[];
    platform?: string;
  }>;
  testimonials: Array<{
    type: string;
    title?: string;
    date?: string;
    url?: string;
    source?: string;
    description?: string;
    author?: string;
    role?: string;
    quote?: string;
    context?: string;
  }>;
}

export interface SermonCardProps {
  sermon: ChurchData['sermons'][0];
  series?: ChurchData['sermon_series'][0];
  onClick: () => void;
}

export interface EventCardProps {
  event: ChurchData['events']['recurring'][0] | ChurchData['events']['special'][0];
}

export interface ProgramCardProps {
  program: ChurchData['programs'][0];
}

export interface TestimonialCardProps {
  testimonial: ChurchData['testimonials'][0];
}
