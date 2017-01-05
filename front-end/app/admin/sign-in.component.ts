import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: 'sign-in.component.html',
    styles: [`
fieldset {
    font-family: sans-serif;
    border: 1px solid #aaa;
    border-radius: 5px;
    padding: 15px;
    margin-top : 75px;
}

fieldset legend {
    padding: 5px 10px ;
    margin-left: 20px;
    display: inline-block;
    border: 0;
    width :auto;
    font-weight: bold;
    font-size: 2.2em;
}
h1 {
    margin-top: 100px;
}
  
    `]
})
export class SignInComponent {

}