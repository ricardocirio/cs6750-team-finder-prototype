'use client';

import { Toaster } from "react-hot-toast";
import { useState } from "react";
import AvatarSelection from "./components/AvatarSelection";
import CardDeck from "./components/CardDeck";

import { Avatar } from './types';

export default function Home() {
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);

  const handleAvatarSelect = (avatar: Avatar) => {
    setSelectedAvatar(avatar);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 relative">
      <Toaster position="top-center" />
      {!selectedAvatar ? (
        <AvatarSelection onSelect={handleAvatarSelect} />
      ) : (
        <>
          <div className="absolute top-8 left-8 z-50 flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-md">
            <div className="text-2xl">{selectedAvatar.icon}</div>
            <span className="text-sm font-medium">{selectedAvatar.name}</span>
          </div>
          <div className="min-h-screen flex items-center justify-center pt-20 pb-20">
            <CardDeck />
          </div>
        </>
      )}
    </div>
  );
}
