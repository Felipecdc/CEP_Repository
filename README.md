# 📦 Shipping & Tracking API Integration

Este repositório é uma biblioteca pessoal criada para integrar diferentes APIs de **envio**, **rastreamento** e **gerenciamento de pedidos**. O objetivo é proporcionar uma maneira fácil de simular fretes, criar pedidos de envio, gerar e imprimir etiquetas, e outras funcionalidades relacionadas ao processo de envio de mercadorias. O projeto está sendo desenvolvido de forma modular, com a intenção de futuramente adicionar integrações com outras APIs de envio.

## 🚀 Funcionalidades

Atualmente, o projeto contém as seguintes rotas principais:

1. **01_calculateShipping.mts** - Simula o frete antes da compra (essencial no checkout).
2. **02_createOrder.mts** - Cria o pedido de envio após a compra.
3. **03_getAllOrdersCart.mts** - Lista todos os pedidos realizados.
4. **04_getOrderCart.mts** - Consulta um pedido específico.
5. **05_removeOrder.mts** - Cancela um pedido não confirmado.
6. **06_checkoutOrder.mts** - Confirma o pagamento para gerar a etiqueta.
7. **07_confirmOrder.mts** - Confirma o envio e bloqueia alterações no pedido.
8. **08_generateLabel.mts** - Gera a etiqueta de envio.
9. **09_printLabel.mts** - Imprime a etiqueta gerada.
10. **10_trackShipment.mts** - Rastreia o envio.
11. **11_notifyClient.mts** - Notifica o cliente (via e-mail).

## 🛠 Tecnologias Utilizadas

- **Node.js** - Para o desenvolvimento do backend.
- **node-fetch** - Para integração com APIs externas de envio e rastreamento.
- **dotenv** - Para armazenar variáveis de ambiente (como chaves de API).
- **TypeScript** - Para tipagem e maior robustez no desenvolvimento.

## 📝 Licença

Este projeto está sob a licença XYZ. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
