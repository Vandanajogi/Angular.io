import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Employee } from '../employee';
import { PostService } from '../post.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {


  empobj:Employee={
    id:0,
      name:'',
      department:'',
      status:'',
      phoneno:0,
      country1:{
        cid:0,
        cname:''
      },
      createddtm:'',
      createdby:'',
      updateddtm:'',
      updatedby:''
  };

  
//add reference of model for view file
modalRef: BsModalRef; 
config = {
  animated: true,
  
  ignoreBackdropClick: true,
  class: "alert alert-danger"
};

  constructor(private route:ActivatedRoute,
     private service:PostService,private modalservice:BsModalService) { }

  ngOnInit() {
    this.getEmplaoyeeDetails();
    document.body.className="bg-img";
  }


ngOnDestroy(){
  document.body.className="";
}

  getEmplaoyeeDetails(){
    this.route.paramMap
    .subscribe((param)=>{
      this.empobj.id=+param.get("id");
      this.GetEmployeeById(this.empobj.id)

    });


  }

  GetEmployeeById(id:number){
    
    this.service.getEmpByid(id)
    .subscribe((response)=>{
      this.empobj=(<any>response)
      console.log(this.empobj.name);
    })

  }



  OnUpdate(popUp:TemplateRef<any>){
    this.modalRef = this.modalservice.show(        
      popUp, this.config);

  }
}
