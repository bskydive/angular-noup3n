import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainComponent } from "./main/main.component";
import { MainService } from "./main/main.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
	declarations: [AppComponent, MainComponent],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule],
	providers: [MainService],
	bootstrap: [AppComponent],
})
export class AppModule {}
