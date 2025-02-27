# 📦 Shipping & Tracking API Integration

<img src="https://source.unsplash.com/800x400/?shipping,courier" alt="Shipping & Tracking" width="100%" />

Este repositório é uma biblioteca modular para integrar APIs de **envio**, **rastreamento** e **gerenciamento de pedidos**. O objetivo é proporcionar uma maneira fácil e eficiente de simular fretes, criar pedidos de envio, gerar etiquetas e rastrear entregas.

## 🚀 Funcionalidades

Atualmente, o projeto contém as seguintes funcionalidades:

### 📌 **Gerenciamento de Conta**

- 🔍 **Obter Informações da Conta** → `getAccountInformation.ts`
- 💰 **Consultar Saldo** → `getAccountBalance.ts`

### 🛒 **Gerenciamento de Carrinho**

- 🏷️ **Criar Pedido de Envio** → `createCartShippingOrder.ts`
- 📋 **Listar Todos os Pedidos** → `getAllCartOrders.ts`
- 📄 **Consultar Pedido Específico** → `getCartOrderDetails.ts`
- ❌ **Remover Pedido do Carrinho** → `removeCartOrder.ts`

### 📦 **Gerenciamento de Pedidos**

- 📋 **Listar Todos os Pedidos** → `getAllOrdersFromApi.ts`
- 📊 **Filtrar Pedidos por Status** → `getOrdersByStatusFromApi.ts`

### 🚚 **Gerenciamento de Envios**

- 💰 **Calcular Frete** → `calculateShippingCost.ts`
- ✅ **Confirmar Pedido** → `checkoutOrderCreate.ts`
- ❌ **Cancelar Envio** → `cancelShipment.ts`
- 🏷️ **Gerar Etiqueta de Envio** → `generateShippingLabelForOrder.ts`
- 🖨️ **Imprimir Etiqueta de Envio** → `printShippingLabelForOrder.ts`
- 📍 **Rastrear Pedido** → `trackShipmentStatusForOrder.ts`
- 📧 **Enviar Notificação de Pedido por E-mail** → `sendOrderNotificationEmail.ts`

## 🛠 Tecnologias Utilizadas

- **Node.js** → Para o desenvolvimento do backend.
- **TypeScript** → Para segurança e robustez na codificação.
- **node-fetch** → Para requisições HTTP com APIs externas.
- **dotenv** → Para armazenar variáveis de ambiente de forma segura.
- **nodemailer** → Para envio de notificações por e-mail.
- **Jest** → Para testes automatizados das integrações.

## 📑 Como Usar

### 1️⃣ **Configuração Inicial**

1. Clone este repositório:
   ```sh
   git clone https://github.com/seuusuario/shipping-tracking-api.git
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Configure as variáveis de ambiente no arquivo `.env`:
   ```env
   MELHOR_ENVIO_AUTH_TOKEN=seu_token_aqui
   SMTP_HOST=smtp.seuprovedor.com
   SMTP_PORT=587
   EMAIL_USER=seuemail@dominio.com
   EMAIL_PASS=sua_senha
   ```

### 2️⃣ **Executando as Funcionalidades**

Para calcular o frete, por exemplo:

```ts
import { calculateShippingCost } from "./melhorenvio/03_shipping/calculateShippingCost";

calculateShippingCost({
  cepOrigem: "12345678",
  cepDestino: "12345678",
});
```

Para enviar uma notificação de pedido por e-mail:

```ts
import { sendOrderNotificationEmail } from "./notifications/sendOrderNotificationEmail";

sendOrderNotificationEmail({
  email: "cliente@exemplo.com",
  orderId: "12345",
  trackingUrl: "https://example.com/track/12345",
  trackingCode: "AF123456789",
});
```

### 3️⃣ **Rodando os Testes**

```sh
npm test
```

## 📸 Exemplos de Respostas

### ✅ **Cancelamento de Envio**

```json
{
  "success": true,
  "message": "Shipment canceled successfully.",
  "data": {
    "order_id": "123456",
    "status": "canceled",
    "cancellation_reason": "Pedido do cliente"
  }
}
```

### 📦 **Cálculo de Frete**

```json
{
  "origin": "SP",
  "destination": "RJ",
  "cost": 19.9,
  "delivery_time": "3 dias úteis"
}
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

💡 **Dicas:**

- 🔄 Atualize as credenciais da API no `.env` regularmente.
- 🛠 Se precisar adicionar novas funcionalidades, siga a estrutura modular do projeto.
- 🚀 Para contribuições, abra um PR com as melhorias! 😃
