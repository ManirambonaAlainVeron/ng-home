import { Component, Inject, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { Housinglocation } from '../housing-location/housinglocation';
import { ReactiveFormsModule,FormControl,FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingLocation: Housinglocation | undefined;
    housingLocationId = -1;

    applyForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('')
    })

    constructor(private housingService:HousingService) {
      const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
      this.housingService.getHousingLocationById(housingLocationId).then(housinglocation => {
        this.housingLocation = housinglocation;
      });
    }

    submitApplication() {
      this.housingService.submitApplication(
        this.applyForm.value.firstName ?? '',
        this.applyForm.value.lastName ?? '',
        this.applyForm.value.email ?? ''
      );
    }
}
