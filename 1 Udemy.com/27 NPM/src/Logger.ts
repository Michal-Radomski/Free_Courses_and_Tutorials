function log(level: string, message: any): void {
  process.stdout.write(`${level}: ${message} \n`);
}

export class Logger {
  debug(message: string) {
    log("Debug", message);
  }

  info(message: string) {
    log("Info", message);
  }

  error(message: string) {
    log("Error", message);
  }
}
