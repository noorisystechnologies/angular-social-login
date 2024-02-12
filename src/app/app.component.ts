import { SocialUser, SocialAuthService, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from 'express';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SocialLogin';
  user:any;
  loggedIn:any;
  form!:FormGroup;

  constructor(private authService: SocialAuthService,
    private service:DataService,
    private route:Router) { }

  ngOnInit() {

    this.form= new FormGroup({
      contact_name: new FormControl('',[Validators.required]),
      provider_email: new FormControl('',[Validators.required]),
      provider_mobile: new FormControl('',[Validators.required, Validators.pattern('^[0-9]{6,16}$')]),
      provider_website: new FormControl('',[Validators.required]),
      provider_address: new FormControl(''),
      provider_address_type: new FormControl(''),
      provider_whatsapp_link: new FormControl(''),
      provider_facebook_link: new FormControl(''),
      provider_linkedin_link: new FormControl(''),
      provider_instagram_link: new FormControl(''),
    })
    
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user)
    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  addData(){
    let formData = new FormData();
    // formData.append('logged_user_id', this.authService.currentUserValue.id! );
    // formData.append('logged_user_email', this.dcryptdata.decrypt(this.authService.currentUserValue.email));
    formData.append("name", this.form.get("contact_name")?.value)
    formData.append("email", this.form.get("provider_email")?.value)
    formData.append("mobile_no", this.form.get("provider_mobile")?.value)
    formData.append("website_name", this.form.get("provider_website")?.value)
    formData.append("whatsapp_link", this.form.get("provider_whatsapp_link")?.value)
    formData.append("facebook_link", this.form.get("provider_facebook_link")?.value)
    formData.append("linkedin_link", this.form.get("provider_linkedin_link")?.value)
    formData.append("instagram_link", this.form.get("provider_instagram_link")?.value)
    formData.append("address", this.form.get("provider_address")?.value)
    formData.append("address_type", this.form.get("provider_address_type")?.value)
    // formData.append('token', this.authService.currentUserValue.token!)
    this.service.addData(formData).subscribe((result)=>{
      console.log(result)
      if (result.status=='success'){
        // this.route.navigate(['/data-list'])
      }
    })
  }
}
