import nodemailer from "nodemailer";
import { sendOrderNotificationEmail } from "../sendOrderNotificationEmail";

jest.mock("nodemailer", () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn().mockResolvedValue({ messageId: "123" }),
  })),
}));

describe("sendOrderNotificationEmail", () => {
  it("deve enviar um email com os parâmetros corretos", async () => {
    const email = "test@example.com";
    const orderId = "12345";
    const trackingUrl = "https://example.com/track/12345";
    const trackingCode = "AF123456789";

    const response = await sendOrderNotificationEmail(
      email,
      orderId,
      trackingUrl,
      trackingCode
    );

    expect(nodemailer.createTransport).toHaveBeenCalledTimes(1);
    expect(response).toHaveProperty("messageId");
  });
});
