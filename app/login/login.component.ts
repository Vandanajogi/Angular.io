import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {

  EMAIL_PATTERN = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
  + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";



  incorrect:string="";
  logindetails;

  constructor(private service:PostService,private router:Router) { }

  ngOnInit() {
    //After constructor ngOnINit call ,it is one of the life cycle hook of a component
    document.body.className="bg-img";
  }


ngOnDestroy(){
  document.body.className="";
}


  onSubmit(f){
console.log("Email Id "+f.value.email);
console.log("Password  "+f.value.password);

//this.router.navigate(['/home']);
 let obj={
email:f.value.email,
password:f.value.password
 }
this.service.loginCheck(obj).subscribe((response)=>{
  console.log(response);
  //let msg=(<string>response.msg);
  this.logindetails=(<any>response);
  //console.log("Message is "+msg);
  if(this.logindetails.msg==="Valid user"){

    console.log("Username is "+this.logindetails.userobj.username);
    sessionStorage.setItem("username",this.logindetails.userobj.username);
   this.router.navigate(['/home']);

  }else{
    this.incorrect=this.logindetails.msg;
  }
})

  }
}
