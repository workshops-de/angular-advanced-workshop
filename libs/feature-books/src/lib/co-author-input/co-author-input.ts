import { Component, input, model, output } from '@angular/core';
import { FormValueControl, ValidationError } from '@angular/forms/signals';

@Component({
  selector: 'app-co-author-input',
  templateUrl: './co-author-input.html'
})
export class CoAuthorInput implements FormValueControl<string> {
  value = model('');

  touched = input(false);
  touch = output<void>();
  disabled = input(false);
  invalid = input(false);
  errors = input<readonly ValidationError[]>([]);

  remove = output<void>();
}
