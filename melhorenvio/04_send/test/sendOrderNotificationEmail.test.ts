import nodemailer from "nodemailer";
import { sendOrderNotificationEmail } from "../sendOrderNotificationEmail";

jest.mock("nodemailer", () => ({
  createTransport: jest.fn().mockImplementation(() => ({
    sendMail: jest.fn().mockResolvedValue({ messageId: "123" }),
  })),
}));

describe("sendOrderNotificationEmail", () => {
  it("deve enviar um email com os parâmetros corretos", async () => {
    const email = "test@example.com";
    const orderId = "12345";
    const trackingUrl = "https://example.com/track/12345";
    const trackingCode = "AF123456789";

    const response = await sendOrderNotificationEmail({
      email,
      orderId,
      trackingUrl,
      trackingCode,
    });

    expect(nodemailer.createTransport).toHaveBeenCalledTimes(1);
    expect(response).toHaveProperty("messageId");
  });

  it("deve gerar erro se o email nao for fornecido", async () => {
    const orderId = "12345";
    const trackingUrl = "https://example.com/track/12345";
    const trackingCode = "AF123456789";

    try {
      await sendOrderNotificationEmail({
        email: "",
        orderId,
        trackingUrl,
        trackingCode,
      });
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Email is required");
      }
    }
  });

  it("deve gerar erro se o trackngCode nao for fornecido", async () => {
    const email = "test@example.com";
    const orderId = "12345";
    const trackingUrl = "https://example.com/track/12345";

    try {
      await sendOrderNotificationEmail({
        email,
        orderId,
        trackingUrl,
        trackingCode: "",
      });
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Tracking code is required");
      }
    }
  });

  it("deve gerar erro se o trackngUrl nao for fornecido", async () => {
    const email = "test@example.com";
    const orderId = "12345";
    const trackingCode = "AF123456789";

    try {
      await sendOrderNotificationEmail({
        email,
        orderId,
        trackingUrl: "",
        trackingCode,
      });
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Tracking url is required");
      }
    }
  });

  it("deve gerar erro se o orderId nao for fornecido", async () => {
    const email = "test@example.com";
    const trackingUrl = "https://example.com/track/12345";
    const trackingCode = "AF123456789";

    try {
      await sendOrderNotificationEmail({
        email,
        orderId: "",
        trackingUrl,
        trackingCode,
      });
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Order ID is required");
      }
    }
  });
});
