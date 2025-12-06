import React, { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Floating 3D Cards component with smooth parallax and stacking
 * Click anywhere to cycle through images
 */
function FloatingCards3D() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Hardcoded images
  const displayImages = [
    {
      src: 'assets/screenshots/prev1.png',
      alt: 'Dark Mode UI'
    },
    {
      src: 'assets/screenshots/prev2.png',
      alt: 'Light Mode UI'
    },
    {
      src: 'assets/screenshots/prev3.png',
      alt: 'Code Highlighting'
    }
  ];

  // Track mouse position for parallax effect
  const handleMouseMove = (e) => {
    if (!isHovering) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    
    setMousePosition({ x: x * 20, y: y * 20 }); // Smooth parallax movement
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
  };

  // Handle click - click anywhere to advance
  const handleContainerClick = () => {
    setActiveIndex((prev) => (prev + 1) % displayImages.length);
  };

  // Calculate transform for each card with proper 3D stacking
  const getCardStyle = (index) => {
    const isActive = index === activeIndex;
    const diff = (index - activeIndex + displayImages.length) % displayImages.length;
    
    // Z-index: front card highest
    let zIndex = displayImages.length - diff;
    
    // Stacking offsets - cards behind go right and down
    const offsetX = diff * 25; // Horizontal offset
    const offsetY = diff * 25; // Vertical offset
    const offsetZ = -diff * 100; // Depth offset
    
    // Scale: front card largest, behind cards smaller
    const scale = 1 - (diff * 0.05);
    
    // Parallax effect - more subtle on cards behind
    const parallaxMultiplier = 1 - (diff * 0.3);
    const parallaxX = isHovering ? mousePosition.x * parallaxMultiplier : 0;
    const parallaxY = isHovering ? mousePosition.y * parallaxMultiplier : 0;
    
    // 3D rotation for depth - only on front card when hovering
    const rotateY = isHovering && isActive ? parallaxX * 0.5 : 0;
    const rotateX = isHovering && isActive ? -parallaxY * 0.5 : 0;
    
    // Opacity: front card full, behind cards fade
    const opacity = isActive ? 1 : 0.7 - (diff * 0.15);
    
    return {
      transform: `
        translate3d(
          ${offsetX + parallaxX}px, 
          ${offsetY + parallaxY}px, 
          ${offsetZ}px
        ) 
        scale(${scale})
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `,
      zIndex,
      opacity,
    };
  };

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleContainerClick}
    >
      {/* 3D Container with perspective */}
      <div className="relative w-full h-[500px] flex items-center justify-center perspective-[1500px]">
        <div className="relative w-[550px] h-[380px] preserve-3d">
          {/* Floating Cards */}
          {displayImages.map((image, index) => {
            const style = getCardStyle(index);
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                className="absolute inset-0 transition-all duration-700 ease-out preserve-3d"
                style={{
                  transform: style.transform,
                  zIndex: style.zIndex,
                  opacity: style.opacity,
                }}
              >
                {/* Card with shadow and border */}
                <div className={cn(
                  "relative w-full h-full rounded-2xl overflow-hidden",
                  "border-2 bg-card shadow-2xl",
                  "transition-all duration-300",
                  isActive 
                    ? "border-primary/30 shadow-primary/10" 
                    : "border-border/30"
                )}>
                  {/* Actual image */}
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    draggable="false"
                  />

                  {/* Subtle gradient overlay on active card */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
                  )}

                  {/* Shine effect on hover (only active card) */}
                  {isActive && isHovering && (
                    <div 
                      className="absolute inset-0 pointer-events-none opacity-30 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(
                          circle at ${50 + mousePosition.x * 2}% ${50 + mousePosition.y * 2}%, 
                          rgba(255, 255, 255, 0.3) 0%, 
                          transparent 50%
                        )`
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}

          {/* Ambient glow - minimal */}
          <div className="absolute -inset-20 -z-20 opacity-40 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>

      {/* Elegant line indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 pointer-events-none">
        {displayImages.map((_, index) => (
          <div
            key={index}
            className={cn(
              "transition-all duration-500 rounded-full",
              index === activeIndex 
                ? "w-12 h-1 bg-primary shadow-lg shadow-primary/30" 
                : "w-8 h-1 bg-muted-foreground/20 hover:bg-muted-foreground/40"
            )}
          />
        ))}
      </div>

      {/* Click hint - only show initially */}
      {activeIndex === 0 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-40 pointer-events-none animate-bounce">
          <div className="text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50">
            Click to explore
          </div>
        </div>
      )}
    </div>
  );
}

export default FloatingCards3D;