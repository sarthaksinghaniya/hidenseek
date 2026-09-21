import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import HeaderNav from './components/HeaderNav';
import OpeningScreen from './components/OpeningScreen';
import HideSeekIntro from './components/HideSeekIntro';
import RoomDiscovery from './components/RoomDiscovery';
import SeekMap from './components/SeekMap';
import SuspicionCheck from './components/SuspicionCheck';
import HandHoldingSection from './components/HandHoldingSection';
import IllFindYouSection from './components/IllFindYouSection';
import FinalClueSection from './components/FinalClueSection';
import IndirectRevealLetter from './components/IndirectRevealLetter';
import EasterEggModal from './components/EasterEggModal';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [discoveredClues, setDiscoveredClues] = useState([]);
  const [easterEggOpen, setEasterEggOpen] = useState(false);

  // Scroll to top on step transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleClueFound = (clueId) => {
    if (!discoveredClues.includes(clueId)) {
      setDiscoveredClues((prev) => [...prev, clueId]);
    }
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Dynamic Background Petals & Dust Particles */}
      <ParticleBackground />

      {/* Top Navigation & Status Bar (Show from Step 2 onwards) */}
      {currentStep > 1 && (
        <HeaderNav 
          clueCount={discoveredClues.length}
          maxClues={5}
          onTriggerEasterEgg={() => setEasterEggOpen(true)}
        />
      )}

      {/* Main Flow Steps */}
      <main style={{ minHeight: '100vh' }}>
        {currentStep === 1 && (
          <OpeningScreen onStart={() => setCurrentStep(2)} />
        )}

        {currentStep === 2 && (
          <HideSeekIntro onReady={() => setCurrentStep(3)} />
        )}

        {currentStep === 3 && (
          <RoomDiscovery 
            discoveredClues={discoveredClues}
            onClueFound={handleClueFound}
            onProceedToMap={() => setCurrentStep(4)}
          />
        )}

        {currentStep === 4 && (
          <SeekMap 
            discoveredClues={discoveredClues}
            onClueFound={handleClueFound}
            onProceedToSuspicion={() => setCurrentStep(5)}
          />
        )}

        {currentStep === 5 && (
          <SuspicionCheck onNext={() => setCurrentStep(6)} />
        )}

        {currentStep === 6 && (
          <HandHoldingSection onNext={() => setCurrentStep(7)} />
        )}

        {currentStep === 7 && (
          <IllFindYouSection onNext={() => setCurrentStep(8)} />
        )}

        {currentStep === 8 && (
          <FinalClueSection 
            onClueFound={handleClueFound}
            onProceedToLetter={() => setCurrentStep(9)}
          />
        )}

        {currentStep === 9 && (
          <IndirectRevealLetter />
        )}
      </main>

      {/* Secret Easter Egg Modal */}
      <EasterEggModal 
        isOpen={easterEggOpen}
        onClose={() => setEasterEggOpen(false)}
      />
    </div>
  );
}
