import React, { useState, useEffect } from 'react';
import { 
  Gift, Lock, X, Heart, Star, Image as ImageIcon, 
  Calendar, Clock, Camera, Home, ChevronLeft, MapPin,
  Youtube, ExternalLink, PlayCircle, KeyRound, Sparkles,
  ListTodo, CheckCircle2, Circle
} from 'lucide-react';

import { calendarData, timelineData, galleryImages, videoData, initialBucketList, affirmations, globalData } from './data';


// --- SHARED COMPONENTS ---

const Snowflakes = ({ className = "fixed inset-0" }) => {
  const flakes = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 5 + 5}s`,
    animationDelay: `${Math.random() * 5}s`,
    opacity: Math.random() * 0.7 + 0.3,
  }));

  return (
    <div className={`${className} pointer-events-none z-0 overflow-hidden`} aria-hidden="true">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute top-0 text-white select-none animate-fall"
          style={{
            left: flake.left,
            animationDuration: flake.animationDuration,
            animationDelay: flake.animationDelay,
            opacity: flake.opacity,
            fontSize: `${Math.random() * 10 + 10}px`,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
};

const FloatingHearts = () => {
  const hearts = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 15 + 10}s`, // Very slow rise
    animationDelay: `${Math.random() * 10}s`,
    opacity: Math.random() * 0.8 + 0.05, // Very subtle
    size: Math.random() * 20 + 10,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute -bottom-10 text-red-500 fill-current animate-floatUp"
          style={{
            left: h.left,
            animationDuration: h.animationDuration,
            animationDelay: h.animationDelay,
            opacity: h.opacity,
            width: `${h.size}px`,
            height: `${h.size}px`,
          }}
        >
          <Heart className="w-full h-full fill-red-500/50" />
        </div>
      ))}
    </div>
  );
};

const BackButton = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors group"
  >
    <div className="p-2 rounded-full bg-slate-800 group-hover:bg-slate-700 transition-colors">
      <ChevronLeft className="w-5 h-5" />
    </div>
    <span className="font-medium">Back to Home</span>
  </button>
);

const AffirmationModal = ({ onClose }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const randomMsg = affirmations[Math.floor(Math.random() * affirmations.length)];
    setMessage(randomMsg);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative bg-white text-slate-900 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-scaleIn p-8 text-center border-4 border-red-100">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-400 via-pink-500 to-red-400" />
        
        <div className="mb-4 flex justify-center">
          <div className="p-3 bg-red-50 rounded-full">
            <Sparkles className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-2 font-serif">Daily Reminder</h3>
        <p className="text-lg text-slate-600 leading-relaxed italic">
          "{message}"
        </p>

        <button 
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors text-sm font-medium"
        >
          I know, I love you too ❤️
        </button>
      </div>
    </div>
  );
};

// --- PAGES ---

const LoginPage = ({ onLogin }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // SIMPLE STATIC PASSWORD CHECK
    if (input === '111121') {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000); // Clear error after 2s
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 opacity-20" style={{backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '30px 30px'}} />
      <FloatingHearts />

      <div className="relative z-10 max-w-md w-full bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700 shadow-2xl text-center space-y-6 animate-scaleIn">
        <div className="inline-block p-4 rounded-full bg-gradient-to-br from-red-500/20 to-purple-500/20 mb-2 border border-slate-600/50">
          <KeyRound className="w-8 h-8 text-red-300" />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-200 to-amber-100 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Our Private World
          </h1>
          <p className="text-slate-400 text-sm">Please enter the 6 digit passcode to enter.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Passcode"
            className="w-full bg-slate-900/80 border border-slate-600 rounded-xl p-4 text-white text-center text-lg tracking-[0.5em] focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all placeholder:tracking-normal placeholder:text-sm"
            autoFocus
          />
          
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-red-700 to-red-900 text-white font-bold py-3 px-6 rounded-xl hover:from-red-600 hover:to-red-800 transition-all shadow-lg shadow-red-900/20 active:scale-95"
          >
            Unlock Memories
          </button>
        </form>

        {error && (
          <p className="text-red-400 text-sm font-medium animate-pulse bg-red-900/20 py-2 rounded-lg">
            Incorrect passcode. Try our special date.
          </p>
        )}
      </div>
    </div>
  );
};

