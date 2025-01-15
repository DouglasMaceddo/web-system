package com.example.SistemaRoupas.controllers;

import com.example.SistemaRoupas.entity.Produto;
import com.example.SistemaRoupas.Service.ProdutoService;
import com.example.SistemaRoupas.entity.User;
import com.example.SistemaRoupas.repositories.ProdutoRepository;
import com.example.SistemaRoupas.repositories.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    @Autowired
    private final ProdutoService produtoService;
    private final UserRepository userRepository;
    private final ProdutoRepository produtoRepository;
    private String uploadDir = "src/main/resources/static/uploads/";


    private boolean isAdminUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> user = userRepository.findByEmail(username);
        return user.isPresent() && "admin".equals(user.get().getRole());
    }

    private String obterNomeImagem(MultipartFile imagem) {
        return imagem.getOriginalFilename();
    }

    @PostMapping("/addProduto")
    public ResponseEntity<Produto> addProduto(
            @RequestParam("produto") String produtoJson,
            @RequestParam("imagem") MultipartFile imagem) {

        try {

            // Converte o JSON para o objeto Produto
            ObjectMapper objectMapper = new ObjectMapper();
            Produto produto = objectMapper.readValue(produtoJson, Produto.class);

            // Obtemos o nome da imagem (sem salvar no servidor)
            String nomeImagem = obterNomeImagem(imagem);

            // Define a URL da imagem (sem salvar, apenas usa o nome)
            produto.setImagemUrl("/uploads/" + nomeImagem);

            // Adiciona o produto usando o serviço
            Produto novoProduto = produtoService.adicionarProduto(produto);

            // Retorna a resposta de sucesso
            return ResponseEntity.status(HttpStatus.CREATED).body(novoProduto);
        } catch (Exception e) {
            // Se ocorrer algum erro, retorna um erro HTTP 400
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/updateProduto/{id}")
    public ResponseEntity<Produto> updateProduto(@PathVariable Long id, @RequestBody Produto produto) {

        Produto produtoExistente = produtoService.getProdutoById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        produtoExistente.setNome(produto.getNome());
        produtoExistente.setDescricao(produto.getDescricao());
        produtoExistente.setPreco(produto.getPreco());

        Produto produtoAtualizado = produtoService.adicionarProduto(produtoExistente);
        return ResponseEntity.ok(produtoAtualizado);
    }


    @DeleteMapping("/deleteProduto/{id}")
    public ResponseEntity<Void> deleteProduto(@PathVariable Long id) {

        produtoService.deleteproduto(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping
    public ResponseEntity<List<Produto>> getCatalogo() {
        List<Produto> produtos = produtoRepository.findAll();
        return ResponseEntity.ok(produtos);
    }
}
