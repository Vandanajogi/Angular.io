import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Employee } from '../employee';
import { PostService } from '../post.service';
import { DialogService } from '../shared/dialog.service';
import { ToastrService  } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
EmpData:any[]=[];
updateObj={};
isRadio:boolean=false;
username:string='';
 country:any[]=[];
 nameSearch:string='';

//add reference of model for view file
modalRef: BsModalRef; 
config = {
  animated: true,
  
  ignoreBackdropClick: true,
  class: "alert alert-danger"
};

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

constructor(private service:PostService, private router:Router,
  private modalservice:BsModalService, 
  private dialogservice:DialogService,
  private toastr:ToastrService) { }

  ngOnInit() {
    this.GetAllEmployee();
    //this.username=sessionStorage.getItem("username");
  }

GetAllEmployee(){
  this.service.getAllEmployee().subscribe((response)=>{
    this.EmpData=(<any>response);
  },(error)=>{
    if(error.status>=400 && error.status<500){
      this.toastr.error("Client Side Error");
    }else if(error.status>=500 && error.status<600){
      this.toastr.error("Server Side Error");
    }else if(error.status==0){
      this.toastr.error("Server Not Available!!!!");
    }
  })

  
}

onAddEmployee(){
  this.router.navigate(['/AddEmployee']);
}


onUpdateEmployee(popUp:TemplateRef<any>){

  if(this.radioButtonValidation()){
    //write a code for update or pop up
   // alert("Employee is selected... ");
  //this.router.navigate(['/UpdateEmployee']);

  this.modalRef = this.modalservice.show(        
    popUp, this.config);
}else{
 // alert("Please Select The Employee ..");
 this.toastr.success('Please Select The Employee .. ');
}
}


onDeleteEmployee(){
  
  if(this.radioButtonValidation()){
    console.log("in Delete");
    this.dialogservice.OpenConfirmDialog('Are you sure to delete this record?')
    .afterClosed()
    .subscribe(res=>{
      console.log(res);
      if(res){
        //here call the delete the service
          //in delete service subscribe method you have to call toastr
          this.service.DeleteEmployee(this.empobj.id)
          .subscribe((response)=>{
            console.log(response);
            this.toastr.error(response);
            this.GetAllEmployee();
          })
        
      }
    })
  
  }else{
   // alert("Please Select The Employee ..");
   this.toastr.warning('Please Select The Employee .. ');
  }
  
}



onChangeStatus(){

  if(this.radioButtonValidation()){
    console.log("in Change Status");
    this.dialogservice.OpenConfirmDialog('Are you want to change Status ?')
    .afterClosed()
    .subscribe(res=>{
      console.log(res);
      if(res){
        //here call the delete the service
          //in delete service subscribe method you have to call toastr
          this.service.ChangeStatus(this.empobj)
          .subscribe((response)=>{
            console.log(response);
            this.toastr.error(response);
            this.GetAllEmployee();
          })
        
      }
    })
  
  }else{
   // alert("Please Select The Employee ..");
   this.toastr.warning('Please Select The Employee .. ');
  }
  
  
}




onRadioClick(item){

  console.log(item);
  this.isRadio=true;
    //this.isRadioClick=item.name;
  this.empobj=item;  

}

radioButtonValidation(){
  if(this.isRadio){
    
      return true;
    
  }
  else
  {
   
    return false;
  }
}






}
