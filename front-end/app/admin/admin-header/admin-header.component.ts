import { Component } from '@angular/core';
import { AdminService } from "../../service/admin.service";
import { ErrorService } from "../../service/error.service";
import { Router } from "@angular/router";
import { NotificationService } from "../../service/notification.service";

@Component({
    selector: 'admin-header',
    templateUrl: './admin-header.component.html',
    styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent {
    constructor(private adminService: AdminService, private errorService: ErrorService, private router: Router, private notificationService: NotificationService) {
    }

    isSignInScreen() {
        return this.router.url === "/admin/sign-in";
    }

    signOut() {
        this.adminService.signOut().then(() => {
            this.router.navigateByUrl("/admin/sign-in");
            this.notificationService.signedOut.emit();
        }, error => {
            this.handleError(error, 'There was an unexpected error signing you out. Please try again.')
        })
    }

    get isSuperAdmin() {
        return this.adminService.isSuperAdmin;
    }

    private handleError(error: any, genericErrorMessage: string) {
        if (error.status === 401) {
            this.router.navigateByUrl('/admin/sign-in');
        }
        if (error.status === 500) {
            this.errorService.displayErrors([genericErrorMessage]);
        }
    }
}
