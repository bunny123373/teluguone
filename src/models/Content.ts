import mongoose, { Schema, Document } from "mongoose";

export interface IEpisode {
  episodeNumber: number;
  episodeTitle: string;
  watchLink: string;
  downloadLink: string;
  quality?: string;
}

export interface ISeason {
  seasonNumber: number;
  episodes: IEpisode[];
}

export interface IContent extends Document {
  type: "movie" | "series";
  title: string;
  poster: string;
  banner?: string;
  description?: string;
  year?: string;
  language?: string;
  category?: string;
  genre?: string;
  quality?: string;
  rating?: number;
  tags?: string[];
  watchLink?: string;
  downloadLink?: string;
  seasons?: ISeason[];
  createdAt: Date;
  updatedAt: Date;
}

const EpisodeSchema: Schema = new Schema({
  episodeNumber: { type: Number, default: 1 },
  episodeTitle: { type: String, default: "" },
  watchLink: { type: String, default: "" },
  downloadLink: { type: String, default: "" },
  quality: { type: String, default: "720p" },
}, { _id: false });

const SeasonSchema: Schema = new Schema({
  seasonNumber: { type: Number, required: true },
  episodes: { type: [EpisodeSchema], default: [] },
}, { _id: false });

const ContentSchema: Schema = new Schema(
  {
    type: { type: String, required: true, enum: ["movie", "series"] },
    title: { type: String, required: true },
    poster: { type: String, required: true },
    banner: { type: String },
    description: { type: String },
    year: { type: String },
    language: { type: String },
    category: { type: String },
    genre: { type: String },
    quality: { type: String },
    rating: { type: Number },
    tags: { type: [String], default: [] },
    watchLink: { type: String },
    downloadLink: { type: String },
    seasons: { type: [SeasonSchema], default: [] },
  },
  { timestamps: true }
);

const Content = mongoose.models.Content || mongoose.model<IContent>("Content", ContentSchema);

export default Content;
