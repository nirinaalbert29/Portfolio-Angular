import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

@Component({
  selector: 'app-more-proyects',
  templateUrl: './more-proyects.component.html',
  styleUrls: ['./more-proyects.component.scss']
})
export class MoreProyectsComponent implements OnInit {

  constructor(
    private router: Router,
    public analyticsService: AnalyticsService
    ) { }

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }
    redirect(url: string, event: MouseEvent) {
      event.preventDefault(); // Empêche le comportement par défaut du clic
      if (url) {
          window.open(url, '_blank'); // Ouvre l'URL dans un nouvel onglet
      }
    }
    openGitHubLink(link: string) {
      window.open(link, '_blank');
    }

}
