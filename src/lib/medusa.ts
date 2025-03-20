import Medusa from "@medusajs/js-sdk";

export const BACKEND_URL =
  process.env.MEDUSA_BACKEND_URL || "https://my-medusa-backend-production-8611.up.railway.app";

export const medusa = new Medusa({
  baseUrl: BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
});
