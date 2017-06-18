import '../polyfills';
import './jasmine-async-polyfill';

import 'zone.js/dist/proxy';
import 'zone.js/dist/sync-test'
import 'zone.js/dist/jasmine-patch';

import * as testing from '@angular/core/testing';
import * as browser from '@angular/platform-browser-dynamic/testing';

import { AppComponent } from "../app/app.component";
import { TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { AppModuleDeclaration } from "../app/app.module";
import { Router } from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import Routes from '../app/routes';

Error.stackTraceLimit = Infinity;

testing.TestBed.initTestEnvironment(
    browser.BrowserDynamicTestingModule,
    browser.platformBrowserDynamicTesting()
);

let base = document.createElement('base');
base.href = '/';
document.head.appendChild(base);

AppModuleDeclaration.providers.push({ provide: ComponentFixtureAutoDetect, useValue: true } as any);
AppModuleDeclaration.imports.shift();

AppModuleDeclaration.imports.unshift(RouterTestingModule.withRoutes(Routes));

describe('AppComponent', () => {

    let router: Router;
    let location: Location;

    beforeEach(async () => {
        await TestBed.configureTestingModule(AppModuleDeclaration).compileComponents();
        document.body.appendChild(TestBed.createComponent(AppComponent).nativeElement);
        router = TestBed.get(Router);
        location = TestBed.get(Location);
        router.initialNavigation();
        await router.navigate(['']);
    });

    it("Foo", () => {
        console.log(document.querySelector('img').src);
        expect(location.path()).toBe('/pizza');
        console.log(document.querySelector('item'));
        expect(true).toBe(true);
    });
});
