import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrgComponent } from './list-org.component';

describe('ListOrgComponent', () => {
  let component: ListOrgComponent;
  let fixture: ComponentFixture<ListOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListOrgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
