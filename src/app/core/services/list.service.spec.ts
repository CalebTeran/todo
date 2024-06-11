import { TestBed } from '@angular/core/testing';

import { ListService } from './list.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

describe('ListService', () => {
  let service: ListService;
  let firestoreSpy: jasmine.SpyObj<AngularFirestore>;

  beforeEach(() => {
    const firestoreSpyObj = jasmine.createSpyObj('AngularFirestore', ['collection']);
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListService);
    firestoreSpy = TestBed.inject(AngularFirestore) as jasmine.SpyObj<AngularFirestore>;
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

});
