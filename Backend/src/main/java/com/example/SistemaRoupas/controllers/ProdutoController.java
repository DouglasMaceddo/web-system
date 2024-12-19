package com.example.SistemaRoupas.controllers;

import com.example.SistemaRoupas.Service.ProdutoService;
import com.example.SistemaRoupas.entity.Produto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @GetMapping("/catalogo")
    public List<Produto> getCatalogo() {
        return produtoService.getTodosProdutos();
    }
}

