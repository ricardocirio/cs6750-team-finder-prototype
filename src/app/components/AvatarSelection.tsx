'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCat } from 'react-icons/fa';
import { GiFox } from 'react-icons/gi';
import { GiBearFace } from 'react-icons/gi';

interface AvatarOption {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const avatarOptions: AvatarOption[] = [
  { id: 'calm-cat', name: 'Calm Cat', icon: <FaCat className="w-12 h-12" /> },
  { id: 'focused-fox', name: 'Focused Fox', icon: <GiFox className="w-12 h-12" /> },
  { id: 'bright-bear', name: 'Bright Bear', icon: <GiBearFace className="w-12 h-12" /> },
];

interface AvatarSelectionProps {
  onSelect: (avatar: AvatarOption) => void;
}

export default function AvatarSelection({ onSelect }: AvatarSelectionProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const handleSelect = (avatar: AvatarOption) => {
    setSelectedAvatar(avatar.id);
    onSelect(avatar);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Choose Your Mood Avatar
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {avatarOptions.map((avatar) => (
            <motion.button
              key={avatar.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(avatar)}
              className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-colors ${
                selectedAvatar === avatar.id
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
              aria-label={`Select ${avatar.name} avatar`}
            >
              {avatar.icon}
              <span className="text-sm font-medium">{avatar.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
