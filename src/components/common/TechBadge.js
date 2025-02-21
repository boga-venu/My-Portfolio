'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Code, Database, Layout, Zap, Terminal, Server, Cpu } from 'lucide-react'

const TechBadge = ({ technology, colorScheme = 'blue', animate = true, size = 'md' }) => {
  // Map technology categories to icons
  const getTechIcon = (tech) => {
    const techLower = tech.toLowerCase();
    
    if (techLower.includes('react') || techLower.includes('vue') || techLower.includes('angular')) {
      return Layout;
    } else if (techLower.includes('node') || techLower.includes('express') || techLower.includes('api')) {
      return Server;
    } else if (techLower.includes('mongo') || techLower.includes('sql') || techLower.includes('database')) {
      return Database;
    } else if (techLower.includes('docker') || techLower.includes('git') || techLower.includes('aws')) {
      return Terminal;
    } else if (techLower.includes('motion') || techLower.includes('animation')) {
      return Zap;
    } else if (techLower.includes('tailwind') || techLower.includes('css') || techLower.includes('ui')) {
      return Layout;
    } else if (techLower.includes('architecture') || techLower.includes('system')) {
      return Cpu;
    }
    
    return Code;
  };
  
  // Configuration for different color schemes
  const colorSchemes = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      hover: 'group-hover:bg-blue-100',
      iconBg: 'bg-blue-100',
    },
    indigo: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-600',
      hover: 'group-hover:bg-indigo-100',
      iconBg: 'bg-indigo-100',
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      hover: 'group-hover:bg-emerald-100',
      iconBg: 'bg-emerald-100',
    },
    violet: {
      bg: 'bg-violet-50',
      text: 'text-violet-600',
      hover: 'group-hover:bg-violet-100',
      iconBg: 'bg-violet-100',
    },
    gray: {
      bg: 'bg-gray-100',
      text: 'text-gray-600',
      hover: 'group-hover:bg-gray-200',
      iconBg: 'bg-gray-200',
    },
  };
  
  // Configuration for different sizes
  const sizes = {
    sm: {
      pill: 'px-2 py-0.5 text-xs',
      icon: 'w-3 h-3',
      gap: 'gap-1',
    },
    md: {
      pill: 'px-3 py-1 text-sm',
      icon: 'w-4 h-4',
      gap: 'gap-1.5',
    },
    lg: {
      pill: 'px-4 py-1.5 text-base',
      icon: 'w-5 h-5',
      gap: 'gap-2',
    },
  };
  
  const colors = colorSchemes[colorScheme] || colorSchemes.blue;
  const sizeConfig = sizes[size] || sizes.md;
  const Icon = getTechIcon(technology);
  
  const Component = animate ? motion.div : 'div';
  const animationProps = animate ? {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { type: 'spring', stiffness: 200, damping: 15 },
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  } : {};
  
  return (
    <Component
      className={`inline-flex items-center ${sizeConfig.gap} ${sizeConfig.pill} rounded-full ${colors.bg} ${colors.text} ${colors.hover} transition-colors group`}
      {...animationProps}
    >
      <div className={`${colors.iconBg} rounded-full p-0.5 flex items-center justify-center`}>
        <Icon className={sizeConfig.icon} />
      </div>
      <span>{technology}</span>
    </Component>
  );
};

export default TechBadge;