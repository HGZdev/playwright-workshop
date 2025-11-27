import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { db } from './database/database.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Initialize Database
db.init().then(() => {
  console.log('Database initialized');
});

// Test-only reset endpoint (must be before other routes)
// if (process.env.NODE_ENV === 'test') {
app.post('/api/reset', async (req, res) => {
  await db.reset();
  res.json({ message: 'Database reset successfully' });
});
// }

// Routes
app.use('/api', authRoutes); // Auth Routes
app.use('/api', accountRoutes); // Account Routes
app.use('/api/admin', adminRoutes); // Admin Routes

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
