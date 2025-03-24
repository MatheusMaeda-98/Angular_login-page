import { afterNextRender, Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

interface signupForm {
  name: FormControl,
  email:FormControl,
  password:FormControl,
  passwordConfirm:FormControl,
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent, // Import the layout component
    ReactiveFormsModule, // Import the reactive forms module
    PrimaryInputComponent // Import the primary input component
  ],
  providers: [LoginService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup<signupForm>;

  constructor(
    private router:Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {
    
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
   }

   submit() {
      this.loginService.login(this.signupForm.value.email, this.signupForm.value.password).subscribe({
        next: () => this.toastService.success("Login feito com sucesso"),
        error: () => this.toastService.error("erro!")
      }) 

   }

   navigate() {
      this.router.navigate(["login"]);
    }
  
}
