package com.example.backend.service;

import com.example.backend.model.Annonce;
import com.example.backend.repository.AnnonceRepository;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class AnnonceService {

    @Autowired
    private AnnonceRepository annonceRepository;

    // ==================== Firebase Upload ====================
    private String uploadFileToFirebase(MultipartFile file, String folderName) throws IOException {
        if (file == null || file.isEmpty()) return null;

        Bucket bucket = StorageClient.getInstance().bucket();
        String blobName = folderName + "/" + file.getOriginalFilename();
        bucket.create(blobName, file.getInputStream(), file.getContentType());

        // رابط مباشر دائم للملف (Uniform Bucket-Level Access يجب أن يكون مفعل)
        return "https://storage.googleapis.com/" + bucket.getName() + "/" + blobName;
    }

    private void saveFiles(Annonce annonce, MultipartFile coverImage, MultipartFile pdfFile) throws IOException {
        if (coverImage != null && !coverImage.isEmpty()) {
            String imageUrl = uploadFileToFirebase(coverImage, "images");
            annonce.setCoverImage(imageUrl);
        }

        if (pdfFile != null && !pdfFile.isEmpty()) {
            String pdfUrl = uploadFileToFirebase(pdfFile, "pdfs");
            annonce.setPdfFile(pdfUrl);
        }
    }

    // ==================== CREATE ====================
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

        if (creator != null && !creator.isEmpty()) annonce.setCreator(creator);
        if (creationDate != null && !creationDate.isEmpty()) annonce.setCreationDate(creationDate);
        if (level != null && !level.isEmpty()) annonce.setLevel(level);
        if (specialty != null && !specialty.isEmpty()) annonce.setSpecialty(specialty);

        saveFiles(annonce, coverImage, pdfFile);

        return annonceRepository.save(annonce);
    }

    // ==================== READ ====================
    public List<Annonce> getAllAnnonces() {
        return annonceRepository.findAll();
    }

    public Annonce getAnnonceById(String id) {
        return annonceRepository.findById(id).orElse(null);
    }

    // ==================== UPDATE ====================
    public Annonce updateAnnonce(
            String id,
            String titre,
            String type,
            String level,
            String specialty,
            MultipartFile coverImage,
            MultipartFile pdfFile
    ) throws IOException {
        Annonce annonce = annonceRepository.findById(id).orElse(null);
        if (annonce == null) return null;

        annonce.setTitre(titre);
        annonce.setType(type);
        if (level != null) annonce.setLevel(level);
        if (specialty != null) annonce.setSpecialty(specialty);

        saveFiles(annonce, coverImage, pdfFile);

        return annonceRepository.save(annonce);
    }

    // ==================== DELETE ====================
    public boolean deleteAnnonce(String id) {
        if (annonceRepository.existsById(id)) {
            annonceRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
