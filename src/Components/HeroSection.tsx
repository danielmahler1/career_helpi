// HeroSection.tsx
import React from "react";
import GradientShadowButton from "./GradientShadowButton";

interface HeroSectionProps {
  handleStartClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ handleStartClick }) => {
  return (
    <div className="hero-section">
      <h1 className="hero-title">Discover Your Career Path</h1>
      <p className="hero-subtitle">Take our career assessment to find careers that match your interests and skills.</p>
      <GradientShadowButton onClick={handleStartClick} buttonText="Select Your Assessment" />
    </div>
  );
};

export default HeroSection;
