import { Component, OnInit } from '@angular/core';

import Konva from 'konva';
import { ShapeService } from '../../services/shapes.service';
import { TextNodeService } from '../../services/text-node.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  shapes: any = [];
  stage!: Konva.Stage;
  layer!: Konva.Layer;

  selectedButton: any = {
    'circle': false,
    'rectangle': false,
    'line': false,
    'undo': false,
    'erase': false,
    'text': false
  }

  erase: boolean = false;
  transformers: Konva.Transformer[] = [];

  constructor(
    private shapeService: ShapeService,
    private textNodeService: TextNodeService
  ) { }

  ngOnInit(): void {
    let width = window.innerWidth * 0.4;
    let height = window.innerHeight;
    this.stage = new Konva.Stage({
      container: 'container',
      width: 830,
      height: 590
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
    this.addLineListeners();
    let currCanvas = document.querySelector('.konvajs-content');
    console.log(currCanvas?.childNodes[0]);
  }

  setSelection(type: string) {
    this.selectedButton[type] = true;
  }

  addShape(type: string) {
    this.clearSelection();
    this.setSelection(type);
    // if (type == 'circle') {
    //   this.addCircle();
    // }
    if (type == 'line') {
      this.addLine();
    }
    // else if (type == 'rectangle') {
    //   this.addRectangle();
    // }
    // else if (type == 'text') {
    //   this.addText();
    // }
  }

  addLine() {
    this.selectedButton['line'] = true;
  }

  addLineListeners() {
    const component = this;
    let lastLine: any;
    let isPaint: any;
    this.stage.on('mousedown touchstart', function (e) {
      if (!component.selectedButton['line'] && !component.erase) {
        return;
      }
      isPaint = true;
      let pos = component.stage.getPointerPosition();
      const mode = component.erase ? 'erase' : 'brush';
      lastLine = component.shapeService.line(pos, mode)
      component.shapes.push(lastLine);
      component.layer.add(lastLine);
    });
    this.stage.on('mouseup touchend', function () {
      isPaint = false;
    });
    // and core function - drawing
    this.stage.on('mousemove touchmove', function () {
      if (!isPaint) {
        return;
      }
      const position: any = component.stage.getPointerPosition();
      var newPoints = lastLine.points().concat([position.x, position.y]);
      lastLine.points(newPoints);
      component.layer.batchDraw();
    });
  }

  clearSelection() {
    Object.keys(this.selectedButton).forEach(key => {
      this.selectedButton[key] = false;
    })
  }

  clearBoard() {
    location.reload();
  }

}
