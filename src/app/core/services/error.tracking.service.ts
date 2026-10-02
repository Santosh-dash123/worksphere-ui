import { Injectable } from '@angular/core';

export interface ErroLog {
  message: string;
  statusCode?: number;
  url?: string;
  method?: string;
  timestamp: string;
  stackTrace?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorTrackingService {
  log(error: ErroLog) {
    console.error('============== ERROR LOG ==============');
    console.error('Message :', error.message);
    console.error('StatusCode :', error.statusCode);
    console.error('Url :', error.url);
    console.error('Method', error.method);
    console.error('Timestamp :', error.timestamp);
    console.error('StackTrace :', error.stackTrace);
    console.error('============================');
  }
}
