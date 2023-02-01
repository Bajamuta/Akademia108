import mongoose, {InferSchemaType, Schema} from "mongoose";

const schema = new Schema({
    name: String,
    date: Date,
    description: String
});

type Event = InferSchemaType<typeof schema>;
const EventModel = mongoose.model('Event', schema);
