import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContactService } from '../../services/contacts.service';
import { NgForm } from '@angular/forms';
import { Contact } from '../contact-list/contact';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  model = <Contact>{};
  submitted = false;
  btnName = 'Submit';
  @Output() addContact = new EventEmitter<Contact>();

  @Input() contact: any = {};

  constructor(private contactService: ContactService) {}

  ngOnChanges() {
    console.log(this.contact);
    if (this.contact != null) {
      this.model = this.contact;
    }
  }

  ngOnInit(): void {}

  createNew() {
    return {} as Contact;
  }

  onSubmit(contactForm: NgForm) {
    if (!contactForm.value.firstName) {
      alert('First Name is required');
      return;
    }

    if (!contactForm.value.lastName) {
      alert('Last Name is required');
      return;
    }

    if (!contactForm.value.email) {
      alert('Email is required');
      return;
    }

    this.submitted = true;

    if (!this.contact) {
      this.contactService.postContact(this.model).subscribe((contact) => {
        console.log('object saved', contact);
        this.model = this.createNew();
        this.submitted = false;
        contactForm.resetForm();

        this.addContact.emit(this.model);
      });

      console.log('submitted');
    } else {
      this.contactService.putContact(this.model).subscribe((contact) => {
        console.log('object saved', contact);
        this.model = this.createNew();
        this.submitted = false;
        contactForm.resetForm();

        this.addContact.emit(this.model);
      });
    }
  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }
}
