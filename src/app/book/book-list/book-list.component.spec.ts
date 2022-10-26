import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { BookListComponent } from './book-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookApiService } from '../book-api.service';
import { bookNa } from '../models/book-na';

let mock = jasmine.createSpyObj<BookApiService>(['getAll']);
describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let view: HTMLElement;
  let service: BookApiService;
  //   let bookApiMock = jasmine.createSpyObj<BookApiService>(['getAll']);
  //   bookApiMock.getAll.and.returnValue(of([bookNa(), bookNa()]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        // BookApiService
        {
          provide: BookApiService,
          useValue: mock
        }
      ]
    }).compileComponents();
    service = TestBed.inject(BookApiService);
    // spyOn(service, 'getAll').and.returnValue(of([bookNa(), bookNa()]));
    mock.getAll.and.returnValue(of([bookNa(), bookNa()]));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    view = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();

    expect(view.querySelectorAll('ws-book-card').length).toBe(2);
  });
});
