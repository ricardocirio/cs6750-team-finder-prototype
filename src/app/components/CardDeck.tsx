'use client';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SwipeableCard from './SwipeableCard';
import { toast } from 'react-hot-toast';

import { Student } from '../types';

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    type: 'individual',
    skills: ['UI/UX Design', 'React', 'User Research'],
    workStyle: 'Detail-oriented, collaborative, and user-focused'
  },
  {
    id: '2',
    name: 'Project Innovators',
    type: 'group',
    skills: ['Node.js', 'MongoDB', 'Agile'],
    workStyle: 'Fast-paced team that loves innovation'
  },
  {
    id: '3',
    name: 'Marcus Rodriguez',
    type: 'individual',
    skills: ['Python', 'Data Analysis', 'Machine Learning'],
    workStyle: 'Methodical problem-solver with research background'
  },
  {
    id: '4',
    name: 'Web Warriors',
    type: 'group',
    skills: ['Full-stack Development', 'DevOps', 'UI Design'],
    workStyle: 'Remote-first team with flexible hours'
  },
  {
    id: '5',
    name: 'Emily Taylor',
    type: 'individual',
    skills: ['Project Management', 'Scrum', 'Technical Writing'],
    workStyle: 'Organized and deadline-driven'
  },
  {
    id: '6',
    name: 'Alex Kim',
    type: 'individual',
    skills: ['Mobile Development', 'Flutter', 'UX Research'],
    workStyle: 'Creative thinker with startup experience'
  }
];

export default function CardDeck() {
  const [cards, setCards] = useState(mockStudents);
  const [swipeCount, setSwipeCount] = useState(0);
  const [savedCards, setSavedCards] = useState<Student[]>([]);
  const [showSkillPrompt, setShowSkillPrompt] = useState(false);
  const [showPartners, setShowPartners] = useState(false);

  const handleSwipe = (direction: 'left' | 'right' | 'up' | 'down', student: Student) => {
    setCards((prev) => prev.filter((s) => s.id !== student.id));
    setSwipeCount((prev) => prev + 1);

    switch (direction) {
      case 'right':
        setSavedCards((prev) => [...prev, student]);
        toast(() => (
          <div className="flex items-center gap-2">
            <span className="text-green-600">✨ Added {student.name} to Possible Partners</span>
          </div>
        ), { 
          duration: 2000,
          style: {
            background: '#f0fdf4',
            border: '1px solid #86efac',
            color: '#166534'
          }
        });
        break;
      case 'left':
        toast.error(`Passed on ${student.name}`);
        break;
      case 'up':
        toast.success(`Opening details for ${student.name}...`);
        break;
      case 'down':
        toast.success(`Finding matches similar to ${student.name}...`);
        break;
    }

    // Check if we need to show the skill prompt
    if ((swipeCount + 1) % 5 === 0) {
      setShowSkillPrompt(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      {!showPartners ? (
        <>
          <div className="relative w-[300px] mx-auto">
            <AnimatePresence>
              {cards.slice(0, 2).map((student, index) => (
                <SwipeableCard
                  key={student.id}
                  student={student}
                  onSwipe={handleSwipe}
                  isActive={index === 0}
                />
              ))}
              {cards.length === 0 && (
                <div className="w-[300px] h-[400px] bg-gray-100 rounded-2xl shadow-lg flex items-center justify-center p-6 text-center">
                  <div>
                    <p className="text-xl font-bold text-gray-800 mb-2">No More Cards</p>
                    <p className="text-gray-600">Come back tomorrow for fresh matches!</p>
                  </div>
                </div>
              )}
            </AnimatePresence>
            {showSkillPrompt && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg max-w-sm">
                  <h3 className="text-xl text-gray-600">Still searching?</h3>
                  <p className="text-gray-600">Which skill matters most right now?</p>
                  <div className="text-gray-600 space-y-2">
                    {['UI/UX Design', 'Backend Development', 'Project Management'].map((skill) => (
                      <button
                        key={skill}
                        onClick={() => {
                          toast.success(`Prioritizing ${skill}`);
                          setShowSkillPrompt(false);
                        }}
                        className="w-full p-2 text-left hover:bg-blue-50 rounded transition"
                      >
                        {skill}
                      </button>
                    ))}
                    <button
                      onClick={() => setShowSkillPrompt(false)}
                      className="w-full p-2 text-gray-500 text-center hover:bg-gray-50 rounded transition"
                    >
                      Skip
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Saved partners button */}
          <button
            onClick={() => setShowPartners(true)}
            className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
          >
            Possible Partners ({savedCards.length})
          </button>
        </>
      ) : (
        <div className="min-h-screen p-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setShowPartners(false)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Cards
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Possible Partners</h1>
            </div>

            <div className="space-y-4">
              {savedCards.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">No partners saved yet.</p>
                  <p className="text-gray-500 text-sm mt-2">Swipe right on cards to save potential partners.</p>
                </div>
              ) : (
                savedCards.map((partner) => (
                  <div
                    key={partner.id}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{partner.name}</h3>
                        <span className="inline-block px-3 py-1 mt-1 text-sm font-medium bg-blue-50 text-blue-700 rounded-full">
                          {partner.type === 'group' ? '👥 Group' : '👤 Individual'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toast.success(`Opening chat with ${partner.name}...`)}
                          className="text-blue-600 hover:text-blue-700 px-3 py-1 rounded-full border border-blue-600 hover:border-blue-700 transition-colors"
                        >
                          Chat
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {partner.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm">{partner.workStyle}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
