import React, { useState, useEffect } from 'react';
import { 
  Gift, Lock, X, Heart, Star, Image as ImageIcon, 
  Calendar, Clock, Camera, Home, ChevronLeft, MapPin,
  Sparkles, Wand2, Send
} from 'lucide-react';

// --- DATA SECTIONS ---

// 1. ADVENT CALENDAR DATA
const calendarData = Array.from({ length: 24 }, (_, i) => {
  const day = i + 1;
  let type = 'text';
  let content = '';
  let image = null;

  if (day % 3 === 0) type = 'image';
  else if (day % 5 === 0) type = 'voucher';
  else type = 'text';

  if (day === 1) {
    type = 'text';
    content = "Welcome to your Christmas Countdown! I love you so much. Let the festivities begin! ❤️";
  } else if (day === 2) {
    type = 'image';
    content = "Remember this trip? One of my favorite days with you.";
    image = "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop";
  } else if (day === 24) {
    type = 'image';
    content = "Merry Christmas Eve! I can't wait to see you tonight.";
    image = "https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=600";
  } else if (type === 'voucher') {
    content = "VOUCHER: Good for one 30-minute foot massage! 💆‍♀️";
  } else if (type === 'image') {
    content = "Just a reminder of how beautiful you are.";
    image = `https://images.unsplash.com/photo-1513297887119-d46091b24bfa?q=80&w=600&auto=format&fit=crop&random=${day}`;
  } else {
    const messages = [
      "You make every day brighter.", "I love your laugh.", "Can't wait for our movie night.",
      "You are my favorite person.", "Sending you a giant virtual hug!", "Thinking of you...",
      "You're doing amazing, keep going!", "I love us.",
    ];
    content = messages[day % messages.length];
  }
  return { day, type, content, image };
});

// 2. TIMELINE DATA (Updated with Images)
const timelineData = [
  { 
    date: "Sep 14, 2021", 
    title: "First Text", 
    desc: "The day our worlds collided in that Discord chat. You asked me if I want to play valorant with you, and the rest is history.", 
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600",
    icon: <MapPin className="w-4 h-4" /> 
  },
  { 
    date: "Nov 05, 2021", 
    title: "First Date", 
    desc: "We went for Sushi and saw that terrible horror movie. I knew I wanted a second date before the appetizers even arrived.", 
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=600",
    icon: <Heart className="w-4 h-4" /> 
  },
  { 
    date: "Dec 25, 2021", 
    title: "First Christmas", 
    desc: "Exchanging gifts by the tree. You got me that scarf I still wear every winter.", 
    image: "https://images.unsplash.com/photo-1544079813-92f589b2518e?q=80&w=600",
    icon: <Gift className="w-4 h-4" /> 
  },
  { 
    date: "Feb 14, 2022", 
    title: "Valentine's Day", 
    desc: "Our weekend getaway to the cabin. It snowed 6 inches and we were stuck inside—perfect.", 
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=600",
    icon: <Heart className="w-4 h-4" /> 
  },
  { 
    date: "Aug 20, 2023", 
    title: "Moved In", 
    desc: "Starting our life together in the new apartment. Pizza on the floor among the boxes.", 
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600",
    icon: <Home className="w-4 h-4" /> 
  },
];

// 3. GALLERY DATA
const galleryImages = [
  "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600",
  "https://images.unsplash.com/photo-1529619768328-e37af76c6fe5?q=80&w=600",
  "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?q=80&w=600",
  "https://images.unsplash.com/photo-1621600411688-4be93cd68504?q=80&w=600",
  "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=600",
  "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600",
];

// --- API HELPER ---
const generateGeminiContent = async (prompt) => {
  const apiKey = ""; // API key injected at runtime
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Couldn't generate text right now. Try again!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Oops! Cupid's arrows missed. Please try again.";
  }
};

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

// --- PAGES ---

const HomePage = ({ setPage }) => {
  // Calculate days together (Example start date)
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
              src="https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=400" 
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
          {/* Subtle snow inside the button only */}
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

      {/* Modal for Timeline Event */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedEvent(null)}
          />
          
          <div className="relative bg-white text-slate-900 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-scaleIn">
            {/* Header Image */}
            <div className="h-48 overflow-hidden relative">
              <img 
                src={selectedEvent.image} 
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

            {/* Content Body */}
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
          <img src={src} alt="Memory" className="w-full h-auto object-cover" />
        </div>
      ))}
    </div>
  </div>
);

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
    
    // Check if the date has arrived
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

      {/* Modal */}
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
                  <img src={selectedDay.image} alt="Memory" className="w-full h-40 object-cover" />
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
  const [page, setPage] = useState('home');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans relative selection:bg-red-500 selection:text-white pb-12 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-20" style={{backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '30px 30px'}} />
      
      {/* Background Animation Switcher */}
      {(page === 'advent' || page === 'home') ? <Snowflakes /> : <FloatingHearts />}
      
      <main className="relative z-10 max-w-5xl mx-auto px-4 py-6 md:py-10">
        {page === 'home' && <HomePage setPage={setPage} />}
        {page === 'advent' && <AdventPage onBack={() => setPage('home')} />}
        {page === 'cupid' && <CupidPage onBack={() => setPage('home')} />}
        {page === 'timeline' && <TimelinePage onBack={() => setPage('home')} />}
        {page === 'gallery' && <GalleryPage onBack={() => setPage('home')} />}
      </main>

      {/* Shared CSS Animation styles */}
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