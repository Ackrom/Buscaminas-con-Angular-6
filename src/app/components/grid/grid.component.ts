import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GridsService } from 'src/app/services/grids.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  constructor(private game:GridsService) { }

  @Input()
  coords:any = {
    x:0,
    y:0
  };

  isMine:boolean = false;
  show:boolean = false;
  showFlag:boolean = false;
  minesArround = 0;
  bgColor:string = "grey";

  ngOnInit() {
    this.game.starGame()
    .subscribe((data)=>{
      this.controller(data);
    });
  }

  controller(data){
    switch (data.ord) {
      case 'newState':
        this.refresh(data.grids);
        break;
      case 'reset':
        this.showFlag = false;
        this.show = false;
        this.isMine = false;
        this.minesArround = 0;
        this.bgColor = "grey";
        break;
      default:
        break;
    }
  }

  refresh(grids){
    let grid = grids[this.coords.y][this.coords.x];
    this.isMine = grid.is_mine;
    this.minesArround = grid.mines_arround;
    if(!this.show && grid.show)
      this.onClick();
  }

  onClick(){
    if(this.show || this.showFlag)
      return;
    else
      this.show = true;

    if(this.isMine){
      this.bgColor = 'red';
      this.game.explosion();
    }else{
      console.log("joder tío ganaste un punto!!");
      this.bgColor = "lightgrey";
      this.game.addShow();
      this.game.addPoint();
      this.game.expand(this.coords.x,this.coords.y);
    }
  }

  setFlag(){
    if(this.show)
      return false;
    this.showFlag = !this.showFlag;
    //to avoid default browser action from the event
    return false;
  }


}
