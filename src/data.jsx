import React from 'react';
import { MapPin, Heart, Gift, Home } from 'lucide-react';

export const globalData = [
  { 
    image: "/images/pfp.png", 
    title: "First Text", 
  },];


// 1. ADVENT CALENDAR DATA
export const calendarData = Array.from({ length: 24 }, (_, i) => {
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
    type = 'voucher';
    content = "You already have this with you, Go open it my love";
    image = "/images/calendar-2.jpg";
  } else if (day === 3) {
    type = 'voucher';
    content = "You already have this with you, Go open it my love";
    image = "/images/calendar-3.jpg";
  } else if (day === 4) {
    type = 'voucher';
    content = "You already have this with you, Go open it my love";
    image = "/images/calendar-4.jpg";
  } else if (day === 5) {
    type = 'voucher';
    content = "You already have this with you, Go open it my love";
    image = "/images/calendar-5.jpg";
  } else if (day === 6) {
    type = 'image';
    content = "I'm sure, You'll look beatifull in thisss";
    image = "/images/calendar-6.jpg";
  } else if (day === 7) {
    type = 'image';
    content = "You already got his with you, Go open it my love";
    image = "/images/calendar-7.jpg";
  } else if (day === 8) {
    type = 'image';
    content = "You already got his with you, Go open it my love";
    image = "/images/calendar-8.jpg";
  } else if (day === 9) {
    type = 'image';
    content = "You already got his with you, Go open it my love";
    image = "/images/calendar-9.jpg";
  } else if (day === 10) {
    type = 'image';
    content = "You already got his with you, Go open it my love";
    image = "/images/calendar-10.jpg";
  } else if (day === 11) {
    type = 'image';
    content = "You already got his with you, Go open it my love";
    image = "/images/calendar-11.jpg";
  } else if (day === 12) {
    type = 'image';
    content = "You already got his with you, Go open it my love";
    image = "/images/calendar-12.jpg";
  } else if (day === 13) {
    type = 'image';
    content = "You already got his with you, Go open it my love";
    image = "/images/calendar-13.jpg";
  } else if (day === 14) {
    type = 'image';
    content = "You already got his with you, Go open it my love";
    image = "/images/calendar-14.jpg";
  } else if (day === 15) {
    type = 'image';
    content = "You already got his with you, Go open it my love";
    image = "/images/calendar-15.jpg";
  } else if (day === 16) {
    type = 'image';
    content = "You already got his with you, Go open it my love";
    image = "/images/calendar-16.jpg";
  } else if (day === 17) {
    type = 'image';
    content = "You already got his with you, Go open it my love";
    image = "/images/calendar-17.jpg";
  } else if (day ===  18) {
    type = 'image';
    content = "You already got his with you, Go open it my love";
    image = "/images/calendar-18.jpg";
  } else if (day ===  19) {
    type = 'image';
    content = "You already got his with you, Go open it my love";
    image = "/images/calendar-19.jpg";
  } else if (day === 20) {
    type = 'image';
    content = "You already got his with you, Go open it my love";
    image = "/images/calendar-20.jpg";
  } else if (day === 21) {
    type = 'image';
    content = "You already got his with you, Go open it my love";
    image = "/images/calendar-21.jpg";
  } else if (day === 22) {
    type = 'image';
    content = "You already got his with you, Go open it my love";
    image = "/images/calendar-22.jpg";
  } else if (day === 23) {
    type = 'image';
    content = "You already got his with you, Go open it my love";
    image = "/images/calendar-23.jpg";
  } else if (day === 24) {
    type = 'image';
    content = "Merry Christmas Eve! I can't wait to see you tonight.";
    image = "/images/calendar-24.jpg";
  } else if (type === 'voucher') {
    content = "VOUCHER: Good for one 30-minute foot massage! 💆‍♀️";
  } else if (type === 'image') {
    content = "Just a reminder of how beautiful you are.";
    image = `/images/calendar-${day}.jpg`;
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

// 2. TIMELINE DATA
export const timelineData = [
  { 
    date: "Sep 14, 2021", 
    title: "Our First Text", 
    desc: "The day our worlds collided in that Discord chat. You asked me if I want to play valorant with you, and the rest is history.", 
    image: "/images/story-1.png",
    icon: <MapPin className="w-4 h-4" /> 
  },
  { 
    date: "Nov 10, 2021", 
    title: "Opening up", 
    desc: "In that moment when our feelings finally met, my heart trembled with fear and excitemen, because loving you felt like stepping into a beautiful unknown.", 
    image: "/images/story-2.png",
    icon: <Heart className="w-4 h-4" /> 
  },
  { 
    date: "Nov 11, 2021", 
    title: "We're couplesss!!", 
    desc: "The first time we said ‘I love you,’ it felt like the whole world paused and my belly fell down, because suddenly, life made sense with you in it.", 
    image: "/images/story-3.png",
    icon: <Gift className="w-4 h-4" /> 
  },
  { 
    date: "Jan 08, 2022", 
    title: "Atlast we meet", 
    desc: "Atlast we meet,You looked Beautifulll... First hug, First kiss, I love you my love. I still remember your smell of that day", 
    image: "/images/story-4.png",
    icon: <Heart className="w-4 h-4" /> 
  },
  { 
    date: "Nov 15, 2025", 
    title: "Sheraton Date", 
    desc: "The best date we had yet, You looked super beautifull and We had a great timee, We should do this moree.", 
    image: "/images/story-latest.png",
    icon: <Home className="w-4 h-4" /> 
  },
];

// 3. GALLERY DATA
export const galleryImages = [
  "/images/gallery-1.jpg",
  "/images/gallery-2.jpg",
  "/images/gallery-3.jpg",
  "/images/gallery-4.jpg",
  "/images/gallery-5.jpg",
  "/images/gallery-6.jpg",
  "/images/gallery-7.jpg",
  "/images/gallery-8.jpg",
  "/images/gallery-9.jpg",
  "/images/gallery-10.jpg",
];


// 4. VIDEO DATA
export const videoData = [
  {
    title: "3 YEAR VLOG",
    url: "https://youtu.be/wshcROH3gkg", // Replace with your URLs
    desc: "Celebrating our 3rd anniversary Nenunenu."
  },
  {
    title: "KUNAFA STORY VLOG",
    url: "https://youtu.be/Z7ETRGxfkYs", // Replace with your URLs
    desc: "That time we went to Kunafa story, Koramangala."
  },
  {
    title: "MYFROYOLAND VLOG",
    url: "https://youtu.be/GMaZ3YaIjjM", // Replace with your URLs
    desc: "That time we went to MyFroyoLand."
  },
  {
    title: "AMMUCHI | Cubbon park",
    url: "https://youtu.be/2eh-wJItA-4",
    desc: "My beatiful girlfriend"
  },
  {
    title: "KORAMANGALA VLOG",
    url: "https://youtu.be/kv2cDTQJpaw",
    desc: "When we went to Koramangala with Anoop."
  }
];



// 5. AFFIRMATIONS DATA
export const affirmations = [
  "I lovvee when you're lying on my chest.",
  "Time goes really sloww when you're away from me.",
  "Thank you for being my peace in a chaotic world.",
  "I'm sooo happy that you are my everything.",
  "You give the best hugs in the entire universe.",
  "My favorite place is wherever you are.",
  "You are the most beautiful person I know, inside and out.",
  "I love when you hug me sooo tight that it feels like I just want us to stay like that.",
  "It feels like we're are married whenever you're together.",
  "You are my greatest blessing.",
  "You're always my priority, You will be my priority.",
  "I love you soo much that I'll do everything I can in this world to be with you.",
  "I lovvee the thought of growing old with you .",
  "You are my safe space.",
  "Thank you for loving me, even when I'm a bad boyfriend and annoying af.",
  "You'll be a beautiful and the best mother my kids will ever get  .",
  "I choose you. And I'll choose you over and over.",
  "You make me want to be a better person.",
  "I want to go to church with you on every sundays till I die .",
  "I love looking at you while you sleep.",
  "you're my 11:11 wish Ammuchi."
];

// 6. BUCKET LIST DATA
export const initialBucketList = [
  { id: 1, text: "Go to the Gym and get healthy", completed: false },
  { id: 2, text: "Go on a car drive", completed: false },
  { id: 3, text: "Learn to Salsa dance", completed: false },
  { id: 4, text: "Go for a long bus trip", completed: false },
  { id: 5, text: "Take our first flight together", completed: false },
  { id: 6, text: "Go to Nandi hills together", completed: false },
  { id: 7, text: "Build a blanket fort and watch movies all day", completed: false },
  { id: 8, text: "Take Ammuchi for a Mega date", completed: false },
];
