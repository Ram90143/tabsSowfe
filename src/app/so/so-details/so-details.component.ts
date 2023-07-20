import { Component, Inject, LOCALE_ID, ViewChild, inject} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { SOModel } from 'src/app/Models/SOModel';
import { FormBuilder, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountModel } from 'src/app/Models/AccountModel';
import { DellManagerModel } from 'src/app/Models/DellManagerModel';
import { LocationModel } from 'src/app/Models/LocationModel';
import { MappingModel } from 'src/app/Models/MappingModel';
import { RecruiterModel } from 'src/app/Models/RecruiterModel';
import { RegionModel } from 'src/app/Models/RegionModel';
import { StatusModel } from 'src/app/Models/StatusModel';
import { TechnologyModel } from 'src/app/Models/TechnologyModel';
import { USTPOCModel } from 'src/app/Models/USTPOCModel';
import { USTTPMModel } from 'src/app/Models/USTTPMModel';
import { SoService } from 'src/app/shared/Services/SoService/so.service';
import { RegionService } from 'src/app/shared/Services/RegionService/region.service';
import { LocationService } from 'src/app/shared/Services/LocationService/location.service';
import { AccountService } from 'src/app/shared/Services/AccountService/account.service';
import { UstTpmService } from 'src/app/shared/Services/UsttpmService/ust-tpm.service';
import { UstPocService } from 'src/app/shared/Services/UstpocService/ust-poc.service';
import { RecruiterService } from 'src/app/shared/Services/RecruiterService/recruiter.service';
import { DellManagerService } from 'src/app/shared/Services/DellManagerService/dell-manager.service';
import { StatusService } from 'src/app/shared/Services/StatusService/status.service';
import { TechnologyService } from 'src/app/shared/Services/TechnologyService/technology.service';
import { CandidateMappingService } from 'src/app/shared/Services/CandidateMappingService/candidate-mapping.service';
import { ExcelService } from 'src/app/shared/Services/ExcelService/excel.service';
import { MatDateRangeInput, MatDatepicker } from '@angular/material/datepicker';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-so-details',
  templateUrl: './so-details.component.html',
  styleUrls: ['./so-details.component.css'],
})
export class SoDetailsComponent {
  file: File;
  arrayBuffer: any;
  filelist: any;
  Id: any = null;
  editmode: boolean = false;
  sowlist: SOModel[] = [];
  regionList: RegionModel[] = [];
  accountList: AccountModel[] = [];
  technologyList: TechnologyModel[] = [];
  locationList: LocationModel[] = [];
  ustPocList: USTPOCModel[] = [];
  ustTpmList: USTTPMModel[] = [];
  recruiterList: RecruiterModel[] = [];
  dellManagerList: DellManagerModel[] = [];
  statusList: StatusModel[] = [];
  mappinglst: MappingModel[] = [];
  selectedRegionId: string = '';
  isRegionSelected: boolean = false;
  fromDate: Date | null | any = null;
  endDate: Date | null | any = null;
  startDate: Date | null = null;
  isFormVisible: boolean = false;
  dataSource: MatTableDataSource<any>;
  picker: MatDatepicker<any>;
  rangeInput: MatDateRangeInput<Date>;
  displayedColumns: string[] = [
    'soName',
    'jrCode',
    'account',
    'requestCreationDate',
    'technologyName',
    'role',
    'region',
    'location',
    'targetOpenPositions',
    'positionsTobeClosed',
    'ustpocName',
    'recruiterName',
    'usttpmName',
    'dellManagerName',
    'statusName',
    'band',
    'projectId',
    'accountManager',
    'externalResource',
    'internalResource',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  jsonArray: any;

  constructor(
    private excelService: ExcelService,
    private route: Router,
    private service: SoService,
    private regionService: RegionService,
    private locationService: LocationService,
    private accountService: AccountService,
    private tpmService: UstTpmService,
    private pocService: UstPocService,
    private recruiterService: RecruiterService,
    private dellManagerService: DellManagerService,
    private techService: TechnologyService,
    private statusService: StatusService,
    private mappingService: CandidateMappingService,
    @Inject(LOCALE_ID) public locale: string
  ) {}
  ngOnInit(): void {
    this.GetSowData();
    this.GetDropdown1();
    this.GetDropdown2();
    this.GetDropdown3();
    this.GetDropdown4();
    this.GetDropdown5();
    this.GetStatusByType();
    this.GetDropdown7();
    this.GetDropdown8();
    this.GetDropdown11();
    this.GetDropdown10();
    this.GetSowData();
  }
  cancelfilter() {
    this.isFormVisible = !this.isFormVisible;
    this.GetSowData();
  }
  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
  }

