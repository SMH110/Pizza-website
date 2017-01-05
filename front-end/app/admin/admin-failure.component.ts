import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './admin-failure.component.html'
})

export class AdminFailureComponent implements OnInit {
    error: string;


    ngOnInit() {
        this.error = JSON.parse(localStorage.getItem('adminErrorMessage'));
    }
}
