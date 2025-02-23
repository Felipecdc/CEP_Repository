import { sendOrderNotificationEmail } from "../sendOrderNotificationEmail";
import nodemailer from "nodemailer-mock";

describe("sendOrderNotificationEmail", () => {
  beforeEach(() => {
    // Limpa a fila de e-mails antes de cada teste
    nodemailer.mock.reset();
    process.env.EMAIL_USER = "polam.studio@gmail.com"; // Definição explícita da variável de ambiente
  });

  it("should send email with correct parameters", async () => {
    const email = "test@example.com";
    const orderId = "12345";
    const trackingUrl = "https://example.com/track/12345";
    const trackingCode = "AF123456789";

    const result = await sendOrderNotificationEmail(
      email,
      orderId,
      trackingUrl,
      trackingCode
    );

    // Obtém o e-mail enviado
    const sentEmails = nodemailer.mock.getSentMail();

    console.log(sentEmails);
    console.log(sentEmails.length);

    expect(sentEmails.length).toBe(1);
    expect(sentEmails[0]).toMatchObject({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Atualização do seu pedido #${orderId} - Action Figures`,
      html: expect.stringContaining(trackingCode),
    });

    // Verifica se a função retornou um resultado válido
    expect(result).not.toBeNull();
  });
});
