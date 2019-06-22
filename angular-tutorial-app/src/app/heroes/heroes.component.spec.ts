import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { of } from 'rxjs';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroService: jasmine.SpyObj<HeroService>;

  const mock_heroes : Hero[] = [
    { id: 1, name: 'Hero1' },
    { id: 2, name: 'Hero2' },
    { id: 3, name: 'Hero3' },
    { id: 4, name: 'Hero4' },
    { id: 5, name: 'Hero5' },
  ];

  const mock_heroes_compare : Hero[] = [
    { id: 2, name: 'Hero2' },
    { id: 3, name: 'Hero3' },
    { id: 4, name: 'Hero4' },
    { id: 5, name: 'Hero5' },
  ]

  beforeEach(async(() => {
    const heroServiceMOck = jasmine.createSpyObj('HeroService', {getHeroes: of([])});
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ HeroesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
