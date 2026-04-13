import { Component, output, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'ws-search-input',
  imports: [FormField, MatFormField, MatLabel, MatInput, MatButton],
  template: `
    <form (submit)="emitSearchFormUpdate($event)">
      <mat-form-field>
        <mat-label>Search</mat-label>
        <input
          type="search"
          role="search"
          matInput
          [formField]="searchForm.searchQuery"
          placeholder="Search a book..."
        />
      </mat-form-field>
      <button mat-raised-button color="primary" data-testid="book-search-submit" type="submit">Search</button>
    </form>
  `
})
export class SearchInput {
  private readonly searchModel = signal({ searchQuery: '' });
  protected searchForm = form(this.searchModel);

  update = output<string>();

  emitSearchFormUpdate(event: Event) {
    event.preventDefault();

    this.update.emit(this.searchForm.searchQuery().value());
  }
}
