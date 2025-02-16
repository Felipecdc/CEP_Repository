import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Alterado de "gmail" para "smtp.gmail.com"
  port: 587, // Usando a porta correta para SMTP
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const notifyClient = async (
  email: string,
  orderId: string,
  trackingUrl: string,
  trackingCode: string
) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Atualização do seu pedido #${orderId} - Action Figures`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background-color: #fafafa; border-radius: 8px; border: 1px solid #e2e2e2; padding: 20px;">
      
        <!-- Cabeçalho -->
        <div style="text-align: center; padding-bottom: 30px; border-bottom: 2px solid #ddd; margin-bottom: 20px;">
          <h1 style="color: #4CAF50; font-size: 40px; font-weight: bold;">Action Figures Collector</h1>
          <p style="font-size: 18px; color: #555;">Onde sua coleção de action figures se torna realidade!</p>
        </div>
        
        <!-- Corpo do email -->
        <div style="padding: 20px; background-color: #ffffff; border-radius: 8px;">
          <h2 style="color: #333; font-size: 24px;">🚚 Seu pedido #${orderId} está a caminho! 📦</h2>
          <p style="font-size: 16px; color: #333; line-height: 1.6;">Olá, ${
            email.split("@")[0]
          }!</p>
          <p style="font-size: 16px; color: #333; line-height: 1.6;">Seu pedido de action figure foi processado com sucesso e já está em trânsito. O momento da sua coleção chegou, e queremos garantir que você acompanhe cada detalhe até o momento da entrega! 👏</p>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="font-size: 18px; color: #4CAF50; font-weight: bold;">Aqui está o seu código de rastreio:</p>
            <div style="position: relative; display: inline-block; background-color: #f8f8f8; padding: 10px 20px; font-size: 16px; color: #333; font-family: monospace; border-radius: 5px; margin-top: 10px;">
              <span id="tracking-code">${trackingCode}</span>
              <button 
                onclick="navigator.clipboard.writeText('${trackingCode}'); alert('Código copiado para a área de transferência!');" 
                style="position: absolute; right: 5px; top: 5px; background-color: #e0e0e0; color: #4CAF50; border: none; font-size: 14px; cursor: pointer; padding: 5px; border-radius: 50%; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);">
                <i class="fas fa-copy" style="font-size: 16px;"></i>
              </button>
            </div>
          </div>

          <p style="font-size: 16px; color: #333; line-height: 1.6; margin-top: 20px;">Clique no botão abaixo para acompanhar o seu pedido diretamente no nosso site. Não deixe de conferir a evolução do envio até o destino final!</p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="${trackingUrl}" style="display: inline-block; background-color: #4CAF50; color: #fff; padding: 12px 25px; text-decoration: none; font-weight: bold; border-radius: 5px;">Acompanhar Pedido</a>
          </div>

          <!-- Texto adicional -->
          <div style="margin-top: 40px; text-align: center;">
            <h3 style="color: #4CAF50; font-size: 22px;">Obrigado por ser um colecionador apaixonado!</h3>
            <p style="font-size: 16px; color: #333; line-height: 1.6; font-weight: bold;">A sua coleção nunca foi tão especial! Cada action figure que você adquire é mais que uma peça de coleção – é parte de uma história que você constrói. Continue expandindo sua coleção com a gente!</p>
          </div>
        </div>

        <!-- Botões de redes sociais -->
        <div style="text-align: center; margin-top: 40px;">
          <p style="font-size: 16px; color: #777;">Fique por dentro das novidades e novidades para colecionadores! Acompanhe-nos nas redes sociais:</p>
          <a href="https://www.instagram.com/suainstagram" style="text-decoration: none; margin: 0 10px;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png" alt="Instagram" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid #ddd;">
          </a>
          <a href="https://www.suastore.com" style="text-decoration: none; margin: 0 10px;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Online_store_icon.svg/1200px-Online_store_icon.svg.png" alt="Loja Online" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid #ddd;">
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
    const info = await transporter.sendMail(mailOptions);
    console.log("Email enviado com sucesso:", info.response);
    return info;
  } catch (error) {
    console.error("Erro ao enviar email:", error || "Erro desconhecido");
    return null;
  }
};

// Teste
notifyClient(
  "felipecdc09@gmail.com",
  "12345",
  "https://example.com/track/12345",
  "AF123456789"
);
