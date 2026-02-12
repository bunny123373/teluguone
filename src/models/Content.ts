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
  episodeNumber: { type: Number, required: true },
  episodeTitle: { type: String, required: true },
  watchLink: { type: String, required: true },
  downloadLink: { type: String, required: true },
  quality: { type: String },
});

const SeasonSchema: Schema = new Schema({
  seasonNumber: { type: Number, required: true },
  episodes: { type: [EpisodeSchema], default: [] },
});

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
