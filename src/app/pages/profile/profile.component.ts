import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LocalstorageCrudService } from 'src/app/services/localstorage-crud.service';
import { CaloriesCalcService } from '../../services/calories-calc.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})

export class ProfileComponent implements OnInit {
  caloriesIntake = 0;
  profileForm = new FormGroup({
    age: new FormControl(''),
    gender: new FormControl(''),
    height: new FormControl(''),
    weight: new FormControl(''),
    activity: new FormControl(''),
  });
  
  constructor(private calculate: CaloriesCalcService, private localStorage: LocalstorageCrudService) {}

  ngOnInit(): void {
    this.getProfile();

    this.calculate.caloriesIntake.subscribe(
      (val) => (this.caloriesIntake = +val)
    );
    this.calculate.calculateDailyIntake(this.profileForm.value);
  }

  onSubmit() {
    this.profileForm.setValue(this.profileForm.value);
    this.calculate.calculateDailyIntake(this.profileForm.value);
    this.saveProfile();
  }

  saveProfile() {
    localStorage.setItem('profile', JSON.stringify(this.profileForm.value));
  }

  getProfile() {
    if (
      localStorage.getItem('profile') === null ||
      localStorage.getItem('profile') == undefined
    ) {
      return;
    }
    this.profileForm.setValue(JSON.parse(localStorage.getItem('profile')));
  }
}
