import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { BookListComponent } from './book-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookApiService } from '../book-api.service';
import { bookNa } from '../models/book-na';

fdescribe('BookListComponent', () => {
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
        // {
        //   provide: BookApiService,
        //   useValue: bookApiMock
        // }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // <== sync ctrl <==> templ
    view = fixture.nativeElement;
    service = TestBed.inject(BookApiService);
    console.log(service);
    spyOn(service, 'getAll').and.returnValue(of([bookNa(), bookNa()]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    expect(view.querySelectorAll('ws-book-card').length).toBe(2);
  });
});
