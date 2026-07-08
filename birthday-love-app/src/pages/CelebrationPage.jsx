import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { useHiddenSecrets } from "../hooks/useHiddenSecrets";

import ParticlesBg from "../components/ui/ParticlesBg";
import Starfield3D from "../components/3d/Starfield3D";
import Toast from "../components/ui/Toast";
import Overlay from "../components/ui/Overlay";
import HiddenCounter from "../components/ui/HiddenCounter";
import EffectsLayer from "../components/ui/EffectsLayer";
import GlowingStar from "../components/ui/GlowingStar";
import ButterflyField from "../components/ui/ButterflyField";
import HintsButton from "../components/ui/HintsButton";

import HeroSection from "../components/sections/HeroSection";
import GreetingsSection from "../components/sections/GreetingsSection";
import QuotesCarousel from "../components/sections/QuotesCarousel";
import MemoryGallery from "../components/sections/MemoryGallery";
import StorySection from "../components/sections/StorySection";
import TimelineSection from "../components/sections/TimelineSection";
import SongsSection from "../components/sections/SongsSection";
import VideosSection from "../components/sections/VideosSection";
// After the VideosSection import line:
import DocumentarySection from "../components/sections/DocumentarySection";
import KavithaiSection from "../components/sections/KavithaiSection";
import GamesSection from "../components/sections/GamesSection";
import SecretWhisperSection from "../components/sections/SecretWhisperSection";
import TreasureMap from "../components/sections/TreasureMap";
import ThankYouSection from "../components/sections/ThankYouSection";
import SecretHeartHunt from "../components/hidden/SecretHeartHunt";
import SwipeUpSecret from "../components/hidden/SwipeUpSecret";
import FourCornersSecret from "../components/hidden/FourCornersSecret";
import PinchSecret from "../components/hidden/PinchSecret";

import WishesModal from "../components/modals/WishesModal";
import StoryModal from "../components/modals/StoryModal";
import KavithaiModal from "../components/modals/KavithaiModal";
import VideoModal from "../components/modals/VideoModal";
import GalleryModal from "../components/modals/GalleryModal";
import LightboxModal from "../components/modals/LightboxModal";
import HintsModal from "../components/modals/HintsModal";

import DocumentaryModal from "../components/modals/DocumentaryModal";
import {
  PuzzleWinModal,
  ColorWinModal,
  SongWinModal,
} from "../components/modals/GameWinModals";
import {
  MusicRevealModal,
  LongPressQuoteModal,
  IdleModal,
  ShakeRevealModal,
  SecretGreetModal,
  KonamiModal,
  LoveLetterModal,
  NightAngelModal,
  StarMapModal,
  ForeverNoteModal,
  SmileNoteModal,
  FourCornersModal,
  PinchRevealModal,
  ButterflyCaughtModal,
} from "../components/modals/SimpleModals";
import ProposalModal from "../components/modals/ProposalModal";
import {
  ProposalYesModal,
  ProposalWaitModal,
} from "../components/modals/ProposalResponses";
import FinalSecretModal from "../components/modals/FinalSecretModal";
import { notifyProposalAnswer } from "../utils/api";
import { HIDDEN_LIST } from "../data";
import { spawnParticles } from "../utils/effects";

