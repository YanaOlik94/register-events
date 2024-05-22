import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormRecord, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {User} from "../../classes/user.class";
import {EventService} from "../../services/event.service";

@Component({
  selector: 'app-event-registration',
  templateUrl: './event-registration.component.html',
  styleUrl: './event-registration.component.css'
})
export class EventRegistrationComponent implements OnInit {

  registerForm: FormRecord<FormControl<string | any>>;
  eventId!: number;

  constructor(formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private eventService: EventService) {
    this.registerForm = formBuilder.record({
      fullName: formBuilder.control('',
        [Validators.required,
          Validators.minLength(4), Validators.maxLength(32)],
      ),
      email: formBuilder.control('',
        [Validators.required, Validators.email]
      ),
      dateOfBirth: formBuilder.control('',
        [Validators.required]),
      referralSource: formBuilder.control('',
        [Validators.required]),
    })
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.eventId = params['id'];
    })
  }

  register() {

    let participant: User = {
      fullName: this.registerForm.controls['fullName'].value,
      email: this.registerForm.controls['email'].value,
      birthDate: new Date(this.registerForm.controls['dateOfBirth'].value).toISOString(),
      referralSource: this.registerForm.controls['referralSource'].value
    }
    this.eventService.registerUserToEvent(participant, this.eventId).subscribe((res) => {
      console.log('group created', res)
      this.registerForm.reset();
      alert('you are registered successfully!')
      this.router.navigate(['events'])
    }, err => {
      console.log(err)
    })
  }

  isValid(controlName: string): boolean {
    return this.registerForm.get(controlName)!.dirty && !this.registerForm.get(controlName)?.valid;
  }

  goBack() {
    this.router.navigate(['events'])
  }
}
