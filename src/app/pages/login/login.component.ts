import { afterNextRender, Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent, // Import the layout component
    ReactiveFormsModule, // Import the reactive forms module
    PrimaryInputComponent // Import the primary input component
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private router:Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {
    
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
   }

   submit() {
      this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: () => this.toastService.success("Login feito com sucesso"),
        error: () => this.toastService.error("erro!")
      }) 

   }

   navigate() {
      this.router.navigate(["/signup"]);
    }
  
}
