import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { bookNa } from '../models';
import { BookListComponent } from './book-list.component';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let service: BookApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookListComponent],
      imports: [RouterTestingModule, HttpClientTestingModule]
    }).compileComponents();
    service = TestBed.inject(BookApiService);
    spyOn(service, 'getAll').and.returnValue(of([bookNa()]));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should show one book', () => {
    const elem = fixture.nativeElement as HTMLElement;
    expect(elem.querySelectorAll('ws-book-card').length).toBe(1);
  });
});
