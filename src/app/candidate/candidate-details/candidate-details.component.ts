import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CandidateService } from 'src/app/shared/Services/CandidateService/candidate.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import * as XLSX from "xlsx";


@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})

export class CandidateDetailsComponent {
  file: File;
  arrayBuffer: any;
  filelist: any;

  displayedColumns: string[] = ['candidateName', 'dob', 'mobileNo', 'email',
    'gender', 'skills', 'joiningDate', 'location', 'address',
    'pincode', 'status', 'isInternal', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _candidateService: CandidateService,
    // private mappingService: CandidatemappingService,
    // private excelService: ExcelService,
    // public formBuilder: FormBuilder,
    // private login: LoginService,
    // private router: Router
  ) { }
  ngOnInit(): void {
    // this.isAuthor = JSON.parse(sessionStorage.getItem("author"));
    this.GetCandidateData();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  GetCandidateData() {
    this._candidateService.GetAllCandidatesData().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  DownloadExcel() {

  }
  // download() {
  //   // let downloadList:CandidateModel[]=this.CandidateList.filter( x=> this.compareFromDates(x.joiningDate,this.fromDate) && this.compareToDates(x.joiningDate,this.endDate));
  //   this.fromDate = new DatePipe("en-US").transform(
  //     this.fromDate,
  //     "yyyy-MM-dd"
  //   );
  //   this.endDate = new DatePipe("en-US").transform(this.endDate, "yyyy-MM-dd");
  //   console.log(this.fromDate + " " + this.endDate);
  //   this._candidateService.GetCandidateByDate(this.fromDate, this.endDate)
  //     .subscribe((data) => {
  //       if (data != null || data != undefined) {
  //         for (var i in data) {
  //           if (data[i].isInternal == true) {
  //             this.isInternal = "Yes";
  //           } else {
  //             this.isInternal = "No";
  //           }
  //           const keyValuePairs: { [key: string]: string } = {
  //             candidateName: data[i].candidateName,
  //             mobileNo: data[i].mobileNo,
  //             gender: data[i].gender,
  //             dob: data[i].dob,
  //             email: data[i].email,
  //             location: data[i].location,
  //             skills: data[i].skills,
  //             joiningDate: data[i].joiningDate,
  //             address: data[i].address,
  //             status: data[i].status,
  //             pincode: data[i].pincode,
  //             isInternal: this.isInternal,
  //           };
  //           this.downloadData.push(keyValuePairs);
  //           console.log(this.downloadData);
  //         }
  //         console.log(data.length);
  //         this.downloadObject = this.createObject(this.downloadData);
  //         let headers = [
  //           [
  //             "Candidate Name",
  //             "Mobile No",
  //             "Gender",
  //             "DOB",
  //             "Email",
  //             "Location",
  //             "Skills",
  //             "Joining Date",
  //             "Address",
  //             "Status",
  //             "Pincode",
  //             "isInternal",
  //           ],
  //         ];
  //         this.excelService.jsonExportAsExcel(
  //           this.downloadObject,
  //           "Candidate Details",
  //           headers
  //         );

  //       } else alert("No Records found!");

  //     });

  // }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      // console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      this.filelist = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      this._candidateService.PostCandidateDuplicateCheck(this.filelist).subscribe((x) => {

        alert(x);
        this._candidateService.GetAllCandidatesData().subscribe(
          (data) => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          },
          (err) => {
            console.log(err);
          }
        );
      });
    };
  }

  deleteDetails(candidate: any) {
    this._candidateService.DeleteCandidateData(candidate.candidateId).subscribe((res) => {
      alert(res);
      this.GetCandidateData();
    });
  }
}
