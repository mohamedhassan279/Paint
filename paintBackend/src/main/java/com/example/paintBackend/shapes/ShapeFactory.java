package com.example.paintBackend.shapes;

public class ShapeFactory {
	public Shape makeShape(String type) {
		if(type.equals("circle")) return new Circle();
		else if(type.equals("ellipse")) return new Ellipse();
		else if(type.equals("line"))return new Line();
		else if(type.equals("rectangle"))return new Rectangle();
		else return new Triangle();
	}

}
