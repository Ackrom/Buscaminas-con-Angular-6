import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';

class Grid{
  is_mine:boolean = false;
  mines_arround:number = 0;
  show:boolean = false;
  textColor = ["blue","green","red","orange"];//tienen que ser 8 colores
}
@Injectable({
  providedIn: 'root'
})
export class GridsService {
  constructor() {
    this._init();
  }
  
  grids:Grid[][];
  xSize = 10;
  ySize = 10;
  num_mines:number = 10;
  num_show:number = 0;
  private _game = new EventEmitter<any>();


  addMines(num:number){
    // add mines
    let mines_added:number = 0;
    while(mines_added<this.num_mines){
      let x = this.getRandomInt(0,this.grids[0].length-1);
      let y = this.getRandomInt(0,this.grids.length-1);
      if(!this.grids[y][x].is_mine){
        this.grids[y][x].is_mine = true;
        mines_added += 1
      }
    }

    for(var y=0;y<this.grids.length;y++)
      for(var x=0;x<this.grids[0].length;x++)
        this.grids[y][x].mines_arround = this.getAdjacentMines(x,y);

    this._game.emit({ord:"newState",grids:this.grids});
  }
  _init(){
    this.num_show = 0;
    this.grids = new Array(this.ySize);
    for (let y = 0; y < this.grids.length; y++) {
      this.grids[y] = new Array(this.xSize);
      for (let x = 0; x < this.grids[y].length; x++) {
        this.grids[y][x] = new Grid();
      }
    }
  }
  reset(){
    this._init();
    this._game.emit({ord:"reset"});
  }
  getAdjacentMines(x,y){
    if(this.grids[y][x].is_mine)
      return -1;
    let output = 0;
    for(var i=y-1;i<=y+1;i++)
      for(var j=x-1;j<=x+1;j++)
        if(i>=0 && j>=0 && i<this.grids.length && j<this.grids[0].length)
          output += (this.grids[i][j].is_mine)?1:0;
    return output;
  }
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  starGame():Observable<any>{
    return this._game.asObservable();
  }

  addShow(){
    this.num_show += 1;
  }

  explosion(){
    this._game.emit({ord:"lose"});
  }
  win(){
    return this.num_show+this.num_mines==this.xSize*this.ySize;
  }
  addPoint(){
    this._game.emit({ord:"addPoint",points:1});
  }

  expand(x,y){
    if(this.grids[y][x].mines_arround == 0 && !this.grids[y][x].is_mine){
      for(var i=y-1;i<=y+1;i++)
        for(var j=x-1;j<=x+1;j++)
          if(i>=0 && j>=0 && i<this.grids.length && j<this.grids[0].length && !this.grids[i][j].is_mine){
            this.grids[i][j].show = true;
          }
    }
    this._game.emit({ord:"newState",grids:this.grids});
  }


  // cambiar(){
  //   this.grids[0][0].is_mine = true;
  //   this._game.emit(this.grids);
  // }
 
}
