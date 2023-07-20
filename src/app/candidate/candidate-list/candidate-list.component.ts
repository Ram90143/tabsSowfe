import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidateService } from 'src/app/shared/Services/CandidateService/candidate.service';
import { StatusService } from 'src/app/shared/Services/StatusService/status.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent {

  constructor(private _candidateService: CandidateService,
    // private _router: ActivatedRoute,
    // private commonServ: CommonService,
    private _route: Router,
    private _statusService: StatusService
  ) { }

  hasUnitNumber = false;

  candidateform = new FormGroup({
    candidateName: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    mobileNo: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"),
    Validators.minLength(10), Validators.maxLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    joiningDate: new FormControl('', Validators.required),
    skills: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^[0-9]*$")]),
    isInternal: new FormControl(),
  })
  status = [
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
  ];


  onSubmit(): void {
    console.log(this.candidateform.value);
    if (this.candidateform.valid) {
      console.log(this.candidateform.value);
      let obj = this.candidateform.value;
      obj.isInternal = (obj.isInternal != true) ? false : true;
      this._candidateService.PostCandidateData(obj).subscribe(data => {
        alert(data);
        this.candidateform.reset();

      })
    }
    else{
      alert("All Fields are mandatory")
    }
  }


  // GetStatusByType() {
  //   return new Promise((res, rej) => {
  //     this._statusService.GetStatusByType(1).subscribe(result => {
  //       this.statusList = result;
  //       res('')
  //     })
  //   })
  // }
    cancel() {
      this._route.navigate(['/candidatedetails']);
    }

    canExit() {
      if (this.candidateform.dirty) {
        return confirm('You have unsaved changes. Do you really want to discard these changes?');
      }
      else {
        return true;
      }
    }
}
