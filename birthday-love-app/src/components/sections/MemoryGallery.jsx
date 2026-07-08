import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useMemoryGallery } from "../../hooks/useContent";
import { useApp } from "../../context/AppContext";
import { spawnParticles } from "../../utils/effects";
import { normaliseCloudinaryImageUrl } from "../../utils/cloudinaryUtils";
import Section from "../ui/Section";

const PAGE_SIZE = 12;

function PhotoCard({ mem, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index, 8) * 0.04 }}
      whileHover={{ scale: 1.04, y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="rounded-xl overflow-hidden cursor-pointer relative group"
      style={{
        aspectRatio: "3/4",
        background: mem.grad || "linear-gradient(135deg,#1a0530,#30050f)",
        boxShadow: "0 4px 18px rgba(0,0,0,.25)",
      }}
    >
      {mem.photoUrl ? (
        <img
          src={normaliseCloudinaryImageUrl(mem.photoUrl, 800)}
          alt={mem.label}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-1">
          <span className="text-2xl">🌸</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 8,
              color: "rgba(255,255,255,.4)",
            }}
          >
            {mem.year}
          </span>
        </div>
      )}
      {/* Caption overlay on hover */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,.75), transparent 60%)",
        }}
      >
        <p
          style={{
            fontFamily: "'Great Vibes',cursive",
            fontSize: 14,
            color: "#fff",
            textAlign: "center",
          }}
        >
          {mem.label}
        </p>
      </div>
    </motion.div>
  );
}

export default function MemoryGallery() {
  const { openOverlay } = useApp();
  const gallery = useMemoryGallery();
  const [yearFilter, setYearFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const years = useMemo(() => {
    return [...new Set(gallery.map((m) => m.year))].filter(Boolean).sort();
  }, [gallery]);

  const filtered = useMemo(() => {
    if (yearFilter === "all") return gallery;
    return gallery.filter((m) => m.year === yearFilter);
  }, [gallery, yearFilter]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function handleFilterChange(year) {
    setYearFilter(year);
    setVisibleCount(PAGE_SIZE);
  }

  function openPhoto(mem, indexInFull) {
    openOverlay("lightbox", indexInFull);
  }

  return (
    <Section
      eyebrow={`// MEMORY GALLERY — ${gallery.length} PHOTOS`}
      title="Polaroid Memories 📸"
      id="gallery"
    >
      {/* Year filter tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <FilterTab
          label="All"
          active={yearFilter === "all"}
          onClick={() => handleFilterChange("all")}
        />
        {years.map((y) => (
          <FilterTab
            key={y}
            label={y}
            active={yearFilter === y}
            onClick={() => handleFilterChange(y)}
          />
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {visible.map((mem, i) => {
          const fullIndex = gallery.findIndex(
            (m) => (m.id || m.label) === (mem.id || mem.label),
          );
          return (
            <PhotoCard
              key={mem.id || i}
              mem={mem}
              index={i}
              onClick={(e) => {
                spawnParticles(e.clientX, e.clientY, 8);
                openPhoto(mem, fullIndex);
              }}
            />
          );
        })}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="px-6 py-3 rounded-full text-sm"
            style={{
              background: "rgba(255,77,141,.12)",
              border: "1px solid rgba(255,77,141,.3)",
              color: "#FF4D8D",
              fontFamily: "'Cormorant Garamond',serif",
            }}
          >
            Load more memories ({filtered.length - visibleCount} left) ↓
          </motion.button>
        </div>
      )}

      {filtered.length === 0 && (
        <p
          style={{
            textAlign: "center",
            fontFamily: "'Cormorant Garamond',serif",
            color: "#7a5060",
            fontStyle: "italic",
          }}
        >
          No photos for this year yet.
        </p>
      )}
    </Section>
  );
}

function FilterTab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-1.5 rounded-full text-sm transition-all"
      style={{
        background: active
          ? "linear-gradient(135deg,#FF4D8D,#A855F7)"
          : "rgba(255,255,255,.05)",
        color: active ? "#fff" : "#a09098",
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: 11,
      }}
    >
      {label}
    </button>
  );
}
