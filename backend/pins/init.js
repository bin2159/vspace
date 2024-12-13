// import AIController from '../controller/ai.js'
import Logger from '../controller/logger.js'
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config() // Activate dotenv configuration
// export const initAI = () => {
//   const aiController = new AIController()
//   return aiController
// }
export const initLogger = () => {
  // Get __filename and __dirname in ES Modules
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Get the relative path to the logs folder
  const logFilePath = path.join(__dirname, '..', 'logs', 'access.log');

  // Initialize the logger
  const logger = new Logger({
    logDir: logFilePath,  // Custom log directory
    logLevel: 'debug',        // Set log level
    maxFileSize: 5 * 1024 * 1024, // 5MB max file size
    maxFiles: 3               // Keep 3 log files
  });
  return logger
}
