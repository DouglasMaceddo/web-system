import { ItemCarrinho } from './item-carrinho.model';

export interface Carrinho {
  id: number;
  itens: ItemCarrinho[];
  total: number;
}
