class Logger {
    constructor() {
        this.logs = [];
        this.maxLogs = 1000;
    }
    log(level, message, data) {
        const entry: any = {
            level,
            message,
            timestamp: new Date().toISOString(),
            data
        };
        this.logs.push(entry);
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }
        if (process.env.NODE_ENV === 'development') {
            console[level](message, data);
        }
    }
    debug(message, data) {
        this.log('debug', message, data);
    }
    info(message, data) {
        this.log('info', message, data);
    }
    warn(message, data) {
        this.log('warn', message, data);
    }
    error(message, data) {
        this.log('error', message, data);
    }
    getLogs() {
        return this.logs;
    }
    clearLogs() {
        this.logs = [];
    }
}
export const logger: any = new Logger();
