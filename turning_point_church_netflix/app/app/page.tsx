
'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { ContentCarousel } from '@/components/content-carousel';
import { SermonCard } from '@/components/sermon-card';
import { EventCard } from '@/components/event-card';
import { ProgramCard } from '@/components/program-card';
import { TestimonialCard } from '@/components/testimonial-card';
import { SermonModal } from '@/components/sermon-modal';
import { Footer } from '@/components/footer';
import { getChurchData } from '@/lib/church-data';
import { ChurchData } from '@/lib/types';

export default function Home() {
  const [churchData, setChurchData] = useState<ChurchData | null>(null);
  const [selectedSermon, setSelectedSermon] = useState<ChurchData['sermons'][0] | null>(null);
  const [isSermonModalOpen, setIsSermonModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getChurchData();
        setChurchData(data);
      } catch (error) {
        console.error('Failed to load church data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSermonClick = (sermon: ChurchData['sermons'][0]) => {
    setSelectedSermon(sermon);
    setIsSermonModalOpen(true);
  };

  const handleWatchLatest = () => {
    if (churchData?.sermons && churchData.sermons.length > 0) {
      // Find the most recent sermon with a video URL
      const latestSermon = churchData.sermons
        .filter(sermon => sermon?.video_url)
        .sort((a, b) => {
          const dateA = a?.date ? new Date(a.date).getTime() : 0;
          const dateB = b?.date ? new Date(b.date).getTime() : 0;
          return dateB - dateA;
        })[0];
      
      if (latestSermon) {
        handleSermonClick(latestSermon);
      }
    }
  };

  const getSermonSeries = (seriesId: string | null) => {
    return churchData?.sermon_series?.find(series => series?.id === seriesId) || undefined;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (!churchData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Unable to load church data</p>
          <p className="text-slate-400">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  // Filter and organize content
  const recentSermons = churchData.sermons
    ?.filter(sermon => sermon?.video_url)
    ?.sort((a, b) => {
      const dateA = a?.date ? new Date(a.date).getTime() : 0;
      const dateB = b?.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    })
    ?.slice(0, 10) || [];

  const popularSermons = churchData.sermons
    ?.filter(sermon => sermon?.video_url && sermon?.duration_seconds)
    ?.sort((a, b) => (b?.duration_seconds || 0) - (a?.duration_seconds || 0))
    ?.slice(0, 8) || [];

  const upcomingEvents = churchData.events?.recurring || [];
  const programs = churchData.programs || [];
  const testimonials = churchData.testimonials || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Header />
      
      <main>
        <HeroSection onWatchLatest={handleWatchLatest} />
        
        <div className="relative z-10 space-y-12 pb-20">
          {/* Recently Added Sermons */}
          {recentSermons?.length > 0 && (
            <ContentCarousel title="Recently Added" id="sermons">
              {recentSermons.map((sermon) => sermon && (
                <SermonCard
                  key={sermon.id}
                  sermon={sermon}
                  series={getSermonSeries(sermon.series_id)}
                  onClick={() => handleSermonClick(sermon)}
                />
              ))}
            </ContentCarousel>
          )}

          {/* Popular Sermons */}
          {popularSermons?.length > 0 && (
            <ContentCarousel title="Popular Sermons">
              {popularSermons.map((sermon) => sermon && (
                <SermonCard
                  key={`popular-${sermon.id}`}
                  sermon={sermon}
                  series={getSermonSeries(sermon.series_id)}
                  onClick={() => handleSermonClick(sermon)}
                />
              ))}
            </ContentCarousel>
          )}

          {/* Church Events */}
          {upcomingEvents?.length > 0 && (
            <ContentCarousel title="Our Weekly Schedule" id="events">
              {upcomingEvents.map((event, index) => event && (
                <EventCard
                  key={`event-${index}`}
                  event={event}
                />
              ))}
            </ContentCarousel>
          )}

          {/* Our Programs */}
          {programs?.length > 0 && (
            <ContentCarousel title="Our Programs" id="programs">
              {programs.map((program, index) => program && (
                <ProgramCard
                  key={`program-${index}`}
                  program={program}
                />
              ))}
            </ContentCarousel>
          )}

          {/* Testimonials */}
          {testimonials?.length > 0 && (
            <ContentCarousel title="Stories of Faith" id="testimonials">
              {testimonials.map((testimonial, index) => testimonial && (
                <TestimonialCard
                  key={`testimonial-${index}`}
                  testimonial={testimonial}
                />
              ))}
            </ContentCarousel>
          )}
        </div>
      </main>

      <Footer />

      {/* Sermon Modal */}
      <SermonModal
        isOpen={isSermonModalOpen}
        onClose={() => setIsSermonModalOpen(false)}
        sermon={selectedSermon}
        series={selectedSermon ? getSermonSeries(selectedSermon.series_id) : null}
      />
    </div>
  );
}
