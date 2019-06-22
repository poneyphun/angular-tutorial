import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-create',
  templateUrl: './hero-create.component.html',
  styleUrls: ['./hero-create.component.css']
})

export class HeroCreateComponent implements OnInit {
  angForm: FormGroup;
  submitted = false;
  newHeroList: Hero[];

  constructor(private fb: FormBuilder, private heroService: HeroService) {  }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.angForm = this.fb.group({
      id:['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // convinence getter for easy access to form fields
  get f() { return this.angForm.controls; }

  onSubmit(){
    if (!this.angForm.valid) {
      window.scrollTo(0, 0);
      return;
    }

    const newHero = new Hero();
    newHero.id = this.angForm.value.id;
    newHero.name = this.angForm.value.name;

    this.heroService.addHero(newHero).subscribe(heroes => this.newHeroList=heroes);

    alert('SUCCESS');
  }
}
