import mongoose from "mongoose";
import { Movie, MovieModel } from "./movie";

const userSchema = new mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String, required: false },
	registerDate: { type: Date, required: true, default: Date.now },
	shows_list: { type: [MovieModel], default: [] },
	avatar_link: { type: String },
});

export interface User {
	username: string;
	password: string;
	email: string;
	registerDate: Date;
	shows_list: Movie[];
	avatar_link: string;
}

export const UserModel = mongoose.model("UserSchema", userSchema);
