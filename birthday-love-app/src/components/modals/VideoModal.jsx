import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useVideos } from "../../hooks/useContent";
import { normaliseCloudinaryVideoUrl } from "../../utils/cloudinaryUtils";

import { getDriveVideoUrl, isDriveUrl } from "../../utils/driveUtils";

/**
 * VideoModal — plays Cloudinary videos (or any URL) via react-player.
 *
 * Why react-player instead of a plain <video> tag:
 *   • Handles Cloudinary's streaming format automatically
 *   • Works with direct MP4 URLs, HLS streams, and YouTube/Vimeo links
 *   • Sets correct CORS and crossOrigin attributes internally
 *   • Shows a native-style playback UI on all platforms including iOS
 *
 * Why we normalise the URL first:
 *   • Cloudinary sometimes sets resource_type=raw for video files
 *     (especially when uploaded via the dashboard drag-and-drop)
 *   • /raw/upload/ URLs return the file without streaming headers
 *   • normaliseCloudinaryVideoUrl() fixes the resource type and
 *     adds f_auto/q_auto transformations for smooth streaming
 */
export default function VideoModal({ idx }) {
  const videos = useVideos();
  const v = videos[idx] || videos[0];
  const [error, setError] = useState(false);

  if (!v) return null;

  const rawUrl = v.url || "";
  const videoUrl = normaliseCloudinaryVideoUrl(rawUrl);

  return (
    <div className="glass-pink rounded-3xl overflow-hidden">
      {/* Video player area */}
      <div className="relative" style={{ background: "#000", minHeight: 260 }}>
        {videoUrl ? (
          error ? (
            /* Fallback when player errors — direct link as last resort */
            <div className="flex flex-col items-center justify-center gap-4 py-14 px-6 text-center">
              <span className="text-4xl">🎬</span>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 16,
                  color: "#e8d5e0",
                }}
              >
                Could not play the video inline.
              </p>
              <a
                href={videoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full text-sm"
                style={{
                  background: "linear-gradient(135deg,#FF4D8D,#A855F7)",
                  color: "#fff",
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 16,
                  textDecoration: "none",
                }}
              >
                Open Video ↗
              </a>
              <p
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 9,
                  color: "rgba(255,255,255,.3)",
                }}
              >
                // tip: make sure the Cloudinary URL is a /video/upload/ URL,
                not /raw/upload/
              </p>
            </div>
          ) : (
            <ReactPlayer
              url={videoUrl}
              controls
              width="100%"
              height="100%"
              style={{ minHeight: 260 }}
              config={{
                file: {
                  attributes: {
                    // crossOrigin is required for Cloudinary CORS headers to work
                    crossOrigin: "anonymous",
                    controlsList: "nodownload",
                    playsInline: true, // prevents iOS full-screen forced behaviour
                    preload: "metadata", // load just enough to show thumbnail
                  },
                  // Force HTML5 player (not Flash) for Cloudinary URLs
                  forceHLS: false,
                  forceVideo: true,
                },
              }}
              onError={() => setError(true)}
            />
          )
        ) : (
          /* No URL set yet */
          <div className="flex flex-col items-center justify-center gap-3 py-14">
            <div className="text-5xl">{v.emoji || v.e || "🎬"}</div>
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-xl text-white"
              style={{
                background: "rgba(255,77,141,.25)",
                border: "2px solid rgba(255,77,141,.6)",
              }}
            >
              ▶
            </div>
            <p
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 9,
                color: "rgba(255,255,255,.25)",
                marginTop: 8,
              }}
            >
              // add a Cloudinary video URL in the admin panel
            </p>
          </div>
        )}
      </div>

      {/* Title & description */}
      <div className="p-6">
        <h3
          style={{
            fontFamily: "'Great Vibes',cursive",
            fontSize: 30,
            color: "#FF4D8D",
            marginBottom: 6,
          }}
        >
          {v.title}
        </h3>
        <p
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 15,
            color: "#7a5060",
          }}
        >
          {v.description || v.desc}
        </p>
      </div>
    </div>
  );
}
