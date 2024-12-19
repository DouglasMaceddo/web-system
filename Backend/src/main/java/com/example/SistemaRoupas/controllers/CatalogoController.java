package com.example.SistemaRoupas.controllers;


import com.example.SistemaRoupas.entity.Produto;
import com.example.SistemaRoupas.repositories.ProdutoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/Catalogo")
public class CatalogoController {

    private final ProdutoRepository produtoRepository;

    public CatalogoController (ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    @GetMapping
    public ResponseEntity<List<Produto>> getCatalogo() {
        List<Produto> produtos = produtoRepository.findAll();
        return ResponseEntity.ok(produtos);
    }
}
