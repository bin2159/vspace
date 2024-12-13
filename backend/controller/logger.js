import fs from 'fs';
import path from 'path';
class Logger {
  constructor(options = {}) {
    // Default configuration
    this.config = {
      logDir: options.logDir || path.join(process.cwd(), 'logs'),
      logLevel: options.logLevel || 'info',
      maxFileSize: options.maxFileSize || 10 * 1024 * 1024, // 10MB default
      maxFiles: options.maxFiles || 5
    };

    // Ensure log directory exists
    if (!fs.existsSync(this.config.logDir)) {
      fs.mkdirSync(this.config.logDir, { recursive: true });
    }

    // Log levels in order of severity
    this.levels = ['error', 'warn', 'info', 'debug'];
  }

  // Generate log filename with timestamp
  _getLogFileName(level) {
    const date = new Date().toISOString().split('T')[0];
    return path.join(this.config.logDir, `${date}-${level}.log`);
  }

  // Rotate log files if they exceed max size
  _rotateLogFile(logPath) {
    const files = fs.readdirSync(this.config.logDir)
      .filter(file => file.includes(path.basename(logPath).split('-')[1].split('.')[0]))
      .sort()
      .reverse();

    // Remove excess log files
    while (files.length >= this.config.maxFiles) {
      const oldestFile = files.pop();
      fs.unlinkSync(path.join(this.config.logDir, oldestFile));
    }
  }

  // Write log entry
  _writeLog(level, message, metadata = {}) {
    // Check if log should be written based on configured level
    if (this.levels.indexOf(level) > this.levels.indexOf(this.config.logLevel)) {
      return;
    }

    const logPath = this._getLogFileName(level);
    const timestamp = new Date().toISOString();

    // Prepare log entry
    const logEntry = JSON.stringify({
      timestamp,
      level,
      message,
      metadata
    }) + '\n';

    // Rotate logs if needed
    if (fs.existsSync(logPath) && fs.statSync(logPath).size > this.config.maxFileSize) {
      this._rotateLogFile(logPath);
    }

    // Append log entry
    fs.appendFileSync(logPath, logEntry);

    // Optional console output
    if (level === 'error') {
      console.error(`[${timestamp}] ${message}`, metadata);
    } else if (level === 'warn') {
      console.warn(`[${timestamp}] ${message}`, metadata);
    } else {
      console.log(`[${timestamp}] ${message}`, metadata);
    }
  }

  // Public logging methods
  error(message, metadata = {}) {
    this._writeLog('error', message, metadata);
  }

  warn(message, metadata = {}) {
    this._writeLog('warn', message, metadata);
  }

  info(message, metadata = {}) {
    this._writeLog('info', message, metadata);
  }

  debug(message, metadata = {}) {
    this._writeLog('debug', message, metadata);
  }
}

export default Logger;