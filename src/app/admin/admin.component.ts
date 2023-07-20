import { ExcelService } from 'src/app/shared/Services/ExcelService/excel.service';
import { UstPocService } from './../shared/Services/UstpocService/ust-poc.service';
import { DellManagerModel } from 'src/app/Models/DellManagerModel';
import { Component, OnInit, ViewChild, inject,AfterViewInit, } from '@angular/core';
import { AccountModel } from '../Models/AccountModel';
import { AccountService } from '../shared/Services/AccountService/account.service';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../shared/Services/admin.service';
import { RegionModel } from '../Models/RegionModel';
import { RecruiterModel } from '../Models/RecruiterModel';
import { USTTPMModel } from '../Models/USTTPMModel';
import { LocationModel } from '../Models/LocationModel';
import { USTPOCModel } from '../Models/USTPOCModel';
import { TechnologyModel } from '../Models/TechnologyModel';
import { RegionService } from '../shared/Services/RegionService/region.service';
import { LocationService } from '../shared/Services/LocationService/location.service';
import { UstTpmService } from '../shared/Services/UsttpmService/ust-tpm.service';
import { RecruiterService } from '../shared/Services/RecruiterService/recruiter.service';
import { DellManagerService } from '../shared/Services/DellManagerService/dell-manager.service';
import { TechnologyService } from '../shared/Services/TechnologyService/technology.service';
import { DomainModel } from '../Models/DomainModel';
import { DomainService } from '../shared/Services/DomainService/domain.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  selectedTab: string;
  searchFilter: string = '';
  accountDataSource: MatTableDataSource<AccountModel>;
  dellManagerDataSource: MatTableDataSource<DellManagerModel>;
  recruiterDataSource: MatTableDataSource<RecruiterModel>;
  ustPocDataSource: MatTableDataSource<USTPOCModel>;
  ustTpmDataSource: MatTableDataSource<USTTPMModel>;
  regionDataSource: MatTableDataSource<RegionModel>;
  domainDataSource: MatTableDataSource<DomainModel>;


  @ViewChild('accountPaginator') accountPaginator: MatPaginator;
  @ViewChild('dellManagerPaginator') dellManagerPaginator: MatPaginator;
  @ViewChild('regionPaginator') regionPaginator: MatPaginator;
  @ViewChild('recruiterPaginator') recruiterPaginator: MatPaginator;
  @ViewChild('ustPocPaginator') ustPocPaginator: MatPaginator;
  @ViewChild('ustTpmPaginator') ustTpmPaginator: MatPaginator;
  @ViewChild('domainPaginator') domainPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private accountService:AccountService, private regionService: RegionService,
    private locationService: LocationService, private domainService:DomainService,
    private tpmService: UstTpmService,
    private pocService: UstPocService,
    private recruiterService: RecruiterService,
    private dellManagerService: DellManagerService,
    private techService: TechnologyService, private excelService:ExcelService
  ) {

    // this.selectedTab = 'DellManager';

    // this.selectedTab = 'Location';
    // this.selectedTab = 'Registration';
    // this.selectedTab = 'Region';
    // this.selectedTab = 'Recruiter';
    // this.selectedTab = 'Technology';
    // this.selectedTab = 'USTPOC';
    // this.selectedTab = 'USTTPM';

    this.selectedTab = 'Account';


  }




  ngOnInit(): void {
    this.getAccounts();

  }


  onTabChange(event: MatTabChangeEvent): void {
    this.selectedTab = event.tab.textLabel;
    if (this.selectedTab === 'Account') {
      this.getAccounts();
    }
    if (this.selectedTab === 'DellManager') {
      this.getDellManager();
    }
    if (this.selectedTab === 'Domain') {
      this.getDomain();
    }

    if (this.selectedTab === 'Recruiter') {
       this.getRecruiter();
    }
    if (this.selectedTab === 'USTTPM') {
       this.getUSTTPM();
    }
    if (this.selectedTab === 'USTPOC') {
      this.getUstPoc();
    }

    if (this.selectedTab === 'Region') {
      this.getRegion();
   }


  }

  applyFilterAccount(): void {
    this.accountDataSource.filter = this.searchFilter.trim().toLowerCase();
  }
  DownloadExcel() {
    const filteredData = this.accountDataSource.filteredData;
    if (filteredData.length > 0) {
      const headers = [
        'AccountName',
      ];

      const downloadData = filteredData.map((data) => ({
        'AccountName': this.getAccountNameById(data.accountId),
      }));
      this.excelService.jsonExportAsExcel(downloadData, 'SO Details', headers);
    } else {
      alert('No Records found!');
    }
  }

  getAccountNameById(accountId: number): string {
    const account = this.accountDataSource.filteredData.find((acc) => acc.accountId === accountId);
    return account ? account.accountName : '';
  }


  getAccounts(): void {
    this.accountService.GetAllAccountData().subscribe((result) => {
      this.accountDataSource = new MatTableDataSource<AccountModel>(result);
      this.accountDataSource.paginator = this.accountPaginator;
      this.dellManagerDataSource.sort = this.sort;

    });
  }

  getDellManager(): void {
    this.dellManagerService.GetAllDellManagerData().subscribe((result) => {
      this.dellManagerDataSource = new MatTableDataSource<DellManagerModel>(result);
      this.dellManagerDataSource.paginator = this.dellManagerPaginator;
      this.dellManagerDataSource.sort = this.sort;

    });

  }
  getRecruiter(): void {
    this.recruiterService.GetAllRecruiterData().subscribe((result) => {
      this.recruiterDataSource = new MatTableDataSource<RecruiterModel>(result);
      this.recruiterDataSource.paginator = this.recruiterPaginator;
      this.recruiterDataSource.sort = this.sort;
    });
  }

  getUstPoc(): void {
    this.pocService.GetAllUstPocData().subscribe((result) => {
      this.ustPocDataSource = new MatTableDataSource<USTPOCModel>(result);
      this.ustPocDataSource.paginator = this.ustPocPaginator;
      this.ustPocDataSource.sort = this.sort;
    });
  }

  getUSTTPM(): void {
    this.tpmService.GetAllUSTTPMData().subscribe((result) => {
      this.ustTpmDataSource = new MatTableDataSource<USTTPMModel>(result);
      this.ustTpmDataSource.paginator = this.ustTpmPaginator;
      this.ustTpmDataSource.sort = this.sort;
    });
  }

  getRegion(): void {
    this.regionService.GetAllRegionData().subscribe((result) => {
      this.regionDataSource = new MatTableDataSource<RegionModel>(result);
      this.regionDataSource.paginator = this.regionPaginator;
      this.regionDataSource.sort = this.sort;
    });
  }

  getDomain(): void {
    this.domainService.GetAllDomainData().subscribe((result) => {
      this.domainDataSource = new MatTableDataSource<DomainModel>(result);
      this.domainDataSource.paginator = this.domainPaginator;
      this.domainDataSource.sort = this.sort;
    });
  }


  updateAccountDetails(row: AccountModel): void {
    row.isEditing = !row.isEditing;
  }

  saveAccountDetails(row: any): void {
      row.type= 'update',
      this.accountService.UpdateAccountData(row.accountId, row).subscribe(
      (response) => {
        console.log('Account  updated successfully', response);
        row.isEditing = false;
        this.getAccounts();
      },
      (error) => {
        console.error('Error updating Account data', error);
      }
    );
  }

  cancelAccountChanges(row: any): void {
    row.isEditing = false;
    this.getAccounts();
  }

  deleteAccountData(data: any)
   {
      this.accountService.DeleteAccountData(data.accountId).subscribe((res) => {
        this.getAccounts();
    });

   }

   updateDellManager(row:DellManagerModel):void{
    row.isEditing = !row.isEditing;
   }
    deleteDellManagerData(data:any){
      this.dellManagerService.DeleteDellManagerData(data.dellManagerId).subscribe((res)=>{
        this.getDellManager();
      });
    }
    saveDellManager(row:any){
      row.type='update',
      this.dellManagerService.UpdateDellManagerData(row.dellManagerId,row).subscribe((response) => {
        row.isEditing = false;
        this.getDellManager();
      },
      (error) => {
        console.error('Error updating Dell Manager data', error);
      }
    );
    }

    cancelDellManagerChanges(row:any){
      row.isEditing = false;
      this.getDellManager();
    }




    updateRegion(row:RegionModel):void{
      row.isEditing = !row.isEditing;
     }
      deleteRegionData(data:any){
        this.regionService.DeleteRegionData(data.regionId).subscribe((res)=>{
          this.getRegion();
        });
      }
      saveRegion(row:any){
        row.type='update',
        this.regionService.UpdateRegionData(row.regionId,row).subscribe((response) => {
          row.isEditing = false;
          this.getRegion();
        },
        (error) => {
          console.error('Error updating Region data', error);
        }
      );
      }

      cancelRecruiterChanges(row:any){
        row.isEditing = false;
        this.getRegion();
      }


      updateRecruiter(row:RecruiterModel):void{
        row.isEditing = !row.isEditing;
       }
        deleteRecruiterData(data:any){
          this.recruiterService.DeleteRecruiterData(data.recruiterId).subscribe((res)=>{
            this.getRecruiter();
          });
        }
        saveRecruiter(row:any){
          row.type='update',
          this.recruiterService.UpdateRecruiterData(row.recruiterId,row).subscribe((response) => {
            row.isEditing = false;
            this.getRecruiter();
          },
          (error) => {
            console.error('Error updating Recruiter data', error);
          }
        );
        }

        cancelRegionChanges(row:any){
          row.isEditing = false;
          this.getRecruiter();
        }


        updateUSTPOC(row:USTPOCModel):void{
          row.isEditing = !row.isEditing;
         }
          deleteUSTPOCData(data:any){
            this.pocService.DeleteUstPocData(data.ustpocId).subscribe((res)=>{
              this.getUstPoc();
            });
          }
          saveUSTPOC(row:any){
            row.type='update',
            this.pocService.UpdateUstPocData(row.ustpocId,row).subscribe((response) => {
              row.isEditing = false;
              this.getUstPoc();
            },
            (error) => {
              console.error('Error updating USTPOC data', error);
            }
          );
          }

          cancelUSTPOC(row:any){
            row.isEditing = false;
            this.getUstPoc();
          }


          updateUSTTPM(row:USTPOCModel):void{
            row.isEditing = !row.isEditing;
           }
            deleteUSTTPMData(data:any){
              this.tpmService.DeleteUSTTPMData(data.usttpmId).subscribe((res)=>{
                this.getUSTTPM();
              });
            }
            saveUSTTPM(row:any){
              row.type='update',
              this.tpmService.UpdateUSTTPMData(row.usttpmId,row).subscribe((response) => {
                row.isEditing = false;
                this.getUSTTPM();
              },
              (error) => {
                console.error('Error updating USTTPM data', error);
              }
            );
            }

            cancelUSTTPM(row:any){
              row.isEditing = false;
              this.getUSTTPM();
            }



          updateDomain(row:USTPOCModel):void{
            row.isEditing = !row.isEditing;
           }
            deleteDomainData(data:any){
              this.domainService.DeleteDomainData(data.domainId).subscribe((res)=>{
                this.getDomain();
              });
            }
            saveDomain(row:any){
              row.type='update',
              this.domainService.UpdateDomainData(row.domainId,row).subscribe((response) => {
                row.isEditing = false;
                this.getDomain();
              },
              (error) => {
                console.error('Error updating Domain data', error);
              }
            );
            }

            cancelDomain(row:any){
              row.isEditing = false;
              this.getDomain();
            }


            addNewAccount(){

            }
            addNewDellManger()
            {

            }


  showAddForm: boolean = false;


  openAddForm(): void {
    this.showAddForm = !this.showAddForm
  }

  closeAddForm(): void {
    this.showAddForm = false;
    this.getAccounts();
  }
  private fb = inject(FormBuilder);

  AccountForm=this.fb.group({
    accountName: [null, Validators.required],
  });

  addNewAccountEntry(): void {
    let formValue=this.AccountForm.value;
    let obj={
      accountName:formValue.accountName,
      type:"post",
    };
    this.accountService.PostAccountData(obj).subscribe(data=>{
      this.getAccounts();
      this.AccountForm.reset();
    })
    this.closeAddForm();
  }


  DellManagerForm=this.fb.group({
    dellManagerName: [null, Validators.required],
  });

  addNewDellMangerEntry(): void {
    let formValue=this.DellManagerForm.value;
    let obj={
      dellManagerName:formValue.dellManagerName,
      type:"post",
    };
    this.dellManagerService.PostDellManagerData(obj).subscribe(data=>{

      this.getDellManager();
      this.DellManagerForm.reset();
    })
    this.closeAddForm();
  }
  DomainForm = this.fb.group({
    domainName: [null, Validators.required],
  });

  addNewDomainEntry(): void {
    let formValue = this.DomainForm.value;
    let obj = {
      domainName: formValue.domainName,
      type: "post",
    };
    this.domainService.PostDomainData(obj).subscribe((data) => {
      this.getDomain();
      this.DomainForm.reset();
    });
    this.closeAddForm();
  }

  RegionForm = this.fb.group({
    region: [null, Validators.required],
  });

  addNewRegionEntry(): void {
    let formValue = this.RegionForm.value;
    let obj = {
      region: formValue.region,
      type: "post",
    };
    this.regionService.PostRegionData(obj).subscribe((data) => {
      this.getRegion();
      this.RegionForm.reset();
    });
    this.closeAddForm();
  }

  RecruiterForm = this.fb.group({
    recruiterName: [null, Validators.required],
  });

  addNewRecruiterEntry(): void {
    let formValue = this.RecruiterForm.value;
    let obj = {
      recruiterName: formValue.recruiterName,
      type: "post",
    };
    this.recruiterService.PostRecruiterData(obj).subscribe((data) => {
      this.getRecruiter();
      this.RecruiterForm.reset();
    });
    this.closeAddForm();
  }


  USTPOCForm = this.fb.group({
    ustpocName: [null, Validators.required],
  });

  addNewUSTPOCEntry(): void {
    let formValue = this.USTPOCForm.value;
    let obj = {
      ustpocName: formValue.ustpocName,
      type: "post",
    };
    this.pocService.PostUstPocData(obj).subscribe((data) => {
      this.getUstPoc();
      this.USTPOCForm.reset();
    });
    this.closeAddForm();
  }


  USTTPMForm = this.fb.group({
    usttpmName: [null, Validators.required],
  });

  addNewUSTTPMEntry(): void {
    let formValue = this.USTTPMForm.value;
    let obj = {
      usttpmName: formValue.usttpmName,
      type: "post",
    };
    this.tpmService.PostUSTTPMData(obj).subscribe((data) => {
      this.getUSTTPM();
      this.USTTPMForm.reset();
    });
    this.closeAddForm();
  }



}
