import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the Division schema
const divisionSchema = new Schema({
    division: {
        type: String,
        required: [true, 'Division name is required'],
        trim: true
    },
    studentCount: {
        type: Number,
        required: [true, 'Student count is required']
    }
});

// Define the Class schema
const classSchema = new Schema({
    className: {
        type: String,
        required: [true, 'Class name is required'],
        trim: true
    },
    divisions: [divisionSchema] // Array of divisions
});

// Define the Year schema
const yearSchema = new Schema({
    year: {
        type: String,
        required: [true, 'Year is required'],
        trim: true
    },
    classes: [classSchema] // Array of classes
});

// Define the School schema
const schoolSchema = new Schema({
    name: {
        type: String,
        required: [true, 'School name is required'],
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User reference is required']
    },
    data: [yearSchema] // Array of years with their classes
});

const School = mongoose.model('School', schoolSchema);
export default School;
