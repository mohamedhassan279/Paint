package com.example.paintBackend.shapes;

public interface IShape extends Cloneable  {
	void draw(String type, String fill, long previd, long id, String border, boolean exist, double additionalAttributes[]);
	Shape makeCopy(String type, String fill, long previd, long id, String border, boolean exist, double additionalAttributes[]);
}
