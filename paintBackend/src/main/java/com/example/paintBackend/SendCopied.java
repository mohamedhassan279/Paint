package com.example.paintBackend;
import com.example.paintBackend.shapes.Shape;
import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.HashMap;

public class SendCopied {
    public String ConvertJson(Shape s){
        HashMap<Long, String[]> copy_hashmap = new HashMap<Long,String[]>();
        String[] shapeAttributes = new String[10];
        //inserting the shape attributes in the string array.
        shapeAttributes[0] = s.getType();
        shapeAttributes[1] = s.getFill();
        shapeAttributes[2] = s.getBorder();
        shapeAttributes[3] = String.valueOf(s.getX1());
        shapeAttributes[4] = String.valueOf(s.getY1());
        shapeAttributes[5] = String.valueOf(s.getX2());
        shapeAttributes[6] = String.valueOf(s.getY2());
        shapeAttributes[7] = String.valueOf(s.getRotation_angle());
        shapeAttributes[8] = "true";
        shapeAttributes[9] = String.valueOf(s.getPrevId());
        //finally add the shapeAttributes associated with the shape id in the hashmap
        copy_hashmap.put(s.getId(), shapeAttributes);
        //make an instatnce object of the mapper class
        ObjectMapper mapper = new ObjectMapper();
        //initialize the json file as an empty string
        String json="";
        try
        {//Convert Map to JSON
            json = mapper.writeValueAsString(copy_hashmap);
            //Print JSON output
        }
        catch (JsonGenerationException e) {
            e.printStackTrace();
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return json;
    }
}
