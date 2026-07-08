import { useState, useEffect } from "react";
import { publicContentApi } from "../utils/contentApi";

/**
 * useContent — fetch live content from the backend API.
 *
 * Pattern:
 *   1. Immediately returns the static fallback data (from data/index.js)
 *      so the page renders instantly with no loading flash.
 *   2. Fires a background API call to the Spring Boot backend.
 *   3. If the call succeeds AND returns data, replaces the static data
 *      with the live data from the database.
 *   4. If the call fails (backend not running, network error, empty array),
 *      silently keeps the static fallback — the page keeps working.
 *
 * This means:
 *   - Admin edits appear on the frontend automatically on next page load.
 *   - The frontend never breaks if the backend is down.
 *   - No loading spinners on the public celebration page.
 */
export function useContent(apiCall, fallbackData) {
  const [data, setData] = useState(fallbackData);

  useEffect(() => {
    apiCall()
      .then((result) => {
        // Only replace static data if the API returned a non-empty array
        if (Array.isArray(result) && result.length > 0) {
          setData(result);
        } else if (
          result &&
          typeof result === "object" &&
          !Array.isArray(result)
        ) {
          // For singleton objects like hero settings
          setData(result);
        }
        // If result is empty/null, keep the static fallback silently
      })
      .catch(() => {
        // Backend not running — keep static fallback, no error shown
      });
  }, []);

  return data;
}

// ── Convenience hooks per content type ──────────────────────────────────────
// Each one:
//   • Shows static data from data/index.js immediately (no flash)
//   • Replaces with admin-edited data from MySQL as soon as it arrives
// ────────────────────────────────────────────────────────────────────────────

import {
  HERO,
  GREETINGS,
  QUOTES,
  STORY_CHAPTERS,
  KAVITHAI,
  SONGS,
  VIDEOS,
  MEMORY_GALLERY,
} from "../data";

export function useHeroContent() {
  const [data, setData] = useState(HERO);
  useEffect(() => {
    publicContentApi
      .hero()
      .then((result) => {
        if (result && result.name) setData(result);
      })
      .catch(() => {});
  }, []);
  return data;
}

export function useGreetings() {
  return useContent(publicContentApi.greetings, GREETINGS);
}

export function useQuotes() {
  return useContent(publicContentApi.quotes, QUOTES);
}

export function useStoryChapters() {
  return useContent(publicContentApi.storyChapters, STORY_CHAPTERS);
}

export function useKavithai() {
  return useContent(publicContentApi.kavithai, KAVITHAI);
}

export function useSongs() {
  return useContent(publicContentApi.songs, SONGS);
}

export function useVideos() {
  return useContent(publicContentApi.videos, VIDEOS);
}

export function useMemoryGallery() {
  return useContent(publicContentApi.memoryGallery, MEMORY_GALLERY);
}
