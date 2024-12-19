import { Produto } from './produto.model';

export interface ItemCarrinho {
  id: number;
  produto: Produto;
  quantidade: number;
}
