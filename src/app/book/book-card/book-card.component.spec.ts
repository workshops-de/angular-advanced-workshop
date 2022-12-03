import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { bookNa } from '../models';

import { BookCardComponent } from './book-card.component';

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('eveything should be "n/a"', () => {
    expect(component.content).toEqual({
      abstract: 'n/a',
      author: 'n/a',
      cover: 'n/a',
      isbn: 'n/a',
      title: 'n/a',
      subtitle: 'n/a',
      numPages: 0,
      publisher: { name: 'n/a', url: 'n/a' }
    });
  });
  it('should show title and subtitle in template', () => {
    component.content.title = 'Hurbel Wonz';
    component.content.subtitle = 'Moin';
    fixture.detectChanges();
    const elem = fixture.nativeElement as HTMLElement;
    expect(elem.querySelector('mat-card-title')?.innerHTML).toBe('Hurbel Wonz');
    expect(elem.querySelector('mat-card-subtitle')?.innerHTML).toBe('Moin');
  });
});

describe('use Spectator', () => {
  let spectator: Spectator<BookCardComponent>;
  const book = { ...bookNa(), title: 'MOIN' };
  const createComponent = createComponentFactory(BookCardComponent);
  // const createComponent = createComponentFactory({ component: BookCardComponent, imports: [RouterTestingModule] });
  beforeEach(() => {
    spectator = createComponent();
  });
  it('should show "n/a" with no content', () => {
    expect(spectator.query('mat-card-title')?.innerHTML).toBe('n/a');
  });
  it('should show "MOIN" with content', () => {
    spectator.setInput('content', book);
    expect(spectator.query('mat-card-title')?.innerHTML).toBe('MOIN');
  });
});
