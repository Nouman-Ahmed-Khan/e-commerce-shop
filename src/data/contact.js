/* Contact details for VELLUM — single source of truth.
   Used by the Contact page, the Footer and the homepage custom-order button. */

// Primary WhatsApp line for customer enquiries and custom orders (international format, digits only)
export const WHATSAPP_NUMBER  = '923295126346'
export const WHATSAPP_DISPLAY = '+92 329-5126346'

export const whatsappLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

// Prefilled WhatsApp messages
export const WHATSAPP_MESSAGES = {
  custom:  "Hello VELLUM, I'm interested in discussing a custom order.",
  bespoke: "Hello VELLUM, I'd like to ask about a bespoke order.",
}

// Additional phone lines — calls only. Not assumed to be WhatsApp-enabled.
export const PHONES = [
  { display: '+92 347-3727277', tel: '+923473727277' },
  { display: '+92 303-0158986', tel: '+923030158986' },
  { display: '+92 326-0229598', tel: '+923260229598' },
]

export const EMAIL = 'noumanahmedkhan834@gmail.com'

export const SHOP_ADDRESS =
  'Bobby Shoes opposite Al-Rehman Plaza Satellite Town, New Katarian Satellite Town, Rawalpindi, 46000, Pakistan'

// Existing Google Maps listing (it appears under the shop's earlier name, "BobbyShoes")
export const MAPS_URL = 'https://maps.app.goo.gl/bDu8Kz8tvCEpBFCS7'
