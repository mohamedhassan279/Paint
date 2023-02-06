package com.example.paintBackend;

import java.util.HashMap;




public class StoreToSave {
	public static HashMap<Long, String[]> store_hashmap = new HashMap<Long,String[]>();
	
	public static HashMap<Long, String[]> getStore_hashmap() {
		return store_hashmap;
	}

	public static void setStore_hashmap(HashMap<Long, String[]> store_hashmap) {
		StoreToSave.store_hashmap = store_hashmap;
	}

	public void storeInHash(String type,String fill, Long previd, Long id, String border, boolean flag,double[] additional ) {
		String[] shapeAttributes = new String[10];
		//inserting the shape attributes in the string array.
		shapeAttributes[0] = type;
		shapeAttributes[1] = fill;
		shapeAttributes[2] = border;
		shapeAttributes[3] = String.valueOf(additional[0]);//x1
		shapeAttributes[4] = String.valueOf(additional[1]);//y1
		shapeAttributes[5] = String.valueOf(additional[2]);//x2
		shapeAttributes[6] = String.valueOf(additional[3]);//y2
		shapeAttributes[7] = String.valueOf(additional[4]);//rot
		shapeAttributes[8] = "true";
		shapeAttributes[9] = String.valueOf(previd);
		
		store_hashmap.put(id, shapeAttributes);
	}
	
	public void clearHash() {
		store_hashmap.clear();
	}
}
