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

    @GetMapping
    public ResponseEntity<List<Annonce>> getAllAnnonces() {
        return ResponseEntity.ok(annonceService.getAllAnnonces());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Annonce> getAnnonceById(@PathVariable String id) {
        Annonce annonce = annonceService.getAnnonceById(id);
        if (annonce != null) {
            return ResponseEntity.ok(annonce);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
