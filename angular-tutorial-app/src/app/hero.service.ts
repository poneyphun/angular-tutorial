import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of} from 'rxjs';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})

export class HeroService {
  /* getHeroes(): Hero[] {
    return HEROES;
  }*/

  constructor(private messagesService: MessagesService) { }

  getHeroes(): Observable<Hero[]> {
    this.messagesService.add('HeroService: fetched heroes');
    return of (HEROES);
  }

  getHero(id: number): Observable<Hero> {
    this.messagesService.add('HeroService: fetched heroes');
    return of (HEROES.find(hero => hero.id === id));
  }

  addHero(hero: Hero): Observable<Hero[]>{
    HEROES.push(hero); 
    return of (HEROES);
  }
}
