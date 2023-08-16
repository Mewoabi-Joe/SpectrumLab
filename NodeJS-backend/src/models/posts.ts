import mongoose, { Schema } from "mongoose";
import { PostInterface } from "src/utils/interfaces";

const PostSchema = new Schema<PostInterface>({
	type: Array<String>,
	title: {
		unique: true,
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: false,
	},

	youtubeVideoUrl: {
		type: String,
	},
	imagePath: String,

	created_at: {
		type: String,
	},
});

export default mongoose.model<PostInterface>("Post", PostSchema);
