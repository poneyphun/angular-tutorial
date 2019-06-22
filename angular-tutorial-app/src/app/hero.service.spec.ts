import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';
import { MessagesService } from './messages.service';

describe('HeroService', () => {
  // let messageService: jasmine.SpyObj<MessagesService>;

  beforeEach(() => {
  });

  it('should be created', () => {
    const service: HeroService = TestBed.get(HeroService);
    expect(service).toBeTruthy();
  });
});
