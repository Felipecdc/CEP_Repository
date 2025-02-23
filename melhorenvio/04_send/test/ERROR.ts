import nodemailer from "nodemailer";
import { sendOrderNotificationEmail } from "../sendOrderNotificationEmail";

jest.mock("nodemailer");

const sendMailMock = jest.fn();
const createTransportMock = nodemailer.createTransport as jest.Mock;
createTransportMock.mockReturnValue({ sendMail: sendMailMock });

describe("sendOrderNotificationEmail", () => {
  beforeEach(() => {
    sendMailMock.mockReset();
  });

  it("deve enviar um e-mail corretamente com os parâmetros fornecidos", async () => {
    const email = "felipecdc09@gmail.com";
    const orderId = "12345";
    const trackingUrl = "https://example.com/track/12345";
    const trackingCode = "AF123456789";

    sendMailMock.mockResolvedValue({
      envelope: { to: [email] },
      response: "Ok",
    });

    // Chamando a função
    await sendOrderNotificationEmail(email, orderId, trackingUrl, trackingCode);

    // Verificando se o mock foi chamado com os parâmetros corretos
    await expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: process.env.EMAIL_USER,
        to: email,
        html: expect.stringContaining(orderId),
      })
    );
  });
});
