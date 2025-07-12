import React, { useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

const FlowBackground = () => {
  const { darkMode } = useTheme();
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null, radius: 120 });
  const requestIdRef = useRef(null);
  const timeRef = useRef(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Handle resize to make canvas full screen
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    // Initialize particles with staggered positions
    const initParticles = () => {
      const particles = [];
      // Increase density for better visibility
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 2300);
    //   const numberOfParticles = 400;
      
      // Define emergence/convergence areas
      const centerY = canvas.height * 0.5;
      const spreadY = canvas.height * 0.45;
      
      for (let i = 0; i < numberOfParticles; i++) {
        // Stagger particles across the X axis to prevent waves
        // Most start off-screen left, but some are distributed across the screen
        let x, stage;
        
        if (i < numberOfParticles * 0.5) {
          // 80% of particles start off-screen left
        //   x = -50 + (Math.random() * 50); // Staggered starts
          x = -150 + (Math.random() * 150); 
          stage = 'initial';
        } else {
          // 20% of particles are distributed across the screen
          x = Math.random() * canvas.width;
          stage = 'flowing';
        }
        
        // Random Y position near center with spread
        const startY = centerY + (Math.random() * 2 - 1) * spreadY;
        
        // Small particles but with higher opacity
        const size = Math.random() * 0.8 + 0.8;
        const speed = Math.random() * 1.5 + 1.8; // Slightly faster
        
        // // Blue color palette with higher brightness and opacity
        // const hue = 190 + Math.random() * 150; // 190-230 (blue range)
        // const saturation = 85 + Math.random() * 15; // 85-100%
        // const lightness = 65 + Math.random() * 15; // 65-80%
        // const baseColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.75)`; // Higher opacity

        const isBlue = Math.random() < 0.8;

        let hue, saturation, lightness;

        if (isBlue) {
        hue = 190 + Math.random() * 40; // Blue/light blue range (190–230)
        saturation = 85 + Math.random() * 15; // 85–100%
        lightness = 65 + Math.random() * 15; // 65–80% → light and bright
        } else {
        hue = Math.random() < 0.5 ? 0 + Math.random() * 10 : 350 + Math.random() * 10; // Red tones
        saturation = 90 + Math.random() * 10; // Very saturated reds
        lightness = 40 + Math.random() * 10; // Darker but still bright (40–50%)
        }

        const baseColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.75)`; // Higher opacity

        
        // Create 2-3 tails
        const numberOfTails = Math.floor(Math.random() * 2) + 1;
        const tails = [];
        
        for (let t = 0; t < numberOfTails; t++) {
          const hueShift = t * 5;
          // Higher opacity for better visibility
          const tailColor = `hsla(${hue + hueShift}, ${saturation}%, ${lightness}%, ${0.5 - (t * 0.15)})`;
          
          tails.push({
            offset: (t - numberOfTails/2) * 0.02, // Slightly more spread
            color: tailColor,
            history: []
          });
        }
        
        particles.push({
          x,
          y: startY,
          size,
          speed,
          tails,
          baseColor,
          stage, // Track particle lifecycle
          reset: false, // Flag for reset
          tailLength: Math.floor(speed * 125), // Longer tails for visibility
          phaseOffset: Math.random() * Math.PI * 2,

          // Varying wave properties for diverse movement
          amplitudeFactor: Math.random() * 0.3 + 0.35,
          frequencyFactor: Math.random() * 0.3 + 0.3,
          maxAmplitudeAt: 0.3 + Math.random() * 0.3,

          // Add randomness to restart position to prevent patterns
          restartVariance: Math.random() * 0.5
        });
      }
      
      particlesRef.current = particles;
    };
    
    // Animate particles
    const animate = () => {
      timeRef.current += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dark blue background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set global composite operation for glow effect
      ctx.globalCompositeOperation = 'lighter';
      
      // Update and draw particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        
        // Store previous position
        const oldX = p.x;
        const oldY = p.y;
        
        // Calculate progress through journey (0 to 1)
        const progress = Math.min(Math.max(p.x / canvas.width, 0), 1);
        
        // Calculate wave amplitude
        let amplitudeScale;
        if (progress < p.maxAmplitudeAt) {
          // Rising phase - from 0 to max
          amplitudeScale = (progress / p.maxAmplitudeAt) * 0.3;
        } else {
          // Falling phase - from max to 0
          amplitudeScale = 0.3 * (1 - ((progress - p.maxAmplitudeAt) / (1 - p.maxAmplitudeAt)));
        }
        
        // Handle different particle stages
        if (p.stage === 'initial' || p.stage === 'flowing') {
          // Normal flow from left to right
          p.x += p.speed;
          
          // Wave effect
          const waveFrequency = 0.01 * p.frequencyFactor;
          const sineValue = Math.sin((p.x * waveFrequency) + p.phaseOffset + timeRef.current);
          const verticalDisplacement = sineValue * p.amplitudeFactor * amplitudeScale * canvas.height;
          
          // Add to current Y
          p.y = canvas.height * 0.5 + verticalDisplacement;
          
          // Transition to 'resetting' when reaching the right edge
          if (p.x > canvas.width + 10) {
            p.stage = 'resetting';
            p.reset = true;
            
            // Clear history immediately
            p.tails.forEach(tail => {
              tail.history = [];
            });
            
            // Reset to left with some random position
            p.x = -100 - Math.random() * 150; // Staggered reappearance
            p.y = canvas.height * 0.5 + (Math.random() * 2 - 1) * (canvas.height * 0.35 + p.restartVariance * 20);
            
            // Give a slight delay before flowing again
            setTimeout(() => {
              p.stage = 'flowing';
              p.reset = false;
            }, Math.random() * 100);
          }
        }
        
        // Check for mouse interaction
        if (!p.reset && mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseRef.current.radius) {
            // More visible mouse interaction
            const angle = Math.atan2(dy, dx);
            const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
            p.y += Math.sin(angle) * force * 2.5;
          }
        }
        
        // Only update histories for non-resetting particles
        if (!p.reset) {
          // Update tail histories
          p.tails.forEach(tail => {
            const offsetY = oldY + (tail.offset * 10); // More noticeable offset
            tail.history.unshift({ x: oldX, y: offsetY });
            
            if (tail.history.length > p.tailLength) {
              tail.history.pop();
            }
          });
        }
        
        // Only draw if there's a history and not currently resetting
        if (!p.reset && p.tails[0].history.length > 0) {
          // Draw tails
          p.tails.forEach(tail => {
            if (tail.history.length > 1) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              
              // Draw smooth path
              let prevX = p.x;
              let prevY = p.y;
              
              for (let h = 0; h < tail.history.length; h += 1) {
                const point = tail.history[h];
                
                // Only draw if points aren't too far apart (prevents line jumping)
                const dx = Math.abs(prevX - point.x);
                const dy = Math.abs(prevY - point.y);
                
                if (dx < 50 && dy < 50) { // Distance threshold
                  ctx.lineTo(point.x, point.y);
                  prevX = point.x;
                  prevY = point.y;
                }
              }
              
              // Create gradient for tail
              if (tail.history.length > 0) {
                let lastPoint = tail.history[0];
                
                // Find the last valid point
                for (let h = 1; h < tail.history.length; h++) {
                  if (Math.abs(p.x - tail.history[h].x) < 50) {
                    lastPoint = tail.history[h];
                  } else {
                    break;
                  }
                }
                
                const gradient = ctx.createLinearGradient(p.x, p.y, lastPoint.x, lastPoint.y);
                
                gradient.addColorStop(0, tail.color);
                gradient.addColorStop(1, 'transparent');
                
                ctx.strokeStyle = gradient;
                ctx.lineWidth = p.size * 0.5; // Slightly thicker for visibility
                ctx.lineCap = 'round';
                ctx.stroke();
              }
            }
          });
          
          // Draw particle with glow
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = p.baseColor;
          ctx.fill();
          
          // Add small white core for better visibility
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.fill();
        }
      }
      
      // Reset composite operation
      ctx.globalCompositeOperation = 'source-over';
      
      requestIdRef.current = requestAnimationFrame(animate);
    };
    
    // Mouse event handlers
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };
    
    // Set up event listeners
    window.addEventListener('resize', handleResize);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Initialize canvas
    handleResize();
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(requestIdRef.current);
    };
  }, []); // Empty dependency array to run once on mount
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 transition-colors duration-300"
      style={{ opacity: 1 }}
    />
  );
};

export default FlowBackground;