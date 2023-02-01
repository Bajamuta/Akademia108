import mongoose, {InferSchemaType, Schema} from "mongoose";

const schema = new Schema({
    name: String
});

type City = InferSchemaType<typeof schema>;
const CityModel = mongoose.model('City', schema);
