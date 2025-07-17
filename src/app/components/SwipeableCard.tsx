'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, HTMLMotionProps } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import type { Handler } from '@use-gesture/core/types';

import { Student } from '../types';

interface SwipeableCardProps {
  student: Student;
  onSwipe: (direction: 'left' | 'right' | 'up' | 'down', student: Student) => void;
  isActive: boolean;
}

export default function SwipeableCard({ student, onSwipe, isActive }: SwipeableCardProps) {
  const controls = useAnimation();
  const [exitX, setExitX] = useState(0);
  const [exitY, setExitY] = useState(0);

  const [isDragging, setIsDragging] = useState(false);

  const bind = useDrag(
    ({ active, movement: [x, y], last, distance, velocity }) => {
      const totalVelocity = Array.isArray(velocity) ? Math.sqrt(velocity[0] ** 2 + velocity[1] ** 2) : 0;
      
      if (active && !last) {
        controls.start({
          x,
          y,
          rotateZ: x * 0.1,
          transition: { duration: 0 }
        });
      }

      const swipeThreshold = 100;
      const velocityThreshold = 0.2;
      const shouldSwipe = Math.abs(x) > swipeThreshold || 
                         Math.abs(y) > swipeThreshold || 
                         totalVelocity > velocityThreshold;

      if (last) {
        if (shouldSwipe && !isDragging) {
          setIsDragging(true);
          const direction = Math.abs(x) > Math.abs(y)
            ? x > 0 ? 'right' : 'left'
            : y > 0 ? 'down' : 'up';

          setExitX(x);
          setExitY(y);
          onSwipe(direction as 'left' | 'right' | 'up' | 'down', student);
        } else {
          controls.start({
            x: 0,
            y: 0,
            rotateZ: 0,
            transition: { type: 'spring', stiffness: 300, damping: 20 }
          });
        }
      }
    },
    {
      enabled: isActive,
      preventScroll: true,
      filterTaps: true,
      threshold: 5,
      pointer: { touch: true, mouse: true }, // Explicitly enable both touch and mouse
      window: typeof window !== 'undefined' ? window : undefined // Ensure window is defined
    }
  );

  useEffect(() => {
    if (!isActive) {
      controls.start({ scale: 0.95, opacity: 0.5 });
    } else {
      controls.start({ scale: 1, opacity: 1 });
    }
  }, [isActive, controls]);

  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const el = ref.current;
    if (el) {
      const bindFn = bind();
      Object.entries(bindFn).forEach(([key, value]) => {
        if (typeof value === 'function') {
          el.addEventListener(key.slice(2).toLowerCase(), value as any);
        }
      });
      
      return () => {
        Object.entries(bindFn).forEach(([key, value]) => {
          if (typeof value === 'function') {
            el.removeEventListener(key.slice(2).toLowerCase(), value as any);
          }
        });
      };
    }
  }, [bind]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ scale: 1 }}
      exit={{
        x: exitX,
        y: exitY,
        opacity: 0,
        transition: { duration: 0.2 }
      }}
      className="absolute w-[300px] h-[400px] bg-white rounded-2xl shadow-xl p-6 cursor-grab active:cursor-grabbing touch-none mt-32"
      style={{
        touchAction: 'none',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
        zIndex: isActive ? 10 : 0,
        transform: isActive ? 'scale(1)' : 'scale(0.95) translateY(10px)',
        opacity: isActive ? 1 : 0.8,
        pointerEvents: isActive ? 'auto' : 'none'
      } as any}
    >
      <div className="flex flex-col h-full">
        <div className="text-2xl font-bold text-gray-900 mb-2">{student.name}</div>
        <div className="text-sm font-semibold text-blue-700 mb-4 inline-block px-3 py-1 bg-blue-50 rounded-full">
          {student.type === 'group' ? '👥 Group' : '👤 Individual'}
        </div>
        
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {student.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 bg-indigo-100 text-indigo-800 font-medium rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Work Style</h3>
          <p className="text-sm text-gray-800 leading-relaxed">{student.workStyle}</p>
        </div>
      </div>
    </motion.div>
  );
}
