import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeroCreateComponent } from './hero-create.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeroCreateComponent', () => {
  let component: HeroCreateComponent;
  let fixture: ComponentFixture<HeroCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [ HeroCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
