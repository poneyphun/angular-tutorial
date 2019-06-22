import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HeroDetailComponent } from './hero-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Hero } from '../Hero';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { of, from }from 'rxjs';
import { HeroService } from '../hero.service';
import { inject } from '@angular/core/testing';


const mock_heroes : Hero[] = [
  { id: 1, name: 'test1' },
  { id: 2, name: 'test2' },
  { id: 3, name: 'test3' },
];

const locationStub = {
  back: jasmine.createSpy('back')
};

const heroStub: Hero = {id:1,  name:"test1"};
// const heroStub: Hero = new Hero;

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let activateRoute: ActivatedRoute;
  let heroService : HeroService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule, FormsModule],
      declarations: [ HeroDetailComponent ],
      providers : [ HeroService, {provide: Location, useValue:locationStub }, 
      {provide: ActivatedRoute, useValue: {snapshot: {paramMap: {get: (id: number) => {id: 1} }}}}]  
    })
    .compileComponents();
  }))

  beforeEach(inject ([HeroService], h => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    activateRoute = TestBed.get(ActivatedRoute);
    // heroService = TestBed.get(HeroService);
    heroService = h;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have input info', () => {
    const heroComponent = fixture.debugElement.componentInstance;
    heroComponent.hero = heroStub;
    expect(heroComponent.hero).toBeTruthy();
  })

  describe("call fake getHero() function", () => {
    it('should get the specific hero details', () => {
      const id =+ activateRoute.snapshot.paramMap.get('id');
      const heroSpy = (mock_heroes.find(hero => hero.id === id));
      
      spyOn(heroService, 'getHero').withArgs(id).and.returnValue(of(heroSpy));
      
      component.getHero();
      fixture.detectChanges();
      expect(component.hero).toEqual((heroSpy));
      });
  });

  it('should dsiplay hero detail title based on the route input text', () => {
    component.hero = heroStub;
    fixture.detectChanges();

    const de = fixture.debugElement.query(By.css('h2'));
    expect(de.nativeElement.textContent).toEqual((heroStub.name).toUpperCase()+" Details");
  })

  describe('when name input change', () => {
    beforeEach(() =>{
      component.hero = heroStub;
      fixture.detectChanges();
    })

    it('should change the display name based on the input in sync1', async (() => {    
      const inputNameDe = fixture.debugElement.query(By.css('input[name="name"]'));
      const inputNameEl = inputNameDe.nativeElement;
      inputNameEl.value = "update test 1";
      inputNameEl.dispatchEvent(new Event ('input'));

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const de = fixture.debugElement.query(By.css('h2'));
        expect(de.nativeElement.textContent).toEqual('UPDATE TEST 1 Details');
      });
    }))

    it('should change the display name based on the input in sync2', fakeAsync(() => {    
      const inputNameDe = fixture.debugElement.query(By.css('input[name="name"]'));
      const inputNameEl = inputNameDe.nativeElement;
      inputNameEl.value = "update test 1";
      inputNameEl.dispatchEvent(new Event ('input'));
      tick();
      fixture.detectChanges();
      const de = fixture.debugElement.query(By.css('h2'));
      expect(de.nativeElement.textContent).toEqual('UPDATE TEST 1 Details');
    }))
  })

  describe('when click back buttton', () => {
    it ('should back to previous position', () => {
      component.goBack();
      const location = fixture.debugElement.injector.get(Location);
      expect(location.back).toHaveBeenCalled();
    });
  });
});
