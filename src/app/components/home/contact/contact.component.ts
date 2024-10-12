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
  emailError: string = '';

  constructor(
    public analyticsService: AnalyticsService
  ) { }

  ngOnInit(): void {
    emailjs.init("wvWdwj00Lkp_sd5Fa"); // Remplacez par votre User ID EmailJS
  }

  onSubmit() {
    if (this.validateEmail(this.email)) {
      this.sendMessageToOwner();
      this.sendConfirmationToSender();
    } else {
      this.emailError = "L'adresse email saisie est incorrecte. Veuillez vérifier et réessayer.";
      this.analyticsService.logEvent('email_validation_error', { email: this.email });
    }
  }

  validateEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  }

  sendMessageToOwner() {
    const templateParams = {
      from_name: this.name,
      from_email: this.email,
      to_name: 'JEAN alexis Nirina albert',
      message: this.message,
      reply_to: this.email
    };

    emailjs.send('service_0y7fidt', 'template_bmmwslg', templateParams)
      .then((response) => {
        console.log('Email envoyé au propriétaire avec succès', response);
        this.analyticsService.logEvent('email_sent_to_owner', templateParams);
      }, (error) => {
        console.error('Erreur lors de l\'envoi de l\'email au propriétaire', error);
        this.analyticsService.logEvent('email_error_to_owner', { error: error.message });
        alert('Une erreur s\'est produite lors de l\'envoi de votre message. Veuillez réessayer plus tard.');
      });
  }

  sendConfirmationToSender() {
    const templateParams = {
      to_name: this.name,
      to_email: this.email,
      message: `Merci d'avoir visité mon portfolio. Je vous souhaite beaucoup de succès dans vos projets. J'ai bien reçu votre message et je m'engage à y répondre dans les plus brefs délais. N'hésitez pas à me contacter pour toute information supplémentaire. Cordialement, JEAN alexis Nirina albert`
    };

    emailjs.send('service_0y7fidt', 'template_gwamtqj', templateParams)
      .then((response) => {
        console.log('Email de confirmation envoyé avec succès à l\'utilisateur', response);
        this.analyticsService.logEvent('confirmation_email_sent', templateParams);
        this.resetForm();
        alert('Votre message a été envoyé avec succès ! Vous allez recevoir un email de confirmation.');
      }, (error) => {
        console.error('Erreur lors de l\'envoi de l\'email de confirmation à l\'utilisateur', error);
        this.analyticsService.logEvent('confirmation_email_error', { error: error.message });
        alert('Une erreur s\'est produite lors de l\'envoi de votre message. Veuillez réessayer plus tard.');
      });
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.message = '';
    this.emailError = '';
  }
}
