import mongoose, {Schema, InferSchemaType, model} from "mongoose";

const schema = new Schema({
    username: String,
    email: String,
    avatar_url: String,
    created_at: Date,
    updated_at: Date
});

type User = InferSchemaType<typeof schema>;
const UserModel = mongoose.model('User', schema);
