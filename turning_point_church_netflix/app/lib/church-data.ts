import { ChurchData } from './types';

export async function getChurchData(): Promise<ChurchData> {
  try {
    const response = await fetch('/turning_point_church_data.json');
    if (!response?.ok) {
      throw new Error('Failed to fetch church data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading church data:', error);
    throw error;
  }
}

export function formatDuration(seconds: number | null): string {
  if (!seconds) return '';
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }
  
  return `${minutes}m ${remainingSeconds}s`;
}

export function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return '';
  }
}

export function getYouTubeVideoId(url: string | null): string | null {
  if (!url) return null;
  
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
  const match = url.match(regex);
  return match?.[1] || null;
}

export function getYouTubeThumbnail(url: string | null): string {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return 'https://via.placeholder.com/480x360/1e293b/f1f5f9?text=Sermon+Video';
  
  return 'https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg';
}
