import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  title = 'Home';
  registerMode = false;
  list: any = [] ;


  constructor( public accountService: AccountService , public http: HttpClient ) {  }

  ngOnInit(): void {
    this.http.get(this.api+'BU').subscribe( res => {
      this.buList = res ;
    });
    this.http.get(this.api+'Zone').subscribe( res => {
     this.zoneList = res ;
   });
   this.http.get(this.api+'DownStream').subscribe( res => {
     this.dwnSys = res ;
   });
   this.http.get(this.api+'Section').subscribe( res => {
     this.Section = res ;
   }); 
  }


  api = "https://61127fca89c6d00017ac03a3.mockapi.io/api/v1/";
  buList: any;
  zoneList: any;
  dwnSys: any;
  public loading = false;
  Section: any;
// --------------------------- //
  prodId: any;
  intProd: any;
  ediTion: any;
  productList: any;
  onProduct(e:any) {
    this.prodId = e.target.value;
    this.http.get(this.api+'BU/'+this.prodId).subscribe( res => {
    //  console.log(res);
      this.intProd = res ;
      this.productList = this.intProd.product;
      this.ediTion = this.intProd.edition;
     // console.log(this.ediTion)
    });
  }

  url="";
  model:any;
  localUrl="./assets/pdf.jpg";
  async onselectFile(e:any) {
    this.loading = true ;
    console.log(e.target.files[0]);
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e:any) => {
        this.url = e.target.result;
        this.loading =false; 
      } 
  }


}

