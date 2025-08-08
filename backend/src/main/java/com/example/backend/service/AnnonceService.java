package com.example.backend.service;

import com.example.backend.model.Annonce;
import com.example.backend.repository.AnnonceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class AnnonceService {

    @Autowired
    private AnnonceRepository annonceRepository;

    public Annonce createAnnonce(
            String titre,
            String description,
            double prix,
            String type,
            MultipartFile coverImage,
            MultipartFile pdfFile,
            String creator,
            String creationDate,
            String level,
            String specialty
    ) throws IOException {

        Annonce annonce = new Annonce();
        annonce.setTitre(titre);
        annonce.setDescription(description);
        annonce.setPrix(prix);
        annonce.setType(type);

        if (creator != null && !creator.isEmpty()) {
            annonce.setCreator(creator);
        }
        if (creationDate != null && !creationDate.isEmpty()) {
            annonce.setCreationDate(creationDate);
        }
        if (level != null && !level.isEmpty()) {
            annonce.setLevel(level);
        }
        if (specialty != null && !specialty.isEmpty()) {
            annonce.setSpecialty(specialty);
        }

        // Create uploads directory if it doesn't exist
        String uploadDir = System.getProperty("user.dir") + "/uploads";
        File uploadFolder = new File(uploadDir);
        if (!uploadFolder.exists()) {
            uploadFolder.mkdirs();
        }

        // Save cover image
        if (coverImage != null && !coverImage.isEmpty()) {
            String imageName = UUID.randomUUID() + "_" + coverImage.getOriginalFilename();
            String imagePath = uploadDir + "/" + imageName;
            coverImage.transferTo(new File(imagePath));
            annonce.setCoverImage("/uploads/" + imageName);
        } else {
            throw new IOException("Cover image is required");
        }

        // Save PDF file
        if (pdfFile != null && !pdfFile.isEmpty()) {
            String pdfName = UUID.randomUUID() + "_" + pdfFile.getOriginalFilename();
            String pdfPath = uploadDir + "/" + pdfName;
            pdfFile.transferTo(new File(pdfPath));
            annonce.setPdfFile("/uploads/" + pdfName);
        } else {
            throw new IOException("PDF file is required");
        }

        return annonceRepository.save(annonce);
    }

    public List<Annonce> getAllAnnonces() {
        return annonceRepository.findAll();
    }

    public Annonce getAnnonceById(String id) {
        return annonceRepository.findById(id).orElse(null);
    }
}
