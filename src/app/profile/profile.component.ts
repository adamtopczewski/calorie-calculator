import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { getLocalePluralCase } from '@angular/common';

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
  constructor() {}

  ngOnInit(): void {

  }

  onSubmit(){
    this.calculateDaily(this.profileForm.value)
    this.profileForm.setValue(this.profileForm.value)
    console.log(this.profileForm)
  }

  calculateDaily(formValues){
    const W = +formValues.wieght
    const H = +formValues.height
    const A = +formValues.age
    let BMR;

    if(formValues.gender == "male"){
      BMR = 10*W + 6.25 * H - 5 * A + 5
    } else {
      BMR = 10*W + 6.25 * H - 5 * A - 161
    }
    this.caloriesIntake = BMR * +formValues.activity
  }
}
