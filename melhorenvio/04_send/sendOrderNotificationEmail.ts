import nodemailer from "nodemailer";
import "dotenv/config";

// Configura o serviço de envio de e-mails via Gmail usando o Nodemailer
// É necessário gerar uma senha de app no Gmail para funcionar corretamente
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Servidor SMTP do Gmail
  port: 587, // Porta padrão para envio com STARTTLS
  secure: false, // STARTTLS é usado em vez de SSL
  auth: {
    user: process.env.EMAIL_USER, // E-mail fornecido pelo arquivo .env
    pass: process.env.EMAIL_PASS, // Senha gerada para apps (não a senha comum)
  },
});

// Função para enviar e-mail de notificação com os detalhes do pedido
export const sendOrderNotificationEmail = async (
  email: string,
  orderId: string,
  trackingUrl: string,
  trackingCode: string
) => {
  // Configura o conteúdo do e-mail (remetente, destinatário, assunto e corpo HTML)
  const mailOptions = {
    from: process.env.EMAIL_USER, // Remetente (e-mail configurado no .env)
    to: email, // Destinatário (cliente)
    subject: `Atualização do seu pedido #${orderId} - Action Figures`, // Assunto do e-mail
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background-color: #fafafa; border-radius: 8px; border: 1px solid #e2e2e2; padding: 20px;">
      
        <!-- Cabeçalho com título e slogan -->
        <div style="text-align: center; padding-bottom: 30px; border-bottom: 2px solid #ddd; margin-bottom: 20px;">
          <h1 style="color: #4CAF50; font-size: 40px; font-weight: bold;">Action Figures Collector</h1>
          <p style="font-size: 18px; color: #555;">Onde sua coleção de action figures se torna realidade!</p>
        </div>
        
        <!-- Corpo principal com mensagem e código de rastreio -->
        <div style="padding: 20px; background-color: #ffffff; border-radius: 8px;">
          <h2 style="color: #333; font-size: 24px;">🚚 Seu pedido #${orderId} está a caminho! 📦</h2>
          <p style="font-size: 16px; color: #333; line-height: 1.6;">Olá, ${
            email.split("@")[0]
          }!</p>
          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Seu pedido de action figure foi processado com sucesso e já está em trânsito. 
            O momento da sua coleção chegou, e queremos garantir que você acompanhe cada detalhe até a entrega! 👏
          </p>
          
          <!-- Exibição do código de rastreio -->
          <div style="text-align: center; margin-top: 30px;">
            <p style="font-size: 18px; color: #4CAF50; font-weight: bold;">Aqui está o seu código de rastreio:</p>
            <div style="background-color: #f8f8f8; padding: 10px 20px; font-size: 16px; color: #333; font-family: monospace; border-radius: 5px;">
              ${trackingCode}
            </div>
          </div>

          <!-- Botão para acompanhar o pedido -->
          <div style="text-align: center; margin-top: 20px;">
            <a href="${trackingUrl}" style="display: inline-block; background-color: #4CAF50; color: #fff; padding: 12px 25px; text-decoration: none; font-weight: bold; border-radius: 5px;">
              Acompanhar Pedido
            </a>
          </div>

          <!-- Agradecimento personalizado -->
          <div style="margin-top: 40px; text-align: center;">
            <h3 style="color: #4CAF50; font-size: 22px;">Obrigado por ser um colecionador apaixonado!</h3>
            <p style="font-size: 16px; color: #333; font-weight: bold;">
              Continue expandindo sua coleção com a gente!
            </p>
          </div>
        </div>

        <!-- Redes sociais -->
        <div style="text-align: center; margin-top: 40px;">
          <p style="font-size: 16px; color: #777;">Siga-nos nas redes sociais:</p>
          <a href="https://www.instagram.com/suainstagram" style="margin: 0 10px;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" style="width: 40px; height: 40px;">
          </a>
          <a href="https://www.suastore.com" style="margin: 0 10px;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Online_store_icon.svg" alt="Loja Online" style="width: 40px; height: 40px;">
          </a>
        </div>

        <!-- Rodapé -->
        <div style="text-align: center; margin-top: 40px; font-size: 12px; color: #888;">
          <p>&copy; 2025 Action Figures Collector - Todos os direitos reservados.</p>
        </div>
      </div>
    `,
  };

  try {
    // Envia o e-mail e retorna as informações
    const info = await transporter.sendMail(mailOptions);
    return info; // Retorna a resposta do envio para quem chamou a função
  } catch (error) {
    return null; // Retorna null em caso de falha
  }
};

// Teste rápido da função com dados fictícios
// sendOrderNotificationEmail(
//   "felipecdc09@gmail.com", // E-mail do cliente
//   "12345", // ID do pedido
//   "https://example.com/track/12345", // URL de rastreamento
//   "AF123456789" // Código de rastreio
// );
