import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  name: string = '';
  email: string = '';
  message: string = '';
  formError: string = '';
  formStatus: 'idle' | 'sending' | 'success' | 'error' = 'idle';

  constructor(
    public analyticsService: AnalyticsService
  ) { }

  ngOnInit(): void {
    emailjs.init("wvWdwj00Lkp_sd5Fa"); // Remplacez par votre User ID EmailJS
  }

  onSubmit() {
    this.formStatus = 'sending';
    this.formError = '';

    if (!this.validateEmailFormat(this.email)) {
      this.formError = "Le format de l'adresse email est incorrect. Veuillez vérifier et réessayer.";
      this.formStatus = 'error';
      this.analyticsService.logEvent('email_format_error', { email: this.email });
      return;
    }

    this.sendMessageToOwner()
      .then(() => this.sendConfirmationToSender())
      .then(() => {
        this.formStatus = 'success';
        this.resetForm();
      })
      .catch((error) => {
        this.handleSendError(error);
      });
  }

  validateEmailFormat(email: string): boolean {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  }

  sendMessageToOwner(): Promise<void> {
    const templateParams = {
      from_name: this.name,
      from_email: this.email,
      to_name: 'JEAN alexis Nirina albert',
      message: this.message,
      reply_to: this.email
    };

    return emailjs.send('service_0y7fidt', 'template_bmmwslg', templateParams)
      .then((response) => {
        console.log('Email envoyé au propriétaire avec succès', response);
        this.analyticsService.logEvent('email_sent_to_owner', templateParams);
      });
  }

  sendConfirmationToSender(): Promise<void> {
    const templateParams = {
      to_name: this.name,
      to_email: this.email,
      message: `Merci d'avoir visité mon portfolio. Je vous souhaite beaucoup de succès dans vos projets. J'ai bien reçu votre message et je m'engage à y répondre dans les plus brefs délais. N'hésitez pas à me contacter pour toute information supplémentaire. Cordialement, JEAN alexis Nirina albert`
    };

    return emailjs.send('service_0y7fidt', 'template_gwamtqj', templateParams)
      .then((response) => {
        console.log('Email de confirmation envoyé avec succès à l\'utilisateur', response);
        this.analyticsService.logEvent('confirmation_email_sent', templateParams);
      });
  }

  handleSendError(error: any) {
    console.error('Erreur lors de l\'envoi des emails', error);
    this.formStatus = 'error';

    if (error.text && error.text.includes("The email account that you tried to reach does not exist")) {
      this.formError = "L'adresse email saisie n'existe pas. Veuillez vérifier et réessayer.";
      this.analyticsService.logEvent('email_not_exist_error', { email: this.email });
    } else {
      this.formError = "Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer plus tard.";
      this.analyticsService.logEvent('email_send_error', { error: error.message });
    }
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.message = '';
    this.formError = '';
  }
}
