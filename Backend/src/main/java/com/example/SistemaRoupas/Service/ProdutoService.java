package com.example.SistemaRoupas.Service;

import com.example.SistemaRoupas.entity.Produto;
import com.example.SistemaRoupas.repositories.ProdutoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Transactional
    public  Produto adicionarProduto(Produto produto){
        return produtoRepository.save(produto);
    }
    public Optional<Produto> getProdutoById(Long id) {
        return produtoRepository.findById(id);
    }
    public List<Produto> getTodosProdutos() {
        return produtoRepository.findAll();
    }
    public void deleteproduto(long id){
        produtoRepository.deleteById(id);
    }
}