import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UsersProvider {

  private userUrl: string = 'https://randomuser.me/api/?results=20';
  private users: Array<any> = null;

  constructor(public http: Http) {

  }


  load(): Promise<any> {
    return new Promise((resolve, reject) => {

      if (this.users)
        resolve(this.users);

      this.http.get(this.userUrl)
        .map((res) => {
          console.log('res >', res);
          return res.json();
        })
        .subscribe((data) => {
          this.users = data.results;
          resolve(this.users);
        }, (error) => {
          reject(error);
        });
    });
  }

  filterUsers(searchItem: string): Array<any> {
    return this.users.filter((user) => {
      let name = user.name.first + ' ' + user.name.last;
      return name.toLocaleLowerCase().indexOf(searchItem.toLocaleLowerCase()) > -1;
    });
  }

}
