import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

interface IParams {
	action: any;
}

@Injectable({
	providedIn: "root",
})
export class MainService {
	serverUrl = "/api";

	constructor(private http: HttpClient) {}

	getParams(): Observable<IParams> {
		const headers = new HttpHeaders({ "Content-Type": "application/json" });
		const params = { "action": "params" };

		return this.http
			.post<IParams>(this.serverUrl, params, { headers })
			.pipe(
				tap((data) =>
					console.log("createProduct: " + JSON.stringify(data))
				),
				catchError(this.handleError)
			);
	}

	private handleError(err): Observable<never> {
		let errorMessage: string;
		if (err.error instanceof ErrorEvent) {
			errorMessage = `An error occurred: ${err?.error?.message}`;
		} else {
			errorMessage = `Backend returned code ${err?.status}: ${err?.body?.error}`;
		}

		console.error(err);
		return throwError(errorMessage);
	}
}
