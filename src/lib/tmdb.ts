const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export interface TMDBSearchResult {
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  media_type: "movie" | "tv";
  vote_average: number;
}

export interface TMDBSearchResponse {
  page: number;
  results: TMDBSearchResult[];
  total_pages: number;
  total_results: number;
}

export interface TMDBMovieDetails {
  id: number;
  title: string;
  original_title: string;
  original_language: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  runtime: number | null;
  tagline: string | null;
}

export interface TMDBTvDetails {
  id: number;
  name: string;
  original_name: string;
  original_language: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  episode_run_time: number[];
  tagline: string | null;
}

export async function searchTMDB(
  query: string,
  mediaType: "movie" | "tv" = "movie"
): Promise<TMDBSearchResponse> {
  if (!TMDB_API_KEY) {
    throw new Error("TMDB API key not configured");
  }

  const response = await fetch(
    `${TMDB_BASE_URL}/search/${mediaType}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
      query
    )}&include_adult=false&language=en-US`
  );

  if (!response.ok) {
    throw new Error("Failed to search TMDB");
  }

  return response.json();
}

export async function getMovieDetails(tmdbId: number): Promise<TMDBMovieDetails> {
  if (!TMDB_API_KEY) {
    throw new Error("TMDB API key not configured");
  }

  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}&language=en-US`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return response.json();
}

export async function getTvDetails(tmdbId: number): Promise<TMDBTvDetails> {
  if (!TMDB_API_KEY) {
    throw new Error("TMDB API key not configured");
  }

  const response = await fetch(
    `${TMDB_BASE_URL}/tv/${tmdbId}?api_key=${TMDB_API_KEY}&language=en-US`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch TV details");
  }

  return response.json();
}

export function getPosterUrl(path: string | null, size: "w92" | "w500" | "original" = "w500"): string | undefined {
  if (!path) return undefined;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

export function getBackdropUrl(path: string | null, size: "w780" | "original" = "w780"): string | undefined {
  if (!path) return undefined;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

export function getYearFromDate(dateString: string | undefined): string {
  if (!dateString) return "";
  return dateString.split("-")[0] || "";
}

export function mapGenreToApp(genreName: string): string {
  const genreMap: Record<string, string> = {
    Action: "Action",
    Adventure: "Action",
    Animation: "Action",
    Comedy: "Comedy",
    Crime: "Thriller",
    Drama: "Drama",
    Family: "Drama",
    Fantasy: "Action",
    Horror: "Thriller",
    Music: "Drama",
    Mystery: "Thriller",
    Romance: "Drama",
    "Science Fiction": "Action",
    Thriller: "Thriller",
    War: "Action",
    Documentary: "Drama",
    History: "Drama",
  };
  return genreMap[genreName] || "Action";
}

export function inferCategory(
  mediaType: "movie" | "tv",
  genres: string[],
  countryCode?: string
): string {
  if (mediaType === "tv") {
    return "Web Series";
  }

  const genreSet = new Set(genres.map((g) => g.toLowerCase()));
  const countryCodeUpper = countryCode?.toUpperCase();
  
  if (countryCodeUpper && ["IN"].includes(countryCodeUpper)) {
    if (genreSet.has("animation")) {
      return "Dubbed";
    }
    return "Latest";
  }
  
  if (genreSet.has("comedy")) {
    return "Comedy";
  }
  if (genreSet.has("drama") || genreSet.has("romance")) {
    return "Drama";
  }
  if (genreSet.has("thriller") || genreSet.has("horror") || genreSet.has("crime") || genreSet.has("mystery")) {
    return "Thriller";
  }
  if (genreSet.has("action") || genreSet.has("adventure") || genreSet.has("fantasy") || genreSet.has("science fiction")) {
    return "Action";
  }
  
  return "Latest";
}

export function inferLanguage(
  originalLanguage: string | undefined,
  productionCountries: { iso_3166_1: string }[] | undefined
): string {
  if (!originalLanguage) return "";
  
  const langMap: Record<string, string> = {
    te: "Telugu",
    hi: "Hindi",
    ta: "Tamil",
    ml: "Malayalam",
    kn: "Kannada",
    en: "English",
  };
  
  const lang = langMap[originalLanguage] || "";
  
  if (lang) return lang;
  
  const country = productionCountries?.[0]?.iso_3166_1;
  if (country === "IN") return "Telugu";
  
  return "";
}
