export const LANGUAGES = [
  "Telugu",
  "Hindi",
  "Tamil",
  "Malayalam",
  "English",
  "Kannada",
];

export const AUDIO_LANGUAGES = [
  "Telugu",
  "Hindi",
  "Tamil",
  "Malayalam",
  "English",
  "Kannada",
  "Japanese",
  "Korean",
  "Chinese",
  "Spanish",
  "French",
  "German",
];

export const CATEGORIES = [
  "Latest",
  "Trending",
  "Dubbed",
  "Movies",
  "Web Series",
  "Action",
  "Comedy",
  "Drama",
  "Thriller",
  "Romance",
];

export const GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Drama",
  "Family",
  "Fantasy",
  "Horror",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Sport",
  "Thriller",
  "War",
];

export const QUALITIES = ["480p", "720p", "1080p", "4K"];

export const TYPE_FILTERS = [
  { value: "all", label: "All" },
  { value: "movie", label: "Movies" },
  { value: "series", label: "Series" },
] as const;

export const ADMIN_NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { id: "upload-movie", label: "Upload Movie", icon: "PlaySquare" },
  { id: "upload-series", label: "Upload Series", icon: "Tv" },
  { id: "manage", label: "Manage", icon: "Settings" },
  { id: "settings", label: "Settings", icon: "Settings" },
  { id: "activity", label: "Activity Log", icon: "Settings" },
];
