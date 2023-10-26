import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      question: ['Yes', Validators.required],
    });
  }
  

  onSubmit() {
    console.log(this.signUpForm.valid);
    
    if (this.signUpForm.valid) {
      // Handle form submission
      console.log(this.signUpForm.value);
      let data = {
        "email":this.signUpForm.value.email,
        "name":this.signUpForm.value.name,
        "password":this.signUpForm.value.password
      }
      this.userService.signUp(data).subscribe(
        (res) => {
          // Handle the successful response here
          console.log(res);
        },
        (error) => {
          // Handle errors here
          console.error(error);
        }
      );

    }
  }
}
