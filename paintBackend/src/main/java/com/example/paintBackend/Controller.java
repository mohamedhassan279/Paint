package com.example.paintBackend;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;

import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;

import com.example.paintBackend.shapes.ShapeFactory;
import com.example.paintBackend.shapes.Shape;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/backend")


public class Controller {
    @GetMapping("/shape")
    public void drawShape(@RequestParam String type, @RequestParam String fill, @RequestParam long previd, @RequestParam long id, @RequestParam String border, @RequestParam boolean flag, @RequestParam double additionalAttributes[]) {
        ShapeFactory factory = new ShapeFactory();
        UndoAndRedo undoAndRedo = new UndoAndRedo();
        Shape shape = factory.makeShape(type);
        shape.draw(type, fill, previd ,id, border, flag, additionalAttributes);
        undoAndRedo.clearRedo();
        //insert our shape in the hashmap of the undo
        undoAndRedo.insertShape(shape);
    }

    @GetMapping("/clone")
    public String copy(@RequestParam String type,@RequestParam String fill,@RequestParam long id,@RequestParam String border,@RequestParam double additionalAttributes[])
    {
        Shape s = new Shape().makeCopy(type,fill,id+1,id+1,border,true,additionalAttributes);
        UndoAndRedo undoAndRedo = new UndoAndRedo();
        undoAndRedo.insertShape(s);
        SendCopied sendCopied = new SendCopied();
        return sendCopied.ConvertJson(s);
    }

    @GetMapping("/un")
    public String UN(@RequestParam Boolean isundo) {
        UndoAndRedo undoAndRedo = new UndoAndRedo();
        if (isundo) {
            undoAndRedo.clearRedo();
            undoAndRedo.clearUndo();
            return "";
        }
        if(UndoAndRedo.undo_hashmap.isEmpty()){
            return null;
        }
        HashMap<Long, String[]> p = undoAndRedo.undo();
        //return the json file to the front to be displayed
        return undoAndRedo.convertMapToJson(p);
    }

    @GetMapping("/RE")
    public String RE(@RequestParam Boolean isredo) {
        UndoAndRedo undoAndRedo = new UndoAndRedo();
        //return value of hashmap undo to front to draw
        HashMap<Long, String[]> r = undoAndRedo.redo();
        return undoAndRedo.convertMapToJson(r);
    }
    @GetMapping("/store")
    public void storing(@RequestParam String type, @RequestParam String fill, @RequestParam long previd, @RequestParam long id, @RequestParam String border, @RequestParam boolean flag, @RequestParam double additionalAttributes[]) {
    	StoreToSave storeToSave = new StoreToSave();
    	storeToSave.storeInHash(type, fill, previd, id, border, flag, additionalAttributes);
    }
    
    @GetMapping("/saveJSON")
    public String SaveJSON(@RequestParam String path) {
        SaveAndLoad save = new SaveAndLoad();
        save.saveInJson(path);
        return "finished";
    }

    @GetMapping("/loadJSON")
    public  String loadJSON(@RequestParam String path) throws StreamReadException, DatabindException, IOException {
        InputStream getLocalJsonFile = new FileInputStream(path);
        HashMap<Long,String[]> jMap = new ObjectMapper().readValue(getLocalJsonFile, HashMap.class);
        UndoAndRedo un = new UndoAndRedo();
        return un.convertMapToJson(jMap);
    }

    @GetMapping("/saveXML")
    public String SaveXML(@RequestParam String path) {
        SaveAndLoad save = new SaveAndLoad();
        save.saveInXML(path);
        return "finished";
    }

    @GetMapping("/loadXML")
    public  String loadXML(@RequestParam String path){
        SaveAndLoad load = new SaveAndLoad();
        UndoAndRedo ur = new UndoAndRedo();
        return ur.convertMapToJson(load.loadFromXML(path));
    }
}