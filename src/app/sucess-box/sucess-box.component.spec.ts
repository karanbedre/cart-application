import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessBoxComponent } from './sucess-box.component';

describe('SucessBoxComponent', () => {
  let component: SucessBoxComponent;
  let fixture: ComponentFixture<SucessBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucessBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucessBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
