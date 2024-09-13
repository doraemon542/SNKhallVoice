import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { UserRouter } from './routes/user.js';
import {complaintRouter} from './routes/complaint.js';
import { reviewRouter } from './routes/seeding.js';
import { announcementRouter } from './routes/announcement.js';
import { adminRouter } from './routes/admin.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}));
app.use(cookieParser());
app.use('/auth', UserRouter);
app.use('/api', complaintRouter);  // Use complaint routes
app.use('/api', announcementRouter);
app.use('/api/reviews', reviewRouter);
app.use("/admin", adminRouter);

mongoose.connect('mongodb://127.0.0.1:27017/snkhal')
  .then(() => {
    console.log('MongoDB connected...');
    // Start the server after successful database connection
    app.listen(process.env.PORT, () => {
      console.log("Server is Running");
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  });