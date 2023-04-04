import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MainService } from "./main.service";

@Component({
	selector: "app-main",
	templateUrl: "./main.component.html",
	styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit, OnDestroy {
	subs: Subscription[] = [];

	constructor(private service: MainService) {}

	ngOnInit(): void {
		this.subs.push(
			this.service
				.getParams()
				.subscribe((params) => console.log("params", params))
		);
	}

	ngOnDestroy(): void {
		this.subs.forEach((sub) => sub.unsubscribe());
	}
}