const BucketListPage = ({ onBack }) => {
  // Initialize state from localStorage or default list
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('bucketList');
    return saved ? JSON.parse(saved) : initialBucketList;
  });

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('bucketList', JSON.stringify(items));
  }, [items]);

  const toggleItem = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedCount = items.filter(i => i.completed).length;
  const progress = Math.round((completedCount / items.length) * 100);

  return (
    <div className="animate-scaleIn max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <BackButton onClick={onBack} />
        <h2 className="text-2xl font-bold text-amber-300">Our Bucket List</h2>
      </div>

      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 mb-6">
        <div className="flex justify-between items-end mb-2">
          <span className="text-slate-400 text-sm font-medium">Progress</span>
          <span className="text-amber-300 font-bold">{progress}% Achieved</span>
        </div>
        <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-amber-500 to-red-500 h-2.5 rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div 
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`group flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
              item.completed 
                ? 'bg-green-900/20 border-green-900/50' 
                : 'bg-slate-800/80 border-slate-700 hover:border-amber-500/50 hover:-translate-y-0.5'
            }`}
          >
            <div className={`flex-shrink-0 transition-colors ${item.completed ? 'text-green-500' : 'text-slate-500 group-hover:text-amber-400'}`}>
              {item.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
            </div>
            <span className={`text-lg font-medium transition-all ${
              item.completed 
                ? 'text-slate-500 line-through' 
                : 'text-white'
            }`}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const HomePage = ({ setPage }) => {
  const startDate = new Date("2021-11-11"); 
  const today = new Date();
  const diffTime = Math.abs(today - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

  return (
    <div className="max-w-md mx-auto space-y-8 animate-scaleIn">
      {/* Hero Section */}
      <div className="text-center space-y-4 pt-8">
        <div className="relative inline-block">
          <div className="w-32 h-32 mx-auto rounded-full border-4 border-red-500/30 overflow-hidden shadow-2xl">
            <img 
              src="/images/hero-couple.jpg" 
              onError={(e) => e.target.src = "/images/pfp.png"} 
              alt="Couple" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 bg-red-500 text-white p-2 rounded-full shadow-lg border-2 border-slate-900">
            <Heart className="w-5 h-5 fill-current" />
          </div>
        </div>
        
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-amber-200"
              style={{ fontFamily: "'Playfair Display', serif" }}>
            Abhishek & Edwina
          </h1>
          <p className="text-slate-400 text-sm mt-2 font-medium tracking-wide uppercase">
            Est. November 2021
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-4 border border-slate-700 inline-block">
          <span className="text-3xl font-bold text-white">{diffDays}</span>
          <span className="text-slate-400 ml-2">Days Together</span>
        </div>
      </div>

      {/* Navigation Grid */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => setPage('advent')}
          className="col-span-2 group relative overflow-hidden rounded-2xl p-6 text-left bg-gradient-to-br from-red-900/80 to-slate-900 border border-red-500/30 hover:border-red-500 transition-all shadow-lg hover:shadow-red-900/20"
        >
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Mountains of Christmas', cursive" }}>Advent Calendar</h3>
              <p className="text-red-200 text-sm">Open your daily surprise 🎁</p>
            </div>
            <Gift className="w-8 h-8 text-red-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-0 opacity-20 pointer-events-none"><Snowflakes className="absolute inset-0" /></div>
        </button>

        <button 
          onClick={() => setPage('timeline')}
          className="group p-4 bg-slate-800/80 rounded-2xl border border-slate-700 hover:border-amber-500/50 hover:bg-slate-800 transition-all text-left"
        >
          <Clock className="w-6 h-6 text-amber-400 mb-3" />
          <h3 className="font-bold text-white">Our Story</h3>
          <p className="text-slate-400 text-xs mt-1">Key milestones</p>
        </button>

        <button 
          onClick={() => setPage('gallery')}
          className="group p-4 bg-slate-800/80 rounded-2xl border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800 transition-all text-left"
        >
          <Camera className="w-6 h-6 text-blue-400 mb-3" />
          <h3 className="font-bold text-white">Gallery</h3>
          <p className="text-slate-400 text-xs mt-1">Best memories</p>
        </button>

        {/* NEW VIDEOS BUTTON */}
        <button 
          onClick={() => setPage('videos')}
          className="group p-4 bg-slate-800/80 rounded-2xl border border-slate-700 hover:border-red-500/50 hover:bg-slate-800 transition-all text-left"
        >
          <Youtube className="w-6 h-6 text-red-500 mb-3" />
          <h3 className="font-bold text-white">Videos</h3>
          <p className="text-slate-400 text-xs mt-1">Our adventures</p>
        </button>

        {/* NEW BUCKET LIST BUTTON */}
        <button 
          onClick={() => setPage('bucketlist')}
          className="group p-4 bg-slate-800/80 rounded-2xl border border-slate-700 hover:border-green-500/50 hover:bg-slate-800 transition-all text-left"
        >
          <ListTodo className="w-6 h-6 text-green-500 mb-3" />
          <h3 className="font-bold text-white">2026 Bucket List</h3>
          <p className="text-slate-400 text-xs mt-1">Dreams we'll chase together</p>
        </button>
      </div>
      
      <p className="text-center text-slate-500 text-xs pt-8">
        Made with ❤️ from shattu.
      </p>
    </div>
  );
};

const TimelinePage = ({ onBack }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="animate-scaleIn max-w-lg mx-auto">
      <BackButton onClick={onBack} />
      <h2 className="text-3xl font-bold text-amber-200 mb-8 font-serif">Our Story</h2>
      <div className="relative border-l-2 border-slate-700 ml-4 space-y-8">
        {timelineData.map((item, index) => (
          <div key={index} className="relative pl-8">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-amber-500 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            </div>
            
            <button 
              onClick={() => setSelectedEvent(item)}
              className="w-full text-left bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-amber-500 hover:bg-slate-800 transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  {item.icon}
                  {item.date}
                </div>
                <div className="opacity-0 group-hover:opacity-100 text-amber-400 transition-opacity text-xs">
                  View Memory &rarr;
                </div>
              </div>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-slate-400 text-sm mt-1 leading-relaxed line-clamp-2">{item.desc}</p>
            </button>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedEvent(null)}
          />
          
          <div className="relative bg-white text-slate-900 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-scaleIn">
            <div className="h-48 overflow-hidden relative">
              <img 
                src={selectedEvent.image} 
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600"; 
                }}
                alt={selectedEvent.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors backdrop-blur-sm"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
                  {selectedEvent.icon}
                  {selectedEvent.date}
                </div>
                <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
              </div>
            </div>

            <div className="p-6">
              <p className="text-slate-600 text-lg leading-relaxed">
                {selectedEvent.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const GalleryPage = ({ onBack }) => (
  <div className="animate-scaleIn">
    <div className="flex items-center justify-between mb-6">
      <BackButton onClick={onBack} />
      <h2 className="text-2xl font-bold text-blue-200">Memories</h2>
    </div>
    <div className="columns-2 md:columns-3 gap-4 space-y-4">
      {galleryImages.map((src, i) => (
        <div key={i} className="break-inside-avoid rounded-xl overflow-hidden hover:opacity-90 transition-opacity">
          <img 
            src={src} 
            onError={(e) => e.target.style.display = 'none'} 
            alt="Memory" 
            className="w-full h-auto object-cover" 
          />
        </div>
      ))}
    </div>
  </div>
);

const VideosPage = ({ onBack }) => {
  // Helper to extract YouTube ID for thumbnails
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="animate-scaleIn max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <BackButton onClick={onBack} />
        <h2 className="text-2xl font-bold text-red-400">Our Videos</h2>
      </div>

      <div className="space-y-6">
        {videoData.map((video, index) => {
          const videoId = getYouTubeId(video.url);
          const thumbnailUrl = videoId 
            ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
            : "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600"; // Fallback

          return (
            <a 
              key={index}
              href={video.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block group bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-700 hover:border-red-500/50 transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-video bg-slate-900">
                 <img 
                   src={thumbnailUrl} 
                   alt={video.title}
                   className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                 />
                 <div className="absolute inset-0 flex items-center justify-center">
                   <div className="bg-red-600/90 text-white rounded-full p-3 group-hover:scale-110 transition-transform shadow-lg">
                     <PlayCircle className="w-8 h-8 fill-current" />
                   </div>
                 </div>
              </div>
              <div className="p-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">{video.title}</h3>
                  <p className="text-slate-400 text-sm mt-1">{video.desc}</p>
                </div>
                <ExternalLink className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors flex-shrink-0 mt-1" />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

const AdventPage = ({ onBack }) => {
  const [openedDays, setOpenedDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [today] = useState(new Date());
  const [shakingDay, setShakingDay] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('adventOpenedDays');
    if (saved) setOpenedDays(JSON.parse(saved));
  }, []);

  const saveOpenedDays = (newDays) => {
    setOpenedDays(newDays);
    localStorage.setItem('adventOpenedDays', JSON.stringify(newDays));
  };

  const isUnlockable = (day) => {
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();
    // Strict Mode: Only unlock if it's December (Month 11)
    if (currentMonth !== 11) return false;
    return currentDate >= day;
  };

  const handleDayClick = (item) => {
    if (isUnlockable(item.day)) {
      if (!openedDays.includes(item.day)) {
        saveOpenedDays([...openedDays, item.day]);
      }
      setSelectedDay(item);
    } else {
      setShakingDay(item.day);
      setTimeout(() => setShakingDay(null), 500);
    }
  };

  return (
    <div className="animate-scaleIn">
      <div className="flex items-center justify-between mb-8">
        <BackButton onClick={onBack} />
        <div className="text-right">
          <h2 className="text-2xl font-bold text-red-200" style={{ fontFamily: "'Mountains of Christmas', cursive" }}>Advent Calendar</h2>
          <p className="text-xs text-slate-400">December {today.getFullYear()}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {calendarData.map((item) => {
          const unlocked = isUnlockable(item.day);
          const opened = openedDays.includes(item.day);
          const isShaking = shakingDay === item.day;

          return (
            <button
              key={item.day}
              onClick={() => handleDayClick(item)}
              className={`
                group relative aspect-square rounded-xl transition-all duration-300 transform perspective-1000
                ${isShaking ? 'animate-shake' : ''}
                ${!unlocked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:shadow-red-900/20'}
              `}
            >
              <div className={`w-full h-full relative transition-all duration-700 transform-style-3d ${opened ? 'rotate-y-180' : ''}`}>
                {/* Front */}
                <div className={`
                  absolute inset-0 backface-hidden rounded-xl border flex flex-col items-center justify-center shadow-md
                  ${unlocked 
                    ? 'bg-gradient-to-br from-red-800 to-red-950 border-red-700 text-white' 
                    : 'bg-slate-800 border-slate-700 text-slate-500'}
                `}>
                  <span className={`text-xl font-bold ${unlocked ? 'text-amber-200' : ''}`}>{item.day}</span>
                  {unlocked ? <Gift className="w-4 h-4 mt-1 text-red-300" /> : <Lock className="w-3 h-3 mt-1 opacity-50" />}
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-800 rounded-xl border border-amber-500/50 flex flex-col items-center justify-center p-1 shadow-inner">
                   <div className="bg-amber-100 rounded-full p-1.5 mb-1">
                      {item.type === 'image' && <ImageIcon className="w-3 h-3 text-amber-800" />}
                      {item.type === 'text' && <Heart className="w-3 h-3 text-red-600" />}
                      {item.type === 'voucher' && <Star className="w-3 h-3 text-amber-600" />}
                   </div>
                   <span className="text-[10px] text-amber-100 font-medium">Open!</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedDay(null)} />
          <div className="relative bg-white text-slate-900 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-scaleIn">
            <div className="h-24 bg-gradient-to-r from-red-500 to-amber-500 flex items-center justify-center relative">
              <h2 className="text-4xl font-bold text-white/20">Day {selectedDay.day}</h2>
              <button onClick={() => setSelectedDay(null)} className="absolute top-4 right-4 bg-black/20 text-white p-1 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 text-center">
              {selectedDay.type === 'image' && selectedDay.image && (
                <div className="mb-4 rounded-lg overflow-hidden border-2 border-slate-100">
                  <img 
                    src={selectedDay.image} 
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?q=80&w=600";
                    }}
                    alt="Memory" 
                    className="w-full h-40 object-cover" 
                  />
                </div>
              )}
              <p className="text-lg text-slate-700 leading-relaxed font-medium">{selectedDay.content}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [page, setPage] = useState('home');
  const [showAffirmation, setShowAffirmation] = useState(false);

  // Check session storage on initial load
  useEffect(() => {
    const isAuth = sessionStorage.getItem('isAuth');
    if (isAuth === 'true') {
      setIsAuthenticated(true);
      setShowAffirmation(true); // Show affirm on refresh if logged in
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('isAuth', 'true');
    setShowAffirmation(true); // Show affirm on fresh login
  };

  // If not authenticated, show ONLY the login page
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans relative selection:bg-red-500 selection:text-white pb-12 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20" style={{backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '30px 30px'}} />
      
      {(page === 'advent' || page === 'home') ? <Snowflakes /> : <FloatingHearts />}
      
      {showAffirmation && <AffirmationModal onClose={() => setShowAffirmation(false)} />}

      <main className="relative z-10 max-w-5xl mx-auto px-4 py-6 md:py-10">
        {page === 'home' && <HomePage setPage={setPage} />}
        {page === 'advent' && <AdventPage onBack={() => setPage('home')} />}
        {page === 'timeline' && <TimelinePage onBack={() => setPage('home')} />}
        {page === 'gallery' && <GalleryPage onBack={() => setPage('home')} />}
        {page === 'videos' && <VideosPage onBack={() => setPage('home')} />}
        {page === 'bucketlist' && <BucketListPage onBack={() => setPage('home')} />}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Mountains+of+Christmas:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        
        @keyframes fall { 0% { transform: translateY(-10vh) rotate(0deg); } 100% { transform: translateY(100vh) rotate(360deg); } }
        @keyframes floatUp { 0% { transform: translateY(100vh) scale(0.5); opacity: 0; } 50% { opacity: 0.5; } 100% { transform: translateY(-10vh) scale(1.2); opacity: 0; } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        
        .animate-fall { animation: fall linear infinite; }
        .animate-floatUp { animation: floatUp linear infinite; }
        .animate-shake { animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out forwards; }
        
        .transform-style-3d { transform-style: preserve-3d; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .backface-hidden { backface-visibility: hidden; }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </div>
  );
}