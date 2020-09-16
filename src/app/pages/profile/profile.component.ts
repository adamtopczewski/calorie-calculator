import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IntakeCalcService } from '../../services/intake-calc.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})

export class ProfileComponent implements OnInit {
  caloriesIntake:number;
  profileForm = new FormGroup({
    age: new FormControl(''),
    gender: new FormControl(''),
    height: new FormControl(''),
    weight: new FormControl(''),
    activity: new FormControl(''),
  });

  constructor(private intakeCalc: IntakeCalcService) {}

  ngOnInit(): void {
    this.intakeCalc.getData().subscribe(val => this.caloriesIntake = val)
  }

  onSubmit() {
    this.profileForm.setValue(this.profileForm.value);
    this.intakeCalc.setData(this.profileForm.value)
  }

}
