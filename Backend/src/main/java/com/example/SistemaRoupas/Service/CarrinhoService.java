package com.example.SistemaRoupas.Service;

import com.example.SistemaRoupas.entity.Carrinho;
import com.example.SistemaRoupas.entity.ItemCarrinho;
import com.example.SistemaRoupas.entity.Produto;
import com.example.SistemaRoupas.repositories.CarrinhoRepository;
import com.example.SistemaRoupas.repositories.ItemCarrinhoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CarrinhoService {

    @Autowired
    private CarrinhoRepository carrinhoRepository;

    @Autowired
    private ItemCarrinhoRepository itemCarrinhoRepository;

    public Carrinho adicionarProdutoAoCarrinho(Long carrinhoId, Produto produto, int quantidade) {
        Carrinho carrinho = carrinhoRepository.findById(carrinhoId).orElseThrow(() -> new RuntimeException("Carrinho não encontrado"));

        ItemCarrinho item = new ItemCarrinho();
        item.setProduto(produto);
        item.setQuantidade(quantidade);

        carrinho.getItens().add(item);
        carrinho.atualizarTotal(); // Atualiza o total do carrinho após adicionar o item
        carrinhoRepository.save(carrinho);

        return carrinho;
    }

    public Carrinho removerProdutoDoCarrinho(Long carrinhoId, Long itemCarrinhoId) {
        Carrinho carrinho = carrinhoRepository.findById(carrinhoId).orElseThrow(() -> new RuntimeException("Carrinho não encontrado"));
        ItemCarrinho item = itemCarrinhoRepository.findById(itemCarrinhoId).orElseThrow(() -> new RuntimeException("Item não encontrado"));

        carrinho.getItens().remove(item);
        carrinho.atualizarTotal();
        carrinhoRepository.save(carrinho);

        return carrinho;
    }

    public Carrinho listarCarrinho(Long carrinhoId) {
        return carrinhoRepository.findById(carrinhoId).orElseThrow(() -> new RuntimeException("Carrinho não encontrado"));
    }
}

