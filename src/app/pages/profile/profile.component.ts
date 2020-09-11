import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
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
    wieght: new FormControl(''),
    activity: new FormControl('')
  })
  constructor(private calculate: CaloriesCalcService) {}

  ngOnInit(): void {
    this.calculate.caloriesIntake.subscribe(val => this.caloriesIntake = +val)
  }

  onSubmit(){
    this.profileForm.setValue(this.profileForm.value)
    this.calculate.calculateDailyIntake(this.profileForm.value)
  }

}