function CelebrationShell() {
  const {
    overlay,
    overlayData,
    closeOverlay,
    openOverlay,
    glowingStar,
    unlock,
    toast,
    found,
  } = useApp();
  const { registerLogoTap, onRotateStart, onRotateMove, onRotateEnd } =
    useHiddenSecrets();

  const [storyIdx, setStoryIdx] = useState(overlayData || 0);
  const [kavIdx, setKavIdx] = useState(overlayData || 0);

  // keep local idx in sync when modal opens with a specific index
  React.useEffect(() => {
    if (overlay === "story") setStoryIdx(overlayData ?? 0);
  }, [overlay, overlayData]);
  React.useEffect(() => {
    if (overlay === "kavithai") setKavIdx(overlayData ?? 0);
  }, [overlay, overlayData]);

  return (
    <div
      style={{ minHeight: "100vh", position: "relative", overflowX: "hidden" }}
    >
      <Starfield3D />
      <ParticlesBg />
      <ButterflyField
        count={6}
        onCatch={(e) => {
          spawnParticles(e.clientX, e.clientY, 12, ["✨", "🦋", "💫"]);
          unlock("🦋 Caught the colour-shifting butterfly", { confetti: true });
          openOverlay("butterflycaught");
        }}
      />
      <EffectsLayer />
      <Toast msg={toast} />
      <HiddenCounter found={found} onClick={() => openOverlay("treasuremap")} />
      <HintsButton onClick={() => openOverlay("hints")} />
      {glowingStar && (
        <GlowingStar onClick={() => openOverlay("finalsecret")} />
      )}
      <SecretHeartHunt />
      <SwipeUpSecret />
      <FourCornersSecret />
      <PinchSecret />
      {/* Tiny invisible tap-zone on the page title — 5 quick taps = secret tap-code */}
      <div
        onClick={registerLogoTap}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 70,
          height: 70,
          zIndex: 850,
          WebkitTapHighlightColor: "transparent",
        }}
        aria-hidden="true"
      />
      {/* ══════════ MAIN PAGE SECTIONS ══════════ */}
      <HeroSection
        onRotateStart={onRotateStart}
        onRotateMove={onRotateMove}
        onRotateEnd={onRotateEnd}
      />
      <GreetingsSection />
      <QuotesCarousel />
      <MemoryGallery />
      <StorySection />
      <TimelineSection />
      <SongsSection />
      <VideosSection />
      <DocumentarySection />
      <KavithaiSection />
      <GamesSection />
      <SecretWhisperSection />
      <TreasureMap />
      <ThankYouSection />
      {/* ══════════ ALL OVERLAYS ══════════ */}
      <Overlay show={overlay === "wishes"} onClose={closeOverlay} maxW="600px">
        <WishesModal />
      </Overlay>
      <Overlay show={overlay === "story"} onClose={closeOverlay} maxW="680px">
        <StoryModal idx={storyIdx} setIdx={setStoryIdx} />
      </Overlay>
      <Overlay
        show={overlay === "kavithai"}
        onClose={closeOverlay}
        maxW="560px"
      >
        <KavithaiModal idx={kavIdx} setIdx={setKavIdx} />
      </Overlay>
      <Overlay show={overlay === "video"} onClose={closeOverlay} maxW="660px">
        <VideoModal idx={overlayData ?? 0} />
      </Overlay>
      <Overlay
        show={overlay === "documentary"}
        onClose={closeOverlay}
        maxW="95vw"
      >
        <DocumentaryModal
          doc={overlayData?.doc}
          version={overlayData?.version}
          onClose={closeOverlay}
          onSwitchVersion={(version) =>
            openOverlay("documentary", {
              ...overlayData,
              version,
            })
          }
        />
      </Overlay>
      <Overlay show={overlay === "gallery"} onClose={closeOverlay} maxW="560px">
        <GalleryModal onClose={closeOverlay} />
      </Overlay>
      <Overlay
        show={overlay === "lightbox"}
        onClose={closeOverlay}
        maxW="420px"
      >
        <LightboxModal
          idx={overlayData ?? 0}
          onNavigate={(i) => openOverlay("lightbox", i)}
        />
      </Overlay>
      <Overlay
        show={overlay === "musicreveal"}
        onClose={closeOverlay}
        maxW="500px"
      >
        <MusicRevealModal />
      </Overlay>
      <Overlay
        show={overlay === "longpressquote"}
        onClose={closeOverlay}
        maxW="520px"
      >
        <LongPressQuoteModal />
      </Overlay>
      <Overlay show={overlay === "idle"} onClose={closeOverlay} maxW="500px">
        <IdleModal />
      </Overlay>
      <Overlay
        show={overlay === "shakereveal"}
        onClose={closeOverlay}
        maxW="500px"
      >
        <ShakeRevealModal />
      </Overlay>
      <Overlay
        show={overlay === "secretgreet"}
        onClose={closeOverlay}
        maxW="500px"
      >
        <SecretGreetModal />
      </Overlay>
      <Overlay show={overlay === "konami"} onClose={closeOverlay} maxW="460px">
        <KonamiModal />
      </Overlay>
      <Overlay
        show={overlay === "loveletter"}
        onClose={closeOverlay}
        maxW="560px"
      >
        <LoveLetterModal />
      </Overlay>
      <Overlay
        show={overlay === "nightangel"}
        onClose={closeOverlay}
        maxW="480px"
      >
        <NightAngelModal />
      </Overlay>
      <Overlay show={overlay === "starmap"} onClose={closeOverlay} maxW="520px">
        <StarMapModal />
      </Overlay>
      <Overlay
        show={overlay === "forevernote"}
        onClose={closeOverlay}
        maxW="480px"
      >
        <ForeverNoteModal />
      </Overlay>
      <Overlay
        show={overlay === "smilenote"}
        onClose={closeOverlay}
        maxW="480px"
      >
        <SmileNoteModal />
      </Overlay>
      <Overlay
        show={overlay === "fourcorners"}
        onClose={closeOverlay}
        maxW="480px"
      >
        <FourCornersModal />
      </Overlay>
      <Overlay
        show={overlay === "pinchreveal"}
        onClose={closeOverlay}
        maxW="480px"
      >
        <PinchRevealModal />
      </Overlay>
      <Overlay
        show={overlay === "butterflycaught"}
        onClose={closeOverlay}
        maxW="480px"
      >
        <ButterflyCaughtModal />
      </Overlay>
      <Overlay show={overlay === "hints"} onClose={closeOverlay} maxW="560px">
        <HintsModal found={found} />
      </Overlay>
      <Overlay
        show={overlay === "puzzlewin"}
        onClose={closeOverlay}
        maxW="500px"
      >
        <PuzzleWinModal />
      </Overlay>
      <Overlay
        show={overlay === "colorwin"}
        onClose={closeOverlay}
        maxW="480px"
      >
        <ColorWinModal />
      </Overlay>
      <Overlay show={overlay === "songwin"} onClose={closeOverlay} maxW="480px">
        <SongWinModal />
      </Overlay>
      <Overlay
        show={overlay === "treasuremap"}
        onClose={closeOverlay}
        maxW="560px"
      >
        <TreasureMapPreview />
      </Overlay>
      <Overlay
        show={overlay === "finalsecret"}
        onClose={closeOverlay}
        maxW="520px"
      >
        <FinalSecretModal />
      </Overlay>
      {/* 💍 THE PROPOSAL — ultimate hidden secret */}
      <Overlay
        show={overlay === "proposal"}
        onClose={closeOverlay}
        maxW="700px"
      >
        <ProposalModal
          onYes={() => {
            notifyProposalAnswer("yes");
            openOverlay("proposalyes");
          }}
          onWait={() => {
            notifyProposalAnswer("wait");
            openOverlay("proposalwait");
          }}
        />
      </Overlay>
      <Overlay
        show={overlay === "proposalyes"}
        onClose={closeOverlay}
        maxW="600px"
      >
        <ProposalYesModal />
      </Overlay>
      <Overlay
        show={overlay === "proposalwait"}
        onClose={closeOverlay}
        maxW="480px"
      >
        <ProposalWaitModal />
      </Overlay>
    </div>
  );
}

function TreasureMapPreview() {
  const { found } = useApp();
  return (
    <div className="glass-pink rounded-3xl p-8 text-center">
      <h2
        style={{
          fontFamily: "'Great Vibes',cursive",
          fontSize: 36,
          color: "#FFD700",
          marginBottom: 8,
        }}
      >
        Treasure Map
      </h2>
      <p
        style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 22,
          color: "#FF4D8D",
          fontWeight: 700,
        }}
      >
        Hidden Memories Found: {found.size} / {HIDDEN_LIST.length}
      </p>
      <p
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 14,
          color: "#a09098",
          marginTop: 14,
        }}
      >
        Scroll down to the Treasure Map section to see every secret mapped out.
      </p>
    </div>
  );
}

export default function CelebrationPage() {
  return <CelebrationShell />;
}
