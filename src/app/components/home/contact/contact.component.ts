import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  name: string = '';
  email: string = '';
  message: string = '';
  isLoading: boolean = false;

  constructor(
    public analyticsService: AnalyticsService
  ) { }

  ngOnInit(): void {
    emailjs.init("wvWdwj00Lkp_sd5Fa"); // Remplacez par votre User ID EmailJS
  }

  onSubmit() {
    this.isLoading = true;
    this.sendMessageToOwner();
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
        this.sendConfirmationToSender();
      }, (error) => {
        console.error('Erreur lors de l\'envoi de l\'email au propriétaire', error);
        this.analyticsService.logEvent('email_error_to_owner', { error: error.message });
        this.isLoading = false;
        this.showErrorToast();
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
        this.isLoading = false;
        this.resetForm();
        this.showSuccessToast();
      }, (error) => {
        console.error('Erreur lors de l\'envoi de l\'email de confirmation à l\'utilisateur', error);
        this.analyticsService.logEvent('confirmation_email_error', { error: error.message });
        this.isLoading = false;
        this.showErrorToast();
      });
  }

  showSuccessToast() {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 6000,
      timerProgressBar: true,
      icon: 'success',
      title: 'Message envoyé avec succès !',
      text: 'Vous allez recevoir un email de confirmation.'
    });
  }

  showErrorToast() {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 6000,
      timerProgressBar: true,
      icon: 'error',
      title: 'Erreur',
      text: 'Une erreur s\'est produite lors de l\'envoi de votre message. Veuillez réessayer plus tard.'
    });
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.message = '';
  }
}
