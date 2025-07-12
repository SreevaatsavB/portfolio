import React, { useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

const InteractiveBackground = () => {
  const { darkMode } = useTheme();
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null, radius: 120 });
  const clusterCheckRef = useRef({ lastCheck: 0, threshold: 5000 });
  const explosionRef = useRef(null);
  const timeRef = useRef(0);
  
  // Set up and draw the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Handle resize to make canvas full screen
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    // Initialize particles with a more distributed pattern
    const initParticles = () => {
      particles = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 5500); // More particles
      
      // Create a grid to ensure particles are evenly distributed
      const gridSize = Math.sqrt(numberOfParticles);
      const cellWidth = canvas.width / gridSize;
      const cellHeight = canvas.height / gridSize;
      
      for (let i = 0; i < numberOfParticles; i++) {
        // Calculate grid position to ensure even distribution
        const gridX = i % gridSize;
        const gridY = Math.floor(i / gridSize);
        
        // Add some randomness within each grid cell
        const x = (gridX * cellWidth) + Math.random() * cellWidth;
        const y = (gridY * cellHeight) + Math.random() * cellHeight;
        
        const size = Math.random() * 2.5 + 2;
        // Add more randomness to initial directions
        const directionX = (Math.random() * 0.4 - 0.2);
        const directionY = (Math.random() * 0.4 - 0.2);
        const baseSpeed = Math.random() * 0.25 + 0.15; // Slower base speed
        
        // Darker colors for light mode, brighter for dark mode
        particles.push({
          x,
          y,
          size,
          baseSpeed,
          directionX,
          directionY,
          color: darkMode ? 
            `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.3})` : 
            `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.3})`, // White particles with opacity in light mode
          originalSize: size,
          originalSpeed: baseSpeed,
          // Add phase offset for natural motion
          phaseOffset: Math.random() * Math.PI * 2,
          // Add unique drift params
          driftX: Math.random() * 0.1 - 0.05,
          driftY: Math.random() * 0.1 - 0.05
        });
      }
      
      particlesRef.current = particles;
    };
    
    // Create localized explosion effect only affecting nearby particles
    const createLocalExplosion = (centerX, centerY) => {
      // Smaller explosion radius - only affects nearby particles
      const explosionRadius = Math.min(canvas.width, canvas.height) / 12;
      
      // Apply force to nearby particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        const dx = p.x - centerX;
        const dy = p.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Only affect particles within explosion radius
        if (distance < explosionRadius) {
          // Calculate force based on distance (stronger near center)
          const force = 1 - (distance / explosionRadius);
          const angle = Math.atan2(dy, dx);
          
          // Reduced strength for gentler effect
          const strength = force * 1.2;
          
          p.directionX += Math.cos(angle) * strength;
          p.directionY += Math.sin(angle) * strength;
          
          // Small temporary size increase
          p.size = p.originalSize * (1 + force * 0.3);
        }
      }
      
      // Set explosion animation
      explosionRef.current = {
        time: 0,
        centerX,
        centerY,
        radius: 0,
        maxRadius: explosionRadius,
      };
    };
    
    // Check if particles are too clustered and trigger gentle redistribution
    const checkClusterAndRedistribute = () => {
      const now = Date.now();
      if (now - clusterCheckRef.current.lastCheck < clusterCheckRef.current.threshold) {
        return;
      }
      
      // Calculate average distance between particles
      let totalDistance = 0;
      let count = 0;
      const sampleSize = Math.min(15, particlesRef.current.length);
      
      for (let i = 0; i < sampleSize; i++) {
        const p1 = particlesRef.current[Math.floor(Math.random() * particlesRef.current.length)];
        
        for (let j = 0; j < sampleSize; j++) {
          if (i !== j) {
            const p2 = particlesRef.current[Math.floor(Math.random() * particlesRef.current.length)];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            totalDistance += distance;
            count++;
          }
        }
      }
      
      const avgDistance = totalDistance / count;
      const threshold = Math.min(canvas.width, canvas.height) / 16;
      
      // Very low probability of automatic explosions (0.3%)
      if (avgDistance < threshold && Math.random() < 0.003) {
        // Create gentle redistribution rather than a big explosion
        const centerX = canvas.width / 2 + (Math.random() * 200 - 100);
        const centerY = canvas.height / 2 + (Math.random() * 200 - 100);
        createLocalExplosion(centerX, centerY);
      }
      
      clusterCheckRef.current.lastCheck = now;
    };
    
    // Animation function
    const animate = () => {
      timeRef.current += 0.005; // Global time ticker for smooth movement
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background - HERE'S THE COLOR CHANGE
      
    //   #0b3b7a
    // #062957
      ctx.fillStyle = darkMode ? '#0f172a' : '#08346e'; // Deep sea blue (#0c4a6e) in light mode
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Occasional check for clustering
      checkClusterAndRedistribute();
      
      // Draw explosion effect if active
      if (explosionRef.current) {
        const explosion = explosionRef.current;
        explosion.time += 1;
        explosion.radius = (explosion.time / 15) * explosion.maxRadius;
        
        // Draw subtle explosion ring
        ctx.beginPath();
        ctx.arc(explosion.centerX, explosion.centerY, explosion.radius, 0, Math.PI * 2);
        ctx.strokeStyle = darkMode ? 
          `rgba(255, 255, 255, ${0.2 * (1 - explosion.time / 40)})` : 
          `rgba(255, 255, 255, ${0.3 * (1 - explosion.time / 40)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
        
        // End explosion effect sooner
        if (explosion.time > 40) {
          explosionRef.current = null;
        }
      }
      
      // Update and draw particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        let p = particlesRef.current[i];
        
        // Add natural drift movement using sine/cosine
        const driftFactor = 0.15;
        p.directionX += Math.sin(timeRef.current + p.phaseOffset) * p.driftX * driftFactor;
        p.directionY += Math.cos(timeRef.current + p.phaseOffset * 1.3) * p.driftY * driftFactor;
        
        // Check for mouse interaction with VERY gentle effect
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseRef.current.radius) {
            // Create extremely gentle repulsion effect (practically minimal)
            const angle = Math.atan2(dy, dx);
            const force = Math.pow((mouseRef.current.radius - distance) / mouseRef.current.radius, 1.2) * 0.15; // Extremely minimal force
            p.directionX += Math.cos(angle) * force;
            p.directionY += Math.sin(angle) * force;
            
            // Barely perceptible size change
            p.size = p.originalSize * (1 + force * 0.1);
          }
        }
        
        // Update position
        p.x += p.directionX * p.baseSpeed;
        p.y += p.directionY * p.baseSpeed;
        
        // Gradually return size to original value
        p.size = p.size * 0.95 + p.originalSize * 0.05;
        
        // Add very slight randomization to movement for natural feel
        if (Math.random() < 0.03) {
          p.directionX += (Math.random() * 0.02 - 0.01);
          p.directionY += (Math.random() * 0.02 - 0.01);
        }
        
        // Very gentle dampening to allow more drift
        p.directionX *= 0.992; 
        p.directionY *= 0.992;
        
        // Wrap around edges with a small buffer to prevent edge clustering
        const buffer = 20;
        if (p.x < -buffer) p.x = canvas.width + buffer;
        if (p.x > canvas.width + buffer) p.x = -buffer;
        if (p.y < -buffer) p.y = canvas.height + buffer;
        if (p.y > canvas.height + buffer) p.y = -buffer;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Connect nearby particles with lines - increased connection distance
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Connection distance and opacity adjusted - increased distance for more connections
          const maxDistance = 200;
          if (distance < maxDistance) {
            ctx.beginPath();
            // Light connection lines for deep sea blue in light mode
            ctx.strokeStyle = darkMode ? 
              `rgba(255, 255, 255, ${0.15 * (1 - distance / maxDistance)})` : 
              `rgba(255, 255, 255, ${0.4 * (1 - distance / maxDistance)})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Mouse event handlers
    const handleMouseMove = (e) => {
      // Update mouse position
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };
    
    const handleClick = (e) => {
      // Create localized explosion at click position
      createLocalExplosion(e.clientX, e.clientY);
    };
    
    // Set up event listeners on the document instead of just the canvas
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);
    
    // Initialize canvas
    handleResize();
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 transition-colors duration-300"
      style={{ opacity: 0.9 }}
    />
  );
};

export default InteractiveBackground;