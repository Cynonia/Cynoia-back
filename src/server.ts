import 'module-alias/register';
import 'dotenv/config';
import app from './app';

const PORT = Number(process.env.PORT) || 3000;

const startServer = async () => {
  try {    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
