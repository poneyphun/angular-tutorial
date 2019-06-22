import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroService } from '../hero.service';
import { Observable, of } from 'rxjs';
import { Hero } from '../hero';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  // let heroServiceSpy: jasmine.SpyObj<HeroService>; (NOT USE)
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

  class MockHero {
    public getHeroes(): Observable<Hero[]> {
      return of (mock_heroes);
    }
  }

  beforeEach(async(() => {
    const heroServiceMock = jasmine.createSpyObj('HeroService', {getHeroes: of([])} );
    // const heroServiceMock = jasmine.createSpyObj('HeroService', ['getHeroes'])

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ DashboardComponent ],
      // providers: [{provide: HeroService, useClass: MockHero}]
      providers: [{provide: HeroService, useValue: heroServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    // heroServiceSpy = TestBed.get(HeroService); (NOT USE)
    heroService = TestBed.get(HeroService);
    fixture.detectChanges(); 
  });

  it('should create', () => {
    // spyOn(heroService, 'getHeroes').and.returnValue(of([]))
    heroService.getHeroes.and.returnValue(of(mock_heroes));
    expect(component).toBeTruthy();
  });

  describe('when the component is ready', () =>{
    it('should get list of the heroes detail 1', () => {
      heroService.getHeroes.and.returnValue(of(mock_heroes));

      component.ngOnInit();  
      expect(heroService.getHeroes).toHaveBeenCalled();
      expect(component.heroes.length).toBe(4, 'hero list exist after init');
      expect(component.heroes).toEqual(mock_heroes_compare);
    });
  });
});
