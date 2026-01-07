import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './auth';
import './config/passport';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRoutes);

app.listen(5000, '0.0.0.0', () => {
    console.log("Server running on port 5000");
});
