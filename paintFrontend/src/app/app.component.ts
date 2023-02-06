import { Component } from '@angular/core';
import Konva from 'konva';
import { Stage } from 'konva/lib/Stage';
import { Layer } from 'konva/lib/Layer';
import { Shape } from 'konva/lib/Shape';
import { HttpClient } from '@angular/common/http';
import { Line } from 'konva/lib/shapes/Line';
import { Rect } from 'konva/lib/shapes/Rect';
import { RegularPolygon } from 'konva/lib/shapes/RegularPolygon';
import { Circle } from 'konva/lib/shapes/Circle';
import { Ellipse } from 'konva/lib/shapes/Ellipse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) { };

  title = 'paint';
  shape: any;

  isrectangle: boolean = false;
  issquare: boolean = false;
  isellipse: boolean = false;
  iscircle: boolean = false;
  istriangle: boolean = false;
  isline: boolean = false;
  isdrawing: boolean = false;

  color: any = "white";
  fillbool: boolean = false;
  borderbool: boolean = false;
  flagcopy: boolean = false;

  count: number = 0;
  deleteElement: any = false;
  delete: boolean = false;

  x1: any = 0;
  y1: any = 0;
  x2: any = 0;
  y2: any = 0;

  path: any = '';

  elements = new Map();
  redo_flag: boolean = false;
  undo_flag: boolean = false;
  load_flag: boolean = false;

  back: any;
  stage!: Stage;
  layer!: Layer;

  tr = new Konva.Transformer();

  selectionRectangle = new Konva.Rect({
    fill: 'rgba(0,0,255,0.1)',
    visible: false,
  });

  resetBool() {
    this.isrectangle = false, this.issquare = false, this.isellipse = false, this.iscircle = false,
      this.istriangle = false, this.isline = false, this.redo_flag = false, this.fillbool = false,
      this.borderbool = false; this.delete = false, this.deleteElement = false;
  }
  ngOnInit(): void {
    this.stage = new Stage({
      container: 'drawing-field',
      width: window.innerWidth,
      height: window.innerHeight,
    });
    this.layer = new Layer();
    this.stage.add(this.layer);
  }

  setdel(bool: any) {
    this.deleteElement = bool;
  }
  setfill(bool: any) {
    this.fillbool = bool;
  }
  setborder(bool: any) {
    this.borderbool = bool;
  }
  setcopy(bool: any) {
    this.flagcopy = bool;
  }

  rectangle() {
    this.resetBool();
    this.isrectangle = true;
  }
  square() {
    this.resetBool();
    this.issquare = true;
  }
  ellipse() {
    this.resetBool();
    this.isellipse = true;
  }
  circle() {
    this.resetBool();
    this.iscircle = true;
  }
  triangle() {
    this.resetBool();
    this.istriangle = true;
  }
  line() {
    this.resetBool();
    this.isline = true;
  }

  pick() {
    this.resetBool();
    this.color = (<HTMLInputElement>document.getElementById("pick")).value;
    if (this.color == "#000000") {
      document.body.addEventListener('click', () => {
        this.color = (<HTMLInputElement>document.getElementById("pick")).value;
      });
    }
  }
  fill(shape: Shape[]) {
    this.resetBool();
    this.fillbool = true;
    for (var i = 0; i < shape.length; i++) {
      shape[i].fill(this.color);
      const previd = shape[i].id();
      this.count++;
      var tmp = shape[i];
      tmp.id(String(this.count));
      this.store(tmp, true, Number(previd));
    }
  }
  border(shape: Shape[]) {
    this.resetBool();
    this.borderbool = true;
    for (var i = 0; i < shape.length; i++) {
      shape[i].stroke(this.color);
      const previd = shape[i].id();
      this.count++;
      var tmp = shape[i];
      tmp.id(String(this.count));
      this.store(tmp, true, Number(previd));
    }
  }

  copy() {
    this.flagcopy = true;
  }
  clone(shape: Shape) {
    let arr = [Number(this.elements.get(Number(shape.id()))[3]), Number(this.elements.get(Number(shape.id()))[4]), Number(this.elements.get(Number(shape.id()))[5]), Number(this.elements.get(Number(shape.id()))[6]), Number(this.elements.get(Number(shape.id()))[7])];
    this.http
      .get('http://localhost:9090/backend/clone', {
        responseType: 'json',
        params: {
          type: this.elements.get(Number(shape.id()))[0],
          fill: this.elements.get(Number(shape.id()))[1],
          id: this.count,
          border: this.elements.get(Number(shape.id()))[2],
          additionalAttributes: arr
        },
        observe: "response"
      })
      .subscribe((response) => {
        var mapp = new Map<any, any>();
        var x: any = response.body;
        for (var value in response.body) {
          mapp.set(Number(value), x[value]);
          this.elements.set(Number(value), mapp.get(Number(value)));
          this.reDraw(mapp, Number(value), String(value));
        }
        this.count = this.count + 1;
      })
  }

  deleteSelected(shape: Shape[]) {
    this.resetBool();
    this.deleteElement = true;
    for (var i = 0; i < shape.length; i++) {
      var previd = this.elements.get(Number(shape[i].id()))[9];
      this.count++;
      shape[i].id(String(this.count));
      this.store(shape[i], false, Number(previd));
      shape[i].destroy();
    }
    this.layer.draw();
  }
  deleteAll() {
    this.resetBool();
    this.delete = true;
    this.layer.destroyChildren();
    this.layer.destroy();
    this.stage.destroy();
    this.ngOnInit();
    this.tr = new Konva.Transformer();
  }

  draw_shape() {
    if (this.isrectangle) {
      this.count += 1;
      let rect: Rect;
      rect = new Konva.Rect({
        x: this.stage.getPointerPosition()?.x,
        y: this.stage.getPointerPosition()?.y,
        width: 100,
        height: 50,
        fill: 'transparent',
        stroke: 'black',
        strokeWidth: 2,
        draggable: true,
        name: 'rectangle',
        id: String(this.count),
      });
      this.shape = rect;
      this.layer.add(rect).batchDraw();
      this.store(rect, true, Number(rect.id()));
      this.select(rect);
    } else if (this.issquare) {
      this.count += 1;
      let square: Rect;
      square = new Konva.Rect({
        x: this.stage.getPointerPosition()?.x,
        y: this.stage.getPointerPosition()?.y,
        width: 100,
        height: 100,
        fill: 'transparent',
        stroke: 'black',
        strokeWidth: 2,
        draggable: true,
        name: 'rectangle',
        id: String(this.count),
      });
      this.shape = square;
      this.layer.add(square).batchDraw();
      this.store(square, true, Number(square.id()));
      this.select(square);
    } else if (this.isellipse) {
      this.count += 1;
      let ellipse: Ellipse;
      ellipse = new Konva.Ellipse({
        x: this.stage.getPointerPosition()?.x,
        y: this.stage.getPointerPosition()?.y,
        radiusX: 60,
        radiusY: 30,
        fill: 'transparent',
        stroke: 'black',
        strokeWidth: 2,
        draggable: true,
        name: 'ellipse',
        id: String(this.count),
      });
      this.shape = ellipse;
      this.layer.add(ellipse).batchDraw();
      this.store(ellipse, true, Number(ellipse.id()));
      this.select(ellipse);
    } else if (this.iscircle) {
      this.count += 1;
      let circle: Circle;
      circle = new Konva.Circle({
        x: this.stage.getPointerPosition()?.x,
        y: this.stage.getPointerPosition()?.y,
        radius: 60,
        fill: 'transparent',
        stroke: 'black',
        strokeWidth: 2,
        draggable: true,
        name: 'circle',
        id: String(this.count),
      });
      this.shape = circle;
      this.layer.add(circle).batchDraw();
      this.store(circle, true, Number(circle.id()));
      this.select(circle);
    } else if (this.istriangle) {
      this.count += 1;
      let triangle: RegularPolygon;
      triangle = new Konva.RegularPolygon({
        x: this.stage.getPointerPosition()?.x,
        y: this.stage.getPointerPosition()?.y,
        sides: 3,
        radius: 50,
        fill: 'transparent',
        stroke: 'black',
        strokeWidth: 2,
        draggable: true,
        name: 'triangle',
        id: String(this.count),
      });
      this.shape = triangle;
      this.layer.add(triangle).batchDraw();
      this.store(triangle, true, Number(triangle.id()));
      this.select(triangle);
    } else if (this.isline) {
      this.count += 1;
      let line: Line;
      if (!this.isdrawing) {
        this.isdrawing = true;
        this.x1 = this.stage.getPointerPosition()?.x;
        this.y1 = this.stage.getPointerPosition()?.y;
      } else {
        this.x2 = this.stage.getPointerPosition()?.x;
        this.y2 = this.stage.getPointerPosition()?.y;
        line = new Konva.Line({
          points: [this.x1, this.y1, this.x2, this.y2],
          strokeWidth: 2,
          stroke: 'black',
          width: this.x2,
          height: this.y2,
          draggable: true,
          name: 'line',
          id: String(this.count),
        });
        this.layer.add(line).batchDraw();
        this.store(line, true, Number(line.id()));
        this.isdrawing = false;
        (this.isline = false), (this.redo_flag = false);
        this.select(line);
      }
    }
    (this.isrectangle = false),
      (this.issquare = false),
      (this.isellipse = false),
      (this.iscircle = false),
      (this.istriangle = false);
  }
  setAtt(shape: Shape) {
    this.store(shape, true, this.elements.get(Number(shape.id()))[9]);
  }
  select(shape: Shape) {
    this.layer.add(this.tr);
    // by default select all shapes
    shape.on('transform', () => {
      shape.setAttrs({
        width: Math.max(shape.width() * shape.scaleX(), 5),
        height: Math.max(shape.height() * shape.scaleY(), 5),
        scaleX: 1,
        scaleY: 1,
      });
    });
    this.tr.nodes([shape]);
    // add a new feature, lets add ability to draw selection rectangle
    this.layer.add(this.selectionRectangle);
    var x: any, y: any, x2: any, y2: any;
    this.stage.on('mousedown touchstart', (e: { target: any; evt: any }) => {
      // do nothing if we mousedown on any shape
      if (e.target !== this.stage) {
        return;
      }
      e.evt.preventDefault();
      x = this.stage.getPointerPosition()?.x;
      y = this.stage.getPointerPosition()?.y;
      x2 = this.stage.getPointerPosition()?.x;
      y2 = this.stage.getPointerPosition()?.y;
      this.selectionRectangle.visible(true);
      this.selectionRectangle.width(0);
      this.selectionRectangle.height(0);
    });
    this.stage.on('mousemove touchmove', (e: { target: any; evt: any }) => {
      // do nothing if we didn't start selection
      if (!this.selectionRectangle.visible()) {
        return;
      }
      e.evt.preventDefault();
      x2 = this.stage.getPointerPosition()?.x;
      y2 = this.stage.getPointerPosition()?.y;
      this.selectionRectangle.setAttrs({
        x: Math.min(x, x2),
        y: Math.min(y, y2),
        width: Math.abs(x2 - x),
        height: Math.abs(y2 - y),
      });
    });
    this.stage.on('mouseup touchend', (e: { target: any; evt: any }) => {
      // do nothing if we didn't start selection
      if (!this.selectionRectangle.visible()) {
        return;
      }
      e.evt.preventDefault();
      // update visibility in timeout, so we can check it in click event
      setTimeout(() => {
        this.selectionRectangle.visible(false);
      });
      var shaperec = this.stage.find(".rectangle");
      var shapeell = this.stage.find(".ellipse");
      var shapecirc = this.stage.find(".circle");
      var shapetri = this.stage.find(".triangle");
      var shapeline = this.stage.find(".line");
      var shapes = shaperec.concat(shapeell, shapecirc, shapetri, shapeline);
      var box = this.selectionRectangle.getClientRect();
      var selected: any = shapes.filter((shape) =>
        Konva.Util.haveIntersection(box, shape.getClientRect())
      );
      this.tr.nodes(selected);
      if (this.deleteElement) {
        this.deleteSelected(selected);
        this.setdel(false);
      }
    });
    // clicks should select/deselect shapes
    let s: any = this.stage;
    this.stage.on('click tap', (e: { target: any; evt: { shiftKey: any; ctrlKey: any; metaKey: any }; }) => {
      // if we are selecting with rect, do nothing
      if (this.selectionRectangle.visible()) {
        return;
      }
      // if click on empty area - remove all selections
      if (e.target === s) {
        this.tr.nodes([]);
        return;
      }
      // do we pressed shift or ctrl?
      const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
      const isSelected = this.tr.nodes().indexOf(e.target) >= 0;

      if (!metaPressed && !isSelected) {
        // if no key pressed and the node is not selected
        // select just one
        this.tr.nodes([e.target]);
      } else if (metaPressed && isSelected) {
        // if we pressed keys and node was selected
        // we need to remove it from selection:
        const nodes = this.tr.nodes().slice(); // use slice to have new copy of array
        // remove node from array
        nodes.splice(nodes.indexOf(e.target), 1);
        this.tr.nodes(nodes);
      } else if (metaPressed && !isSelected) {
        // add the node into selection
        const nodes = this.tr.nodes().concat([e.target]);
        this.tr.nodes(nodes);
      }
      this.setAtt(e.target);
      if (this.deleteElement) {
        this.deleteSelected([e.target]);
        this.setdel(false);
      }
      if (this.fillbool) {
        this.fill([e.target]);
        this.setfill(false);
      }
      if (this.borderbool) {
        this.border([e.target]);
        this.setborder(false);
      }
      if (this.flagcopy) {
        this.clone(e.target);
        this.setcopy(false);
      }
    }
    );
    this.stage = s;
  }

  openForm_s() {
    var ele2 = document.getElementById('OpenForm');
    if (ele2 != null) ele2.style.display = 'none';

    var ele = document.getElementById('SaveForm');
    if (ele != null) ele.style.display = 'block';
  }
  async sendShapesToSave() {
    var shaperec: Rect[] = this.stage.find('.rectangle');
    var shapeell: Ellipse[] = this.stage.find('.ellipse');
    var shapecirc: Circle[] = this.stage.find('.circle');
    var shapetri: RegularPolygon[] = this.stage.find('.triangle');
    var shapeline: Line[] = this.stage.find('.line');
    const ourflag: boolean = true;

    for (let i of shaperec) {
      this.sender(
        i.name(),
        i.fill(),
        Number(i.id()),
        Number(i.id()),
        i.stroke(),
        ourflag,
        [i.x(), i.y(), i.width(), i.height(), i.rotation()]
      );
      await new Promise(f => setTimeout(f, 10));
    }

    for (let i of shapeell) {
      this.sender(
        i.name(),
        i.fill(),
        Number(i.id()),
        Number(i.id()),
        i.stroke(),
        ourflag,
        [i.x(), i.y(), i.radiusX(), i.radiusY(), i.rotation()]
      );
      await new Promise(f => setTimeout(f, 10));
    }

    for (let i of shapecirc) {
      this.sender(
        i.name(),
        i.fill(),
        Number(i.id()),
        Number(i.id()),
        i.stroke(),
        ourflag,
        [i.x(), i.y(), i.radius(), i.radius(), i.rotation()]
      );
      await new Promise(f => setTimeout(f, 10));
    }

    for (let i of shapetri) {
      this.sender(
        i.name(),
        i.fill(),
        Number(i.id()),
        Number(i.id()),
        i.stroke(),
        ourflag,
        [i.x(), i.y(), i.radius(), i.radius(), i.rotation()]
      );
      await new Promise(f => setTimeout(f, 10));
    }

    for (let i of shapeline) {
      var p1: number = i.points()[0];
      var p2: number = i.points()[1];
      var p3: number = i.points()[2];
      var p4: number = i.points()[3];
      var first_point = i.getAbsoluteTransform().point({ x: p1, y: p2 });
      var second_point = i.getAbsoluteTransform().point({ x: p3, y: p4 });
      this.sender(
        i.name(),
        i.fill(),
        Number(i.id()),
        Number(i.id()),
        i.stroke(),
        ourflag,
        [first_point.x, first_point.y, second_point.x, second_point.y, i.rotation()]
      );
      await new Promise(f => setTimeout(f, 10));
    }
  }
  sender(
    name: string,
    filler: string,
    previousid: number,
    id: number,
    ouline: string,
    bool: boolean,
    arr: number[]
  ) {
    this.http
      .get('http://localhost:9090/backend/store', {
        responseType: 'text',
        params: {
          type: name,
          fill: filler,
          previd: previousid,
          id: id,
          border: ouline,
          flag: bool,
          additionalAttributes: arr,
        },
        observe: 'response',
      })
      .subscribe((response) => {
        this.back = response.body;
      });
  }

  async savej() {
    this.sendShapesToSave();
    this.path = prompt('please enter the file path', 'D:/paint1.json');
    await new Promise(f => setTimeout(f, 1000));
    this.http
      .get('http://localhost:9090/backend/saveJSON', {
        responseType: 'text',
        params: {
          path: this.path,
        },
        observe: 'response',
      })
      .subscribe((response) => {
        var t = response.body;
      });
  }
  loadj() {
    this.load_flag = true;
    this.path = prompt('please enter the file path', 'D:/paint1.json');
    this.http
      .get('http://localhost:9090/backend/loadJSON', {
        responseType: 'json',
        params: {
          path: this.path,
        },
        observe: 'response',
      })
      .subscribe((response) => {
        var loadMap = new Map<any, any>();
        var x: any = response.body;
        console.log("load: ", response.body);
        for (var value in response.body) {
          loadMap.set(Number(value), x[value]);
          this.count = Number(value);
        }
        this.elements = loadMap;
        this.loadToField();
      });
  }

  async savex() {
    this.sendShapesToSave();
    this.path = prompt('Please enter the file path', 'D:/paint2.xml');
    await new Promise(f => setTimeout(f, 1000));
    this.http
      .get('http://localhost:9090/backend/saveXML', {
        responseType: 'text',
        params: {
          path: this.path,
        },
        observe: 'response',
      })
      .subscribe((response) => {
        var t = response.body;
      });
  }
  loadx() {
    this.load_flag = true;
    this.path = prompt('Enter the path of the file ', 'D:/paint2.xml');
    this.http
      .get('http://localhost:9090/backend/loadXML', {
        responseType: 'json',
        params: {
          path: this.path,
        },
        observe: 'response',
      })
      .subscribe((response) => {
        var loadMap = new Map<any, any>();
        var x: any = response.body;
        for (var value in response.body) {
          loadMap.set(Number(value), x[value]);
          this.count = Number(value);
        }
        this.elements = loadMap;
        this.loadToField();
      });
  }

  closeForm_s() {
    var ele = document.getElementById('SaveForm');
    if (ele != null) ele.style.display = 'none';
  }
  openForm_o() {
    var ele2 = document.getElementById('SaveForm');
    if (ele2 != null) ele2.style.display = 'none';
    var ele = document.getElementById('OpenForm');
    if (ele != null) ele.style.display = 'block';
  }
  closeForm_o() {
    var ele = document.getElementById('OpenForm');
    if (ele != null) ele.style.display = 'none';
  }

  store(shape: Shape, exist: boolean, previd: number) {
    if (shape.name() == 'line') {
      this.elements.set(Number(shape.id()), [shape.name(), shape.fill(), shape.stroke(), this.x1, this.y1, this.x2, this.y2, shape.rotation(), exist, previd]);
    }
    else if (shape.name() == 'triangle' || shape.name() == 'circle' || shape.name() == 'ellipse') {
      this.elements.set(Number(shape.id()), [shape.name(), shape.fill(), shape.stroke(), shape.x(), shape.y(), shape.width() / 2, shape.height() / 2, shape.rotation(), exist, previd]);
    }
    else {
      this.elements.set(Number(shape.id()), [shape.name(), shape.fill(), shape.stroke(), shape.x(), shape.y(), shape.width(), shape.height(), shape.rotation(), exist, previd]);
    }
    this.sendToBack(shape);
  }
  sendToBack(shape: Shape) {
    let arr = [Number(this.elements.get(Number(shape.id()))[3]), Number(this.elements.get(Number(shape.id()))[4]), Number(this.elements.get(Number(shape.id()))[5]), Number(this.elements.get(Number(shape.id()))[6]), Number(this.elements.get(Number(shape.id()))[7])];
    this.http.get('http://localhost:9090/backend/shape', {
      responseType: 'text',
      params: {
        type: this.elements.get(Number(shape.id()))[0],
        fill: this.elements.get(Number(shape.id()))[1],
        previd: this.elements.get(Number(shape.id()))[9],
        id: Number(shape.id()),
        border: this.elements.get(Number(shape.id()))[2],
        flag: this.elements.get(Number(shape.id()))[8],
        additionalAttributes: arr
      },
      observe: "response"
    })
      .subscribe((response) => {
        this.back = response.body;
      })
  }

  undo() {
    if (this.delete) {
      this.loadToField();
      return;
    }
    this.redo_flag = true;
    this.http
      .get('http://localhost:9090/backend/un', {
        responseType: 'json',
        params: {
          isundo: this.undo_flag,
        },
        observe: 'response',
      })

      .subscribe((response) => {
        var mapp = new Map<any, any>();
        var x: any = response.body;
        if (x == null) return;
        for (var value in response.body) {
          mapp.set(Number(value), x[value]);
        }
        this.elements = mapp;
        this.loadToField();
        if (this.undo_flag == true) {
          this.undo_flag = false;
        }
      });
  }
  redo() {
    if (this.delete) {
      this.layer.destroyChildren();
      this.layer.destroy();
      this.stage.destroy();
      this.ngOnInit();
      this.tr = new Konva.Transformer();
      return;
    }
    this.http
      .get('http://localhost:9090/backend/RE', {
        responseType: 'json',
        params: {
          isredo: this.redo_flag,
        },
        observe: 'response',
      })
      .subscribe((response) => {
        var mapp = new Map<any, any>();
        var x: any = response.body;
        if (x == null) return;
        for (var value in response.body) {
          mapp.set(Number(value), x[value]);
        }
        this.elements = mapp;
        this.loadToField();
      });
  }
  
  reDraw(m: Map<any, any>, c: number, id: string) {
    let name = String(m.get(c)[0]);
    let filler = String(m.get(c)[1]);
    let outLine = String(m.get(c)[2]);
    let first_x = Number(m.get(c)[3]);
    let first_y = Number(m.get(c)[4]);
    let second_x = Number(m.get(c)[5]);
    let second_y = Number(m.get(c)[6]);
    let rot = Number(m.get(c)[7]);
    if (name == 'rectangle') {
      let rect: Rect;
      rect = new Konva.Rect({
        x: first_x,
        y: first_y,
        rotation: rot,
        width: second_x,
        height: second_y,
        fill: filler,
        stroke: outLine,
        strokeWidth: 2,
        draggable: true,
        name: 'rectangle',
        id: id
      });
      this.layer.add(rect).batchDraw();
      this.select(rect);
    } else if (name == 'ellipse') {
      let ellipse: Ellipse;
      ellipse = new Konva.Ellipse({
        x: first_x,
        y: first_y,
        rotation: rot,
        radiusX: second_x,
        radiusY: second_y,
        fill: filler,
        stroke: outLine,
        strokeWidth: 2,
        draggable: true,
        name: 'ellipse',
        id: id
      });
      this.layer.add(ellipse).batchDraw();
      this.select(ellipse);
    } else if (name == 'circle') {
      let circle: Circle;
      circle = new Konva.Circle({
        x: first_x,
        y: first_y,
        rotation: rot,
        radius: second_x,
        fill: filler,
        stroke: outLine,
        strokeWidth: 2,
        draggable: true,
        name: 'circle',
        id: id
      });
      this.layer.add(circle).batchDraw();
      this.select(circle);
    } else if (name == 'triangle') {
      let triangle: RegularPolygon;
      triangle = new Konva.RegularPolygon({
        x: first_x,
        y: first_y,
        rotation: rot,
        sides: 3,
        radius: second_x,
        fill: filler,
        stroke: outLine,
        strokeWidth: 2,
        draggable: true,
        name: 'triangle',
        id: id
      });
      this.layer.add(triangle).batchDraw();
      this.select(triangle);
    } else {
      let line: Line;
      line = new Konva.Line({
        points: [first_x, first_y, second_x, second_y],
        rotation: rot,
        strokeWidth: 2,
        stroke: outLine,
        draggable: true,
        name: 'line',
        id: id
      });
      this.layer.add(line).batchDraw();
      this.select(line);
    }
  }

  loadToField() {
    this.layer.destroyChildren();
    this.layer.destroy();
    this.stage.destroy();
    this.ngOnInit();
    this.tr = new Konva.Transformer();
    let map = new Map<any, any>();
    map = this.elements;
    for (let i of map.keys()) {
      if (map.get(i)[8] == "false") {
        var s: string = "#" + String(map.get(i)[9]);
        var sh: Shape[] = this.stage.find(s);
        if (sh.length > 0) {
          sh[0].destroy();
          this.layer.draw();
        }
        continue;
      }
      else if (map.get(i)[9] != String(i)) {
        var s: string = "#" + String(map.get(i)[9]);
        var sh: Shape[] = this.stage.find(s);
        if (sh.length > 0) {
          sh[0].fill(String(map.get(i)[1]));
          sh[0].stroke(String(map.get(i)[2]));
          sh[0].id(String(i));
          continue;
        }
      }
      this.reDraw(map, i, String(map.get(i)[9]));
    }
  }
}