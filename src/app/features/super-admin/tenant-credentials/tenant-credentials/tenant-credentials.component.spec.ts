import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantCredentialsComponent } from './tenant-credentials.component';

describe('TenantCredentialsComponent', () => {
  let component: TenantCredentialsComponent;
  let fixture: ComponentFixture<TenantCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantCredentialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
