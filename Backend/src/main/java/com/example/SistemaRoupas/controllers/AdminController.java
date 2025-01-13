package com.example.SistemaRoupas.controllers;

import com.example.SistemaRoupas.entity.Produto;
import com.example.SistemaRoupas.Service.ProdutoService;
import com.example.SistemaRoupas.entity.User;
import com.example.SistemaRoupas.repositories.ProdutoRepository;
import com.example.SistemaRoupas.repositories.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final ProdutoService produtoService;
    private final UserRepository userRepository;
    private final ProdutoRepository produtoRepository;


    private boolean isAdminUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> user = userRepository.findByEmail(username);
        return user.isPresent() && "admin".equals(user.get().getRole());
    }

    private String salvarImagem(MultipartFile imagem) throws IOException {

        String diretorio = "caminho/para/salvar/imagens/";
        String nomeArquivo = UUID.randomUUID() + "_" + imagem.getOriginalFilename();
        Path caminhoArquivo = Paths.get(diretorio + nomeArquivo);
        Files.createDirectories(caminhoArquivo.getParent());
        Files.write(caminhoArquivo, imagem.getBytes());

        return "/imagens/" + nomeArquivo;
    }

    @PostMapping(value = "/addProduto", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Produto> addProduto(
            @RequestParam("produto") String produtoJson,
            @RequestParam("imagem") MultipartFile imagem) {

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Produto produto = objectMapper.readValue(produtoJson, Produto.class);

            String caminhoImagem = salvarImagem(imagem);
            produto.setImagemUrl(caminhoImagem);
            Produto novoProduto = produtoService.adicionarProduto(produto);

            return ResponseEntity.status(HttpStatus.CREATED).body(novoProduto);
        } catch (Exception e) {
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
