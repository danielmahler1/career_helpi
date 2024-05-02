interface HeroSectionProps {
  handleStartClick: () => void;
}

const HeroSection = ({ handleStartClick }: HeroSectionProps) => {
  return (
    <div className="hero-section">
      <h1 className="hero-title">Discover Your Career Path</h1>
      <p className="hero-subtitle">Take our career assessment to find careers that match your interests and skills.</p>
      <button onClick={handleStartClick} className="start-assessment-button">
        Select Your Assessment
      </button>
    </div>
  );
};

export default HeroSection;
