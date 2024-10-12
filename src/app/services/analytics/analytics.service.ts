import { Injectable } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(
    private $gaService: GoogleAnalyticsService
  ) { }

  logEvent(eventName: string, eventData: any) {
    // Implémentez ici votre logique d'analytique
    console.log(`Event logged: ${eventName}`, eventData);
  }

  sendAnalyticEvent(action: string, category: string, label){
    this.$gaService.event(action, category, label)
  }

  sendAnalyticPageView(path: string, title: string){
    this.$gaService.pageView(path, title)
  }

}
