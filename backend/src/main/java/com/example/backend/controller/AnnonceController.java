package com.example.backend.controller;

import com.example.backend.model.Annonce;
import com.example.backend.service.AnnonceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/annonces")
@CrossOrigin(origins = "http://localhost:3000")
public class AnnonceController {

    @Autowired
    private AnnonceService annonceService;

    // CREATE
    @PostMapping
    public ResponseEntity<Annonce> addAnnonce(
            @RequestParam("titre") String titre,
            @RequestParam("description") String description,
            @RequestParam("prix") double prix,
            @RequestParam("type") String type,
            @RequestParam(value = "coverImage", required = true) MultipartFile coverImage,
            @RequestParam(value = "pdfFile", required = true) MultipartFile pdfFile,
            @RequestParam(value = "creator", required = false) String creator,
            @RequestParam(value = "creationDate", required = false) String creationDate,
            @RequestParam(value = "level", required = false) String level,
            @RequestParam(value = "specialty", required = false) String specialty
    ) throws IOException {

        Annonce savedAnnonce = annonceService.createAnnonce(
                titre, description, prix, type, coverImage, pdfFile,
                creator, creationDate, level, specialty
        );
        return ResponseEntity.ok(savedAnnonce);
    }

    // READ ALL
    @GetMapping
    public ResponseEntity<List<Annonce>> getAllAnnonces() {
        return ResponseEntity.ok(annonceService.getAllAnnonces());
    }

    // READ ONE
    @GetMapping("/{id}")
    public ResponseEntity<Annonce> getAnnonceById(@PathVariable String id) {
        Annonce annonce = annonceService.getAnnonceById(id);
        if (annonce != null) {
            return ResponseEntity.ok(annonce);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    // UPDATE
    // In AnnonceController.java
    @PutMapping("/{id}")
    public ResponseEntity<Annonce> updateAnnonce(
            @PathVariable String id,
            @RequestParam("titre") String titre,
            @RequestParam("type") String type,
            @RequestParam(value = "level", required = false) String level,
            @RequestParam(value = "specialty", required = false) String specialty,
            @RequestParam(value = "coverImage", required = false) MultipartFile coverImage,
            @RequestParam(value = "pdfFile", required = false) MultipartFile pdfFile // <-- add this
    ) throws IOException {
        Annonce updatedAnnonce = annonceService.updateAnnonce(id, titre, type, level, specialty, coverImage, pdfFile);
        if (updatedAnnonce != null) {
            return ResponseEntity.ok(updatedAnnonce);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnnonce(@PathVariable String id) {
        boolean deleted = annonceService.deleteAnnonce(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
