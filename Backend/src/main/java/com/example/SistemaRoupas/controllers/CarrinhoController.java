package com.example.SistemaRoupas.controllers;

import com.example.SistemaRoupas.Service.CarrinhoService;
import com.example.SistemaRoupas.entity.Carrinho;
import com.example.SistemaRoupas.entity.Produto;
import com.example.SistemaRoupas.repositories.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carrinho")
public class CarrinhoController {

    @Autowired
    private CarrinhoService carrinhoService;

    @Autowired
    private ProdutoRepository produtoRepository;

    @PostMapping("/{carrinhoId}/adicionar/{produtoId}")
    public Carrinho adicionarProduto(@PathVariable Long carrinhoId, @PathVariable Long produtoId, @RequestParam int quantidade) {
        Produto produto = produtoRepository.findById(produtoId).orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        return carrinhoService.adicionarProdutoAoCarrinho(carrinhoId, produto, quantidade);
    }

    // Remover produto do carrinho
    @DeleteMapping("/{carrinhoId}/remover/{itemCarrinhoId}")
    public Carrinho removerProduto(@PathVariable Long carrinhoId, @PathVariable Long itemCarrinhoId) {
        return carrinhoService.removerProdutoDoCarrinho(carrinhoId, itemCarrinhoId);
    }

    // Listar os itens do carrinho
    @GetMapping("/{carrinhoId}")
    public Carrinho listarCarrinho(@PathVariable Long carrinhoId) {
        return carrinhoService.listarCarrinho(carrinhoId);
    }
}

