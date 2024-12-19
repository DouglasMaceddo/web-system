package com.example.SistemaRoupas.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "carrinho")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Carrinho {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL)
    private List<ItemCarrinho> itens;

    private Double total;

    public void atualizarTotal() {
        this.total = itens.stream()
                .mapToDouble(item -> item.getProduto().getPreco() * item.getQuantidade())
                .sum();
    }
}

