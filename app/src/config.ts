const env = import.meta.env;

export const BUSINESS = {
  name: env.VITE_BUSINESS_NAME || "Brandify",
  email: env.VITE_CONTACT_EMAIL || "contact@example.com",
  phone: env.VITE_CONTACT_PHONE || "+000 000 0000",
  whatsapp: (env.VITE_WHATSAPP_NUMBER || "0000000000").replace(/\D/g, ""),
  location: env.VITE_BUSINESS_LOCATION || "Business location",
};

export const whatsappUrl = (message?: string) =>
  `https://wa.me/${BUSINESS.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

