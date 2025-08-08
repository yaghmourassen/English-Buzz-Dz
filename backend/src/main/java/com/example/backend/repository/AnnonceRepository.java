package com.example.backend.repository;

import com.example.backend.model.Annonce;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AnnonceRepository extends MongoRepository<Annonce, String> {
}
