import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

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
});