  GetSowData() {
    this.service.GetAllSowData().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.applyFilter();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  inputClear(controlNames: string[]) {
    for (const name of controlNames) {
      const control = this.SowForm.get(name);
      if (control) {
        control.reset();
      }
    }
    this.GetSowData();
  }
  ClearFilter(){
    this.SowForm.reset()
    this.applyFilter()
  }


  applyFilter() {
    if (!this.dataSource) {
      console.log('Data source is not available');
      return;
    }


    const filterValues = this.SowForm.value as unknown as {
      soName: string | '';
      jrCode: string | null;
      fromDate: Date ;
      endDate: Date ;
      accountId: string | '';
      technologyId: string | null;
      regionId: string | null;
      role: string | null;
      locationId: string | null;
      targetOpenPositions: string | null;
      positionsTobeClosed: string | null;
      ustpocId: string | null;
      recruiterId: string | null;
      usttpmId: string | null;
      dellManagerId: string | null;
      statusId: string | null;
      band: string | null;
      projectId: string | null;
      accountManager: string | null;
      externalResource: string | null;
      internalResource: string | null;
    };

    this.dataSource.filterPredicate = (item: any) => {
      const compare = (value1: string, value2: string) => {
        return value1.toLowerCase().includes(value2.toLowerCase());
      };

      if (filterValues.soName && !compare(item.soName, filterValues.soName)) {
        return false;
      }

      if (filterValues.jrCode && !compare(item.jrCode, filterValues.jrCode)) {
        return false;
      }
      if (
        filterValues.fromDate && filterValues.endDate && !((new Date(item.requestCreationDate)) >= (new Date(filterValues.fromDate)) &&(new Date(item.requestCreationDate)) <= (new Date(filterValues.endDate))) && !(
          (new Date(item.requestCreationDate)) === (new Date(filterValues.fromDate)) &&
          (new Date(item.requestCreationDate)) === (new Date(filterValues.endDate))
        )
      ) {
        return false;
      }



      if (filterValues.technologyId && item.technologyId !== filterValues.technologyId) {
        return false;
      }

      if (filterValues.accountId && item.accountId !== filterValues.accountId) {
        return false;
      }

      if (filterValues.regionId && item.regionId !== filterValues.regionId) {
        return false;
      }

      if (filterValues.locationId && item.locationId !== filterValues.locationId) {
        return false;
      }

      if (filterValues.ustpocId && item.ustpocId !== filterValues.ustpocId) {
        return false;
      }

      if (filterValues.recruiterId && item.recruiterId !== filterValues.recruiterId) {
        return false;
      }

      if (filterValues.usttpmId && item.usttpmId !== filterValues.usttpmId) {
        return false;
      }
      if (filterValues.dellManagerId && item.dellManagerId !== filterValues.dellManagerId) {
        return false;
      }

      if (filterValues.statusId && item.statusId !== filterValues.statusId) {
        return false;
      }
      if (filterValues.role && !compare(item.role, filterValues.role)) {
        return false;
      }
      if (filterValues.band && !compare(item.band, filterValues.band)) {
        return false;
      }
      if (filterValues.projectId && item.projectId !== filterValues.projectId) {
        return false;
      }

      if (filterValues.accountManager && !compare(item.accountManager, filterValues.accountManager))
        {
        return false;
      }

      if (
        filterValues.externalResource &&
        !compare(item.externalResource, filterValues.externalResource)
      ) {
        return false;
      }

      if (
        filterValues.internalResource &&
        !compare(item.internalResource, filterValues.internalResource)
      ) {
        return false;
      }

      return true;
    };
    this.dataSource.filter = 'customFilter';
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private fb = inject(FormBuilder);
  SowForm = this.fb.group({
    soName: [''],
    jrCode: [null],
    accountId: [null],
    fromDate: [null],
    endDate: [null],
    technologyId: [null],
    regionId: [null],
    role: [null],
    locationId: [null],
    ustpocId: [null],
    recruiterId: [null],
    usttpmId: [null],
    dellManagerId: [null],
    statusId: [null],
    band: [null],
    projectId: [null],
    accountManager: [null],
    externalResource: [null],
    internalResource: [null],
  });

  addfile(event: any) {
    this.file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join('');
      var workbook = XLSX.read(bstr, { type: 'binary' });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      this.filelist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log(this.filelist);

      this.service.PostSOWDuplicateCheck(this.filelist).subscribe((x) => {
        alert(x);
        this.service.GetAllSowData().subscribe(
          (data) => {
            this.sowlist = data;
            console.log('SOW');
            console.log(this.sowlist);
          },
          (err) => {
            console.log(err);
          }
        );
      });

      console.log(this.sowlist);
    };
  }
  DownloadExcel() {
    const filteredData = this.dataSource.filteredData;
    if (filteredData.length > 0) {
      const headers = [
        'SO Name',
        'JR Code',
        'Request Creation Date',
        'Account',
        'Technology',
        'Role',
        'Region',
        'Location',
        'Target Open Positions',
        'Positions Tobe Closed',
        'Ust POC',
        'Recruiter',
        'Ust TPM',
        'Dell Manager',
        'Status',
        'Band',
        'Project Id',
        'Account Manager',
        'External Resource',
        'Internal Resource',
      ];

      const downloadData = filteredData.map((data) => ({
        'SO Name': data.soName,
        'JR Code': data.jrCode,
        'Request Creation Date': data.requestCreationDate,
        Account: data.accountName,
        Technology: data.technologyName,
        Role: data.role,
        Region: data.region,
        Location: data.location,
        'Target Open Positions': data.targetOpenPositions,
        'Positions Tobe Closed': data.positionsTobeClosed,
        'Ust POC': data.ustpocName,
        Recruiter: data.recruiterName,
        'Ust TPM': data.usttpmName,
        'Dell Manager': data.dellManagerName,
        Status: data.statusName,
        Band: data.band,
        'Project Id': data.projectId,
        'Account Manager': data.accountManager,
        'External Resource': data.externalResource,
        'Internal Resource': data.internalResource,
      }));

      this.excelService.jsonExportAsExcel(downloadData, 'SO Details', headers);
    } else {
      alert('No Records found!');
    }
  }

  updateSODetails(row: SOModel): void {
    row.isEditing = !row.isEditing;
  }

  saveSODetails(row: any): void {
      row.requestCreationDate= this.formatdate(row.requestCreationDate)+"T00:00:00.00Z",
      row.type= 'update',
      this.service.UpdateSowData(row.sowId, row).subscribe(
      (response) => {
        console.log('SOW data updated successfully', response);
        row.isEditing = false;

        this.GetSowData();
      },
      (error) => {
        console.error('Error updating SOW data', error);
      }
    );
  }

  cancelEdit(row: any): void {
    row.isEditing = false;
    this.GetSowData();
  }

  deleteDetails(data: any) {
    this.Id = data.sowId;
    var obj: any = null;
    var decision = confirm('Are you sure you want to delete?');
    if (decision) {
      this.mappinglst.find((x: any) => {
        if (x.sowId == this.Id) {
          obj = x;
        }
      });
      if (obj == null) {
        this.service.DeleteSowData(data.sowId).subscribe((res) => {
          alert(res);
          this.GetSowData();
          this.Id = null;
        });
      } else {
        alert(
          'Mapping Exists for this SO with candidate.' +
            '\n' +
            'Please unmap and then delete'
        );
      }
    } else {
      alert('Data not deleted');
    }
  }

  GetDropdown1() {
    return new Promise((res, rej) => {
      this.accountService.GetAllAccountData().subscribe((result) => {
        this.accountList = result;
        res('');
      });
    });
  }

  GetDropdown2() {
    return new Promise((res, rej) => {
      this.techService.GetAllTechData().subscribe((result) => {
        this.technologyList = result;
        res('');
      });
    });
  }

  GetDropdown3() {
    return new Promise((res, rej) => {
      this.recruiterService.GetAllRecruiterData().subscribe((result) => {
        this.recruiterList = result;
        res('');
      });
    });
  }

  GetDropdown4() {
    return new Promise((res, rej) => {
      this.pocService.GetAllUstPocData().subscribe((result) => {
        this.ustPocList = result;
        res('');
      });
    });
  }

  GetDropdown5() {
    return new Promise((res, rej) => {
      this.dellManagerService.GetAllDellManagerData().subscribe((result) => {
        this.dellManagerList = result;
        res('');
      });
    });
  }

  getStatus() {
    return new Promise((res, rej) => {
      this.statusService.GetAllStatusData().subscribe((result) => {
        this.statusList = result;
        res('');
      });
    });
  }

  GetStatusByType() {
    return new Promise((res, rej) => {
      this.statusService.GetStatusByType(0).subscribe((result) => {
        this.statusList = result;
        res('');
      });
    });
  }

  GetDropdown7() {
    return new Promise((res, rej) => {
      this.regionService.GetAllRegionData().subscribe((result) => {
        this.regionList = result;
        res('');
      });
    });
  }

  GetDropdown8() {
    return new Promise((res) => {
      this.tpmService.GetAllUSTTPMData().subscribe((result) => {
        this.ustTpmList = result;
        res('');
      });
    });
  }

  onRegionSelected(regionId: string): void {
    this.selectedRegionId = regionId;
    console.log('Selected region:', this.selectedRegionId);
    this.GetDropdown9(regionId);
    this.isRegionSelected = true;
  }

  GetDropdown9(id: any) {
    return new Promise((res, rej) => {
      this.locationService.GetLocationByRegionId(id).subscribe((result) => {
        this.locationList = result;
        console.log(this.locationList);
        res('');
      });
    });
  }
  GetDropdown11() {
    return new Promise((res, rej) => {
      this.locationService.GetAllLocationData().subscribe((result) => {
        this.locationList = result;
        console.log(this.locationList);
        res('');
      });
    });
  }
  GetDropdown10() {
    return new Promise((res, rej) => {
      this.mappingService.GetAllCandidateMappingData().subscribe((result) => {
        this.mappinglst = result;
        res('');
      });
    });
  }

  formatdate(date:any){
    return formatDate(date,'yyyy-MM-dd',this.locale)
  }
}
