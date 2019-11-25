import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  formData = {
    id: '',
    nome: '',
    email: '',
    senha: '',
    setor:'',
  }

  constructor(private apiService: ApiService, private alertController: AlertController, private route: ActivatedRoute, private router: Router) {

    this.route.queryParams.subscribe(params => {
      console.log(this.router.getCurrentNavigation().extras.state);
      if (this.router.getCurrentNavigation().extras.state) {
        this.formData.id = this.router.getCurrentNavigation().extras.state.formDataParams.id;
        this.formData.nome = this.router.getCurrentNavigation().extras.state.formDataParams.nome;
        this.formData.email = this.router.getCurrentNavigation().extras.state.formDataParams.email;
        this.formData.senha = this.router.getCurrentNavigation().extras.state.formDataParams.senha;
        this.formData.senha = this.router.getCurrentNavigation().extras.state.formDataParams.setor;
      }
    });

  }

  ngOnInit() {
  }

  async formSubmit(){

    if(this.formData.id){ //Atualizar

      await this.apiService.sendPutRequest(this.formData.id, this.formData).subscribe((data)=>{
        console.log(data);
      }, error => {
        console.log(error);
      });

    }
    else{ //Criar

      await this.apiService.sendPostRequest(this.formData).subscribe((data)=>{
        console.log(data);
      }, error => {
        console.log(error);
      });

    }

    const alert = await this.alertController.create({
      header: 'Alerta!',
      subHeader: 'Formulário API',
      message: 'Dados enviados com sucesso.',
      buttons: ['OK']
    });

    await alert.present();

  }

}
