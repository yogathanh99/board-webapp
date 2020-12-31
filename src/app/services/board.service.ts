import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Board } from '../interfaces';
import { baseURL, httpOptions } from '../utils/baseURL';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private boardUrl = `${baseURL}boards`;

  constructor(private http: HttpClient) {}

  getBoards(): Observable<Board[]> {
    return this.http
      .get<Board[]>(this.boardUrl)
      .pipe(tap(() => console.log('get boards')));
  }

  addBoard(board: Board): Observable<Board> {
    return this.http
      .post<Board>(this.boardUrl, board, httpOptions)
      .pipe(tap((newBoard: Board) => console.log(`add board ${newBoard}`)));
  }
}
