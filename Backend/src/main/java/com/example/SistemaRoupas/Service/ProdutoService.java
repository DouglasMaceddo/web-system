package com.example.SistemaRoupas.Service;

import com.example.SistemaRoupas.entity.Produto;
import com.example.SistemaRoupas.repositories.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Produto> getTodosProdutos() {
        return produtoRepository.findAll();
    }
}

