import { Component, OnInit } from '@angular/core';
import { Board } from '../../interfaces';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  boards: Board[];

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.boardService
      .getBoards()
      .subscribe((boards: Board[]) => (this.boards = boards));
  }

  add(boardName: string): void {
    if (!boardName) {
      return;
    }

    this.boardService
      .addBoard({ name: boardName } as Board)
      .subscribe((board: Board) => {
        this.boards = [...this.boards, board];
      });
  }
}
