import React, { useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

const AuroraBackground = () => {
  const canvasRef = useRef(null);
  const { darkMode } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;
    
    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Set initial size
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Aurora animation parameters
    const auroras = [];
    const numAuroras = 5;
    
    // Create initial aurora layers
    for (let i = 0; i < numAuroras; i++) {
      auroras.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height * 0.6),
        width: canvas.width * (0.3 + Math.random() * 0.5),
        height: canvas.height * (0.1 + Math.random() * 0.2),
        speed: 0.2 + Math.random() * 0.3,
        hue: darkMode ? 140 + Math.random() * 80 : 180 + Math.random() * 60,
        opacity: 0.2 + Math.random() * 0.3,
      });
    }
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.007;
      
      // Add starry background
      drawStars(ctx, canvas.width, canvas.height, time);
      
      // Draw each aurora
      auroras.forEach((aurora, index) => {
        // Move aurora
        aurora.x += aurora.speed;
        if (aurora.x > canvas.width + aurora.width / 2) {
          aurora.x = -aurora.width / 2;
          aurora.y = Math.random() * (canvas.height * 0.6);
          aurora.width = canvas.width * (0.3 + Math.random() * 0.5);
          aurora.height = canvas.height * (0.1 + Math.random() * 0.2);
          aurora.speed = 0.2 + Math.random() * 0.3;
        }
        
        // Draw aurora glow
        const gradient = ctx.createRadialGradient(
          aurora.x, aurora.y, 0,
          aurora.x, aurora.y, aurora.width / 2
        );
        
        const baseColor = darkMode ? 
          `hsla(${aurora.hue}, 100%, 70%, ${aurora.opacity})` : 
          `hsla(${aurora.hue}, 80%, 60%, ${aurora.opacity})`;
        
        gradient.addColorStop(0, baseColor);
        gradient.addColorStop(1, 'transparent');
        
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = gradient;
        
        // Create wavy shape using sin curves
        ctx.beginPath();
        const waveFrequency = 0.02;
        const waveAmplitude = 20;
        
        ctx.moveTo(aurora.x - aurora.width / 2, aurora.y);
        
        for (let x = -aurora.width / 2; x <= aurora.width / 2; x += 5) {
          const waveY = Math.sin((x + time * 100) * waveFrequency) * waveAmplitude;
          ctx.lineTo(aurora.x + x, aurora.y + waveY);
        }
        
        for (let x = aurora.width / 2; x >= -aurora.width / 2; x -= 5) {
          const waveY = Math.sin((x + time * 80) * waveFrequency * 1.5) * waveAmplitude * 0.7;
          ctx.lineTo(aurora.x + x, aurora.y + aurora.height + waveY);
        }
        
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });
      
      animationFrameId = window.requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [darkMode]);
  
  // Function to draw stars
  const drawStars = (ctx, width, height, time) => {
    // Create 200 stars
    for (let i = 0; i < 200; i++) {
      // Use deterministic positions based on index
      const x = (Math.sin(i * 3547.34) * 0.5 + 0.5) * width;
      const y = (Math.cos(i * 8123.21) * 0.5 + 0.5) * height;
      
      // Twinkle effect based on time and star position
      const twinkle = Math.sin(time * 3 + i * 0.5) * 0.5 + 0.5;
      
      const size = (0.5 + twinkle * 0.5) * (Math.random() < 0.1 ? 2 : 1);
      const opacity = 0.2 + twinkle * 0.5;
      
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  };
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ backgroundColor: darkMode ? '#040b1f' : '#051e34' }}
    />
  );
};

export default AuroraBackground;
