import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../post.service';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {

  constructor(private service:PostService, 
    private router:Router, private toastr:ToastrService) { }
  createddtm=0;
  updateddtm=0;
  selectValue;

allcountry=[];
     
     
  ngOnInit() {
    //After constructor ngOnINit call ,it is one of the life cycle hook of a component
    //document.body.className="bg-img";
  this.GetCountries();
  }


ngOnDestroy(){
  document.body.className="";
}



GetCountries(){
  this.service.getCountries().subscribe((response)=>{
    this.allcountry=(<any>response);
    console.log(response);
   })
}

changeCountry(){
  console.log(this.selectValue);
}


// For old Implementation
//   onAddEmpData(inputname,inputcontact,
//     inputdepartment,inputstatus,crby,upby){
//       this.createddtm=Date.now();
//       this.updateddtm=Date.now();
//       let obj={
//         name:inputname,
//         phoneno:inputcontact,
//         department:inputdepartment,
//         status:inputstatus,
//         createddtm:this.createddtm,
//         createdby:crby,
//         updateddtm:this.updateddtm,
//         updatedby:upby,
//         country1:{
//           cid:this.selectValue.cid,
//           cname:this.selectValue.cname

//         }
//       }
    

//       this.service.addEmployee(obj).subscribe((response)=>{
//         console.log(response);
//         console.log("Record Inserted successfully");
//         this.router.navigate(["/home"]);
//       });
   
//     }
    OnHome(){
      this.router.navigate(['']);
    }



    onSubmit(f){
console.log("name "+f.value.name);
console.log("cname "+f.value.country1);
this.createddtm=Date.now();
this.updateddtm=Date.now();
let obj={
  name:f.value.name,
  phoneno:f.value.phoneno,
  department:f.value.department,
  status:f.value.status,
  createddtm:this.createddtm,
  createdby:sessionStorage.getItem("username"),
  updateddtm:this.updateddtm,
  updatedby:sessionStorage.getItem("username"),
  country1:{
    cid:f.value.country1.cid,
    cname:f.value.country1.cname

  }
}


this.service.addEmployee(obj).subscribe((response)=>{
  console.log(response);
  console.log("Record Inserted successfully");
  this.toastr.success(response);
  this.router.navigate(["/home"]);
});
    }
}
