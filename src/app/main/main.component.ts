import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, of, Subscription } from "rxjs";
import { switchMap } from "rxjs-compat/operator/switchMap";
import { map, take, tap } from "rxjs/operators";
import { IConcurrency, MainService } from "./main.service";

interface IProcessResult {
	id: string;
	data: any;
}
@Component({
	selector: "app-main",
	templateUrl: "./main.component.html",
	styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit, OnDestroy {
	subs: Subscription[] = [];
	timerId: any;
	params: IConcurrency;
	maxResults = 200;
	/** индекс - номер процесса */
	results: IProcessResult[] = [];
	threads: Observable<IProcessResult>[];

	constructor(private service: MainService) {}

	ngOnInit(): void {
		this.solveTaskOne;
		this.solveTaskTwo();
	}

	/** Задание №1 - запрос параметров */
	solveTaskOne() {
		this.subs.push(
			this.service
				.getParams()
				.pipe(take(1))
				.subscribe((params) => {
					this.params = { ...params };
					console.log("params", params);
				})
		);
	}

	/** Задание №2 - запрос параметров, отправка запросов, ожидание, приём значений */
	solveTaskTwo() {
		this.subs.push(
			this.service
				.getParams()
				.pipe(
					tap((params) => {
						this.params = { count: params.count, delay: params.delay };
						this.threads = this.getThreads(params);
						console.log("thread start", this.params, this.threads);
						this.timerId = setInterval(
							() => this.spawnThread(),
							this.params.delay
						);
					})
				)
				.subscribe()
		);
	}

	spawnThread() {
		const index = this.results.length;
		const name = this.getProcessName(index);

		if (index < this.threads.length) {
			this.results.push({ id: name, data: index });
			console.log("thread spawn", { id: name, data: index });

			this.subs.push(
				this.threads[index].subscribe((data) =>
					this.setResultByIndex(index, data)
				)
			);
		} else {
			clearInterval(this.timerId);
		}
	}

	setResultByIndex(index: number, data: any) {
		if (index < this.results.length) {
			console.log("thread result by index", { id: index, data: data });
			this.results[index].data = JSON.stringify(data);
			this.results[index].id = this.getProcessName(index);
		} else {
			console.error("results index error", index, this.results);
		}
	}

	/**
	 * запросы на сервер
	 * можно раскомментировать добавление идентификатора процесса,
	 * чтобы потом можно было заполнять массив результатов по этому индексу
	 * прямо из результатов запроса/потока
	 * сейчас он не нужен, т.к. индекс берётся синхронно в момент старта потока
	 */
	getThreads(params: IConcurrency): Observable<IProcessResult>[] {
		const result: Observable<IProcessResult>[] = [];

		for (let i = 0; i < params.count; i++) {
			result.push(
				this.service.getProcess(this.getProcessName(i)).pipe(
					map((result) => {
						console.log("result", this.getProcessName(i), result);
						// return { id: this.getProcessName(i), data: result };
						return result;
					}),
					take(this.maxResults)
				)
			);
		}
		return result;
	}

	getProcessName(index: number): string {
		return "process_" + index;
	}

	ngOnDestroy(): void {
		this.subs.forEach((sub) => sub.unsubscribe());
	}
}
