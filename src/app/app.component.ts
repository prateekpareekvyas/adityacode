import { Component,OnInit , ChangeDetectorRef} from '@angular/core';
import { FormGroup, FormControl, Validators ,ReactiveFormsModule } from '@angular/forms';
import { WindowRefService } from './window-ref.service';
declare let Razorpay: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent  {

title="aditya"
  form = new FormGroup({
 	 name: new FormControl(),
		email: new FormControl('', [Validators.required]),

  });
  constructor(private  razorpayService: WindowRefService, private cd:  ChangeDetectorRef) {
  }
  tmpo:any;
  count=0;
  arrayOfObj :any=[];
  response:any;
  razorpayResponse:any;
  showModal = false;


  ngOnInit() {
    this.razorpayService
      .lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js')
      .subscribe();
  }

  RAZORPAY_OPTIONS = {
    "key": "rzp_test_0YHXY0tdYKHFYI",
    "amount": "",
    "name": "Novopay",

    "description": "Load Wallet",
    "image": "",
    "prefill": {
      "name": "",
      "email": "test@test.com",
      "contact": "",
      "method": ""
    },
    "modal": {},
    "theme": {
      "color": "#0096C5"
    }
  };

  public proceed() {

    const options: any = {
      key: "rzp_test_0YHXY0tdYKHFYI",
      amount: "100",
      name: "Novopay",
      description: "Load Wallet",
      image: "https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg",
      prefill: {
        name: "",
        email: "test@test.com",
        contact: "",
        method: ""
      },
      modal: {},
      theme: {
        color: "#0096C5"
      }
    };
    options.handler = ((response:any, error:any) => {
      options.response = response;
      window.alert(response)
      console.log(response);
      console.log(options);
      // call your backend api to verify payment signature & capture transaction
    });
    options.modal.ondismiss = (() => {

      console.log('Transaction cancelled.');
    });

    let razorpay = new Razorpay(options)
    razorpay.open();
  }




  onSubmit() {
    console.log(this.form.value)
    this.proceed()

  }

}
