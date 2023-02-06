package com.example.paintBackend.shapes;

public class Triangle extends Shape {
	public void draw(String type, String fill, long previd, long id, String border, boolean exist, double additionalAttributes[]) {
		this.setType("triangle");
		this.setFill(fill);
		this.setBorder(border);
		this.setId(id);
		this.setPrevId(previd);
		this.setExist(exist);
		this.setX1(additionalAttributes[0]);
		this.setY1(additionalAttributes[1]);
		this.setX2(additionalAttributes[2]);  //Radius 
		this.setRotation_angle(additionalAttributes[4]);
	}

	public Shape makeCopy(){
		Triangle triangleObject = null;
		try {
			triangleObject  = (Triangle) super.clone();
		} catch (CloneNotSupportedException e) {
			throw new RuntimeException(e);
		}
		return triangleObject  ;
	}
}
