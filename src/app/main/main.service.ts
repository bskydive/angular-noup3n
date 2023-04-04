import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

interface IParams {
	action: "params";
}

interface IConcurrencyResponse {
	count: string;
	delay: string;
}
interface IConcurrency {
	count: number;
	delay: number;
}

@Injectable({
	providedIn: "root",
})
export class MainService {
	serverUrl = "/api";

	constructor(private http: HttpClient) {}

	getParams(): Observable<IConcurrency> {
		const headers = new HttpHeaders({ "Content-Type": "application/json" });
		const params: IParams = { action: "params" };

		return this.http
			.post<IConcurrencyResponse>(this.serverUrl, params, { headers })
			.pipe(
				map((params) => ({
					count: parseInt(params.count),
					delay: parseInt(params.delay),
				})),
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
