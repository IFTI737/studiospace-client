import { Camera, Clapperboard, Mic, Music, Palette } from "lucide-react";

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

export const categories = [
  {
    name: "Photo Studio",
    label: "Photo Studios",
    icon: Camera,
    image: unsplash("1492691527719-9d1e07e534b4"),
    blurb: "Cyc walls, strobes and daylight sets",
  },
  {
    name: "Film Stage",
    label: "Sound Stages",
    icon: Clapperboard,
    image: unsplash("1485846234645-a62644f84728"),
    blurb: "Lighting grids and green screens",
  },
  {
    name: "Podcast Lounge",
    label: "Podcast Rooms",
    icon: Mic,
    image: unsplash("1478737270239-2f02b77fc618"),
    blurb: "Treated rooms with broadcast mics",
  },
  {
    name: "Music Suite",
    label: "Music Suites",
    icon: Music,
    image: unsplash("1598488035139-bdbb2231ce04"),
    blurb: "Vocal booths and mixing desks",
  },
  {
    name: "Workshop",
    label: "Art Workshops",
    icon: Palette,
    image: unsplash("1460661419201-fd4cecdf8a8b"),
    blurb: "Easels, wheels and natural light",
  },
];

export const categoryNames = categories.map((c) => c.name);

export const amenityOptions = [
  "Wi-Fi",
  "Air Conditioning",
  "Parking",
  "Cyc Wall",
  "Strobe Lights",
  "LED Panels",
  "Green Screen",
  "Sound Treatment",
  "Vocal Booth",
  "Microphones",
  "Video Cameras",
  "Changing Room",
  "Makeup Room",
  "Natural Light",
  "Kitchenette",
  "Wheelchair Access",
];

export const formatMoney = (value: number | string) =>
  `$${Number(value || 0).toLocaleString("en-US")}`;
