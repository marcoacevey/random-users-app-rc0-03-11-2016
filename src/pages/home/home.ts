import { UsersProvider } from './../../providers/users-provider';
import { Component } from '@angular/core';

import { NavController, LoadingController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private searchTerm: string = '';
  private users: Array<any>;

  constructor(public navCtrl: NavController, public usersProvider: UsersProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    this.loadUsers();
  }

  setFilteredUsers() {
    this.users = this.usersProvider.filterUsers(this.searchTerm);
  }

  loadUsers() {

    let loading = this.loadingCtrl.create({
      content: 'Carregando usuários :)'
    });

    loading.present();

    this.usersProvider
      .load()
      .then(data => {
        console.log(data);
        this.setFilteredUsers();

        loading.dismiss();
      })
      .catch(error => {

        loading.dismiss();
        this.showAlert('Não foi possivel carregar os usuários :(', error, ['ok'])
      });
  }

  showAlert(title: string, message: string, buttons: Array<string>) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: buttons
    });

    alert.present();
  }

}
