import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-generator',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './password-generator.component.html',
  styleUrl: './password-generator.component.scss'
})
export class PasswordGeneratorComponent {
  password: string = '';
  length: number = 12;
  includeUppercase: boolean = true;
  includeLowercase: boolean = true;
  includeNumbers: boolean = true;
  includeSymbols: boolean = true;
  passwordStrength: string = '';

  generatePassword(): void {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let chars = '';

    if (this.includeUppercase) chars += uppercaseChars;
    if (this.includeLowercase) chars += lowercaseChars;
    if (this.includeNumbers) chars += numberChars;
    if (this.includeSymbols) chars += symbolChars;

    let generatedPassword = '';
    for (let i = 0; i < this.length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars.charAt(randomIndex);
    }

    this.password = generatedPassword;
    this.calculatePasswordStrength(this.password);
  }

  calculatePasswordStrength(password: string): void {
    const lengthScore = Math.min(password.length / 10, 1);
    const uppercaseScore = password.match(/[A-Z]/) ? 1 : 0;
    const lowercaseScore = password.match(/[a-z]/) ? 1 : 0;
    const digitScore = password.match(/\d/) ? 1 : 0;
    const symbolScore = password.match(/[^A-Za-z0-9]/) ? 1 : 0;

    const totalScore = lengthScore + uppercaseScore + lowercaseScore + digitScore + symbolScore;
    const strengthPercentage = (totalScore / 5) * 100;

    if (strengthPercentage < 40) {
      this.passwordStrength = 'Weak';
    } else if (strengthPercentage < 70) {
      this.passwordStrength = 'Moderate';
    } else {
      this.passwordStrength = 'Strong';
    }
  }
}
