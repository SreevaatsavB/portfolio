import React, { useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

const NeuralNetworkBackground = () => {
  const { darkMode } = useTheme();
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let nodes = [];
    let connections = [];
    let signals = [];
    let animationPhase = 'forward'; // 'forward' or 'backward'
    let lastPhaseChange = 0;
    let phaseInterval = 6000; // ms between phase changes
    
    // Canvas setup
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setupNetwork();
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    function setupNetwork() {
      nodes = [];
      connections = [];
      signals = [];
      
      // Create a neural network with layers - expanded to fill the entire screen
      const numLayers = 6; // Increased from 5 to 7 layers
      const layerWidth = canvas.width / (numLayers + 0.5); // Better horizontal spread
      
      // Create nodes in each layer - more nodes to fill the screen better
      for (let layer = 0; layer < numLayers; layer++) {
        // More nodes in edge layers to fill left and right sides
        const nodesInLayer = layer === 0 || layer === numLayers - 1 ? 9 : 8;
        
        // Distribute layers evenly, with first and last layers closer to edges
        const layerX = layer === 0 ? 
                       canvas.width * 0.05 : // First layer very close to left edge
                       layer === numLayers - 1 ? 
                       canvas.width * 0.95 : // Last layer very close to right edge
                       layerWidth * (layer + 0.5); // Regular distribution for middle layers
        
        for (let i = 0; i < nodesInLayer; i++) {
          const spacing = canvas.height / (nodesInLayer + 1);
          const nodeY = spacing * (i + 1);
          
          nodes.push({
            x: layerX,
            y: nodeY,
            radius: 7 + Math.random() * 3, // Bigger nodes
            layer: layer,
            pulsePhase: Math.random() * Math.PI * 2,
            connections: []
          });
        }
      }
      
      // Create selective connections (not fully connected)
      for (let layer = 0; layer < numLayers - 1; layer++) {
        const sourceNodes = nodes.filter(node => node.layer === layer);
        const targetNodes = nodes.filter(node => node.layer === layer + 1);
        
        for (const source of sourceNodes) {
          // Connect to 2-3 random nodes in the next layer
          const numConnections = Math.floor(Math.random() * 2) + 2;
          const shuffledTargets = [...targetNodes].sort(() => Math.random() - 0.5);
          
          for (let i = 0; i < Math.min(numConnections, targetNodes.length); i++) {
            const target = shuffledTargets[i];
            
            // Create connection with random opacity (reduced glow)
            const connection = {
              source: source,
              target: target,
              opacity: 0.05 + Math.random() * 0.15, // Lower opacity for less glow
              active: false,
              width: 0.2 + Math.random() * 0.6 // Slightly thinner lines
            };
            
            connections.push(connection);
            source.connections.push(connection);
          }
        }
      }
    }
    
    function startForwardPass() {
      animationPhase = 'forward';
      
      // Clear existing signals
      signals = [];
      
      // Start from the input layer
      const inputNodes = nodes.filter(node => node.layer === 0);
      
      // Stagger signal creation slightly
      inputNodes.forEach((node, index) => {
        setTimeout(() => {
          node.connections.forEach(conn => {
            createSignal(conn, 'forward');
          });
        }, index * 200);
      });
      
      lastPhaseChange = Date.now();
    }
    
    function startBackwardPass() {
      animationPhase = 'backward';
      
      // Clear existing signals
      signals = [];
      
      // Start from the output layer
      const outputLayer = Math.max(...nodes.map(n => n.layer));
      const outputNodes = nodes.filter(node => node.layer === outputLayer);
      
      // Find connections going to output nodes
      const outputConnections = connections.filter(c => 
        outputNodes.includes(c.target)
      );
      
      // Group by target node for staggered effect
      const grouped = {};
      outputConnections.forEach(conn => {
        const targetId = outputNodes.indexOf(conn.target);
        if (!grouped[targetId]) grouped[targetId] = [];
        grouped[targetId].push(conn);
      });
      
      // Start signals from each output node with delays
      Object.keys(grouped).forEach((nodeIndex, i) => {
        setTimeout(() => {
          grouped[nodeIndex].forEach(conn => {
            createSignal(conn, 'backward');
          });
        }, i * 200);
      });
      
      lastPhaseChange = Date.now();
    }
    
    function createSignal(connection, direction) {
      // Don't create a signal if one already exists on this connection
      if (signals.some(s => s.connection === connection && s.direction === direction)) {
        return;
      }
      
      connection.active = true;
      
      // Create signal with duller gradient colors
      const signal = {
        connection: connection,
        direction: direction,
        progress: direction === 'forward' ? 0 : 1,
        speed: 0.003 + Math.random() * 0.002,
        size: 1 + Math.random() * 1.5,
        tail: [],
        tailLength: 40 + Math.floor(Math.random() * 30), // Long tails
        color: direction === 'forward' ? 
          'rgba(48, 141, 241, 0.94)' : // Duller blue for forward
          'rgba(3, 159, 99, 0.5)'    // Duller green for backward
      };
      
      signals.push(signal);
    }
    
    function propagateSignal(signal) {
      // When a signal reaches its destination, create new signals for the next layer
      const { connection, direction } = signal;
      
      if (direction === 'forward') {
        // Get connections from the target node to the next layer
        const targetNode = connection.target;
        targetNode.pulse = 1; // Visual pulse effect
        
        const nextConnections = targetNode.connections;
        
        // Send signals along some of these connections
        if (nextConnections.length > 0) {
          nextConnections.forEach((conn, i) => {
            // Stagger the creation of new signals
            setTimeout(() => {
              createSignal(conn, 'forward');
            }, i * 50 + Math.random() * 100);
          });
        }
      } else {
        // Backward pass - get connections coming into the source node
        const sourceNode = connection.source;
        sourceNode.pulse = 1; // Visual pulse effect
        
        // Find connections going to this source node
        const prevConnections = connections.filter(c => 
          c.target === sourceNode && c.source.layer < sourceNode.layer
        );
        
        // Send signals along some of these connections
        if (prevConnections.length > 0) {
          prevConnections.forEach((conn, i) => {
            // Stagger the creation of new signals
            setTimeout(() => {
              createSignal(conn, 'backward');
            }, i * 50 + Math.random() * 100);
          });
        }
      }
    }
    
    function animate() {
      // Clear canvas with higher transparency for better trail effect
      ctx.fillStyle = darkMode ? 'rgba(10, 10, 20, 0.2)' : 'rgba(255, 255, 255, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Check if we need to change phases
      const now = Date.now();
      if (now - lastPhaseChange > phaseInterval && signals.length === 0) {
        // Only toggle phases when we've been running for a while
        // This prevents backward pass from starting too early
        if (now - lastPhaseChange > phaseInterval * 1.5) {
          if (animationPhase === 'forward') {
            startBackwardPass();
          } else {
            startForwardPass();
          }
        } else if (animationPhase === 'forward') {
          // If we're in forward phase and signals are done, just start another forward pass
          startForwardPass();
        }
      }
      
      // Draw connections
      for (const connection of connections) {
        const { source, target, opacity, active, width } = connection;
        
        // Draw connection line
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        
        // Base connection style (less glowy)
        const baseOpacity = active ? opacity * 1.5 : opacity;
        ctx.strokeStyle = darkMode ? 
          `rgba(100, 120, 255, ${baseOpacity})` : 
          `rgba(50, 50, 100, ${baseOpacity})`;
        ctx.lineWidth = width;
        ctx.stroke();
      }
      
      // Update and draw signals
      const remainingSignals = [];
      
      for (const signal of signals) {
        // Update signal position
        if (signal.direction === 'forward') {
          signal.progress += signal.speed;
          if (signal.progress >= 1) {
            signal.connection.active = false;
            propagateSignal(signal);
            continue; // Signal completed
          }
        } else {
          // Backward pass moves from 1 to 0
          signal.progress -= signal.speed;
          if (signal.progress <= 0) {
            signal.connection.active = false;
            propagateSignal(signal);
            continue; // Signal completed
          }
        }
        
        // Calculate current position
        const { source, target } = signal.connection;
        const x = source.x + (target.x - source.x) * signal.progress;
        const y = source.y + (target.y - source.y) * signal.progress;
        
        // Add to signal tail
        signal.tail.unshift({ x, y });
        if (signal.tail.length > signal.tailLength) {
          signal.tail.pop();
        }
        
        // Draw tail if we have enough points
        if (signal.tail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(signal.tail[0].x, signal.tail[0].y);
          
          for (let i = 1; i < signal.tail.length; i++) {
            ctx.lineTo(signal.tail[i].x, signal.tail[i].y);
          }
          
          // Create gradient for tail
          const gradient = ctx.createLinearGradient(
            signal.tail[0].x, signal.tail[0].y,
            signal.tail[signal.tail.length - 1].x, signal.tail[signal.tail.length - 1].y
          );
          
          // Fade from full color to transparent
          gradient.addColorStop(0, signal.color);
          gradient.addColorStop(1, 'transparent');
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = signal.size;
          ctx.lineCap = 'round';
          ctx.stroke();
        }
        
        // Draw signal head
        ctx.beginPath();
        ctx.arc(x, y, signal.size, 0, Math.PI * 2);
        ctx.fillStyle = signal.color;
        ctx.fill();
        
        // Keep this signal for next frame
        remainingSignals.push(signal);
      }
      
      signals = remainingSignals;
      
      // Draw nodes with duller glow
      for (const node of nodes) {
        // Node pulsing effect
        if (node.pulse > 0) {
          node.pulse -= 0.05;
        }
        
        const baseRadius = node.radius;
        const pulse = Math.sin(Date.now() * 0.003 + node.pulsePhase) * 0.2 + 0.8;
        const extraPulse = node.pulse ? node.pulse * 3 : 0;
        const displayRadius = baseRadius * (pulse + extraPulse);
        
        // Draw node glow (duller)
        ctx.beginPath();
        ctx.arc(node.x, node.y, displayRadius * 2, 0, Math.PI * 2);
        
        const glowColor = node.layer === 0 ? 
          'rgba(130, 87, 230, 0.3)' : // Duller purple for input layer
          node.layer === Math.max(...nodes.map(n => n.layer)) ?
            'rgba(0, 180, 180, 0.3)' : // Duller teal for output layer
            'rgba(64, 156, 255, 0.3)'; // Duller blue for hidden layers
            
        const glowGradient = ctx.createRadialGradient(
          node.x, node.y, displayRadius * 0.5,
          node.x, node.y, displayRadius * 2
        );
        
        glowGradient.addColorStop(0, glowColor);
        glowGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = glowGradient;
        ctx.fill();
        
        // Node body with reduced opacity
        ctx.beginPath();
        ctx.arc(node.x, node.y, displayRadius, 0, Math.PI * 2);
        ctx.fillStyle = darkMode ? 
          `rgba(30, 40, 80, ${0.7 + node.pulse * 0.2})` : 
          `rgba(0, 0, 0, ${0.6 + node.pulse * 0.2})`;
        ctx.fill();
        
        // Node core with reduced opacity
        ctx.beginPath();
        ctx.arc(node.x, node.y, displayRadius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = darkMode ? 
          `rgba(100, 150, 255, 0.8)` : 
          `rgba(0, 0, 0, 0.8)`;
        ctx.fill();
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    }
    
    // ONLY start with forward pass, never backward at initialization
    animationPhase = 'forward'; // Ensure we're in forward phase
    signals = []; // Ensure no signals exist initially
    lastPhaseChange = Date.now(); // Reset timer
    
    // Initial forward pass with delay
    setTimeout(startForwardPass, 1000);
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [darkMode]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 transition-colors duration-300"
      style={{ opacity: 1, background: darkMode ? 'rgba(5, 5, 15, 1)' : 'rgba(255, 255, 255, 1)' }}
    />
  );
};

export default NeuralNetworkBackground;