import { Schema } from "mongoose";

export const AuthorSchema = new Schema({
    name: String,
    country: String,
});