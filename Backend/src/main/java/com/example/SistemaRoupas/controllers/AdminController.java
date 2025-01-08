package com.example.SistemaRoupas.controllers;

import com.example.SistemaRoupas.entity.Produto;
import com.example.SistemaRoupas.Service.ProdutoService;
import com.example.SistemaRoupas.entity.User;
import com.example.SistemaRoupas.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final ProdutoService produtoService;
    private final UserRepository userRepository;

    @PostMapping("/addProduto")
    public ResponseEntity<Produto> addProduto(@RequestBody Produto produto) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(username).orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getRole().equals("admin")) {
            return ResponseEntity.status(403).build();
        }

        Produto novoProduto = produtoService.adicionarProduto(produto);
        return ResponseEntity.ok(novoProduto);
    }

    // Endpoint para alterar um produto (somente admin)
    @PutMapping("/updateProduto/{id}")
    public ResponseEntity<Produto> updateProduto(@PathVariable Long id, @RequestBody Produto produto) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(username).orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getRole().equals("admin")) {
            return ResponseEntity.status(403).build();
        }

        Produto produtoExistente = produtoService.getProdutoById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        produtoExistente.setNome(produto.getNome());
        produtoExistente.setDescricao(produto.getDescricao());
        produtoExistente.setPreco(produto.getPreco());
        // Faça aqui todas as atualizações necessárias para o produto

        Produto produtoAtualizado = produtoService.adicionarProduto(produtoExistente);
        return ResponseEntity.ok(produtoAtualizado);
    }

    // Endpoint para remover um produto (somente admin)
    @DeleteMapping("/deleteProduto/{id}")
    public ResponseEntity<Void> deleteProduto(@PathVariable Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(username).orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getRole().equals("admin")) {
            return ResponseEntity.status(403).build();
        }

        produtoService.deleteproduto(id);
        return ResponseEntity.noContent().build();
    }
}