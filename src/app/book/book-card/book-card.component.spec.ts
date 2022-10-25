import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { mochBookNa } from '../models/book-na';

import { BookCardComponent } from './book-card.component';

@Component({
  template: `<ws-book-card [content]="book"></ws-book-card>`
})
class SandBoxComponent {
  book = {
    abstract: 'Hans',
    author: 'Hans',
    cover: 'Hans',
    isbn: 'Hans',
    title: 'Hans',
    subtitle: 'Hans',
    numPages: 0,
    publisher: 'Hans'
  };
}

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;
  let view: HTMLElement;

  let component_: SandBoxComponent;
  let fixture_: ComponentFixture<SandBoxComponent>;
  let view_: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookCardComponent, SandBoxComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: Title,
          useValue: {
            setTitle: (s: string) => {
              console.log('====>', s);
            }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCardComponent); // <==
    component = fixture.componentInstance;
    fixture.detectChanges(); // <== sync ctrl <==> templ
    view = fixture.nativeElement;

    fixture_ = TestBed.createComponent(SandBoxComponent); // <==
    view_ = fixture_.nativeElement;
    fixture_.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When no content is passed', () => {
    it('defaults to "n/a"', () => {
      // console.log(Object.values(component.content));
      // expect(Object.values(component.content).every(v => v)).toBeTruthy();
      expect(component.content).toEqual(mochBookNa);
      expect(component.content.isbn).toBe('n/a');
      // Write your test here, please
    });

    it('display to "n/a"', () => {
      component.content.title = 'Moin';
      fixture.detectChanges();
      expect((view.querySelector('mat-card-title') as HTMLElement).innerText).toBe('Moin');
    });
  });

  describe('Check Hans', () => {
    it('should show hans from input binding', () => {
      expect((view_.querySelector('mat-card-title') as HTMLElement).innerText).toBe('Hans');
    });
  });
});
