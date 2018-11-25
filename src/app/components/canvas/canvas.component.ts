import { Component, OnInit } from '@angular/core';
import { GridsService } from 'src/app/services/grids.service';
import { NEXT } from '@angular/core/src/render3/interfaces/view';



@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  constructor(private grids:GridsService) { }

  points = 0;
  xSize = 10;
  ySize = 10;
  _x = new Array(this.xSize);
  _y = new Array(this.ySize);
  win:boolean = false;
  lose:boolean = false;
  loading:boolean = true;

  ngOnInit() {
    this.grids.starGame().subscribe((data)=>{
      this.controller(data);
    });
    setTimeout(() => {
      this.grids.addMines(10);
      this.loading = false;
    }, 5000);
  }
  controller(data){
    switch (data.ord) {
      case 'addPoint':
        this.points += data.points;
        break;
      case 'newState':
        this.win = this.grids.win();
        break;
      case 'lose':
        this.lose = true;
        break;
      case 'reset':
        this.win = false;
        this.lose = false;
        break;
      default:
        console.log('Default by canvas:\n',data);
        break;
    }
  }
  reset(){
    this.grids.reset();
    this.grids.addMines(10);
  }
  coords(x,y){
    return {"x":x,"y":y};
  }
}
