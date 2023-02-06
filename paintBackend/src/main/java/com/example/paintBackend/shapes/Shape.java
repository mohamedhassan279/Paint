package com.example.paintBackend.shapes;

public class Shape implements IShape {

    private String type, border, fill;
    private double x1, y1, x2, y2,rotation_angle;
    private long id, previd;

    public double getRotation_angle() {
		return rotation_angle;
	}

	public void setRotation_angle(double rotation_angle) {
		this.rotation_angle = rotation_angle;
	}


	private boolean exist;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getBorder() {
        return border;
    }

    public void setBorder(String border) {
        this.border = border;
    }

    public String getFill() {
        return fill;
    }

    public void setFill(String fill) {
        this.fill = fill;
    }

    public double getX1() {
        return x1;
    }

    public void setX1(double x1) {
        this.x1 = x1;
    }

    public double getY1() {
        return y1;
    }

    public void setY1(double y1) {
        this.y1 = y1;
    }

    public double getX2() {
        return x2;
    }

    public void setX2(double x2) {
        this.x2 = x2;
    }

    public double getY2() {
        return y2;
    }

    public void setY2(double y2) {
        this.y2 = y2;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getPrevId() {
        return previd;
    }

    public void setPrevId(long previd) {
        this.previd = previd;
    }

    public boolean isExist() {
        return exist;
    }

    public void setExist(boolean exist) {
        this.exist = exist;
    }

    public void draw(String type, String fill, long previd, long id, String border, boolean exist, double additionalAttributes[]) {

    }
    @Override
    public Shape makeCopy(String type, String fill, long previd, long id, String border, boolean exist, double additionalAttributes[]) {
        ShapeFactory fact = new ShapeFactory();
        Shape s = fact.makeShape(type);
        s.draw(type,fill,previd,id,border,exist,additionalAttributes);
        return s;
    }

}
