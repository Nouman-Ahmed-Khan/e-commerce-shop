import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import {
  MessageCircle, Phone, Mail, MapPin, ArrowUpRight,
  LoaderCircle, CircleCheck, CircleAlert,
} from 'lucide-react'
import {
  WHATSAPP_DISPLAY, WHATSAPP_MESSAGES, whatsappLink,
  PHONES, EMAIL, SHOP_ADDRESS, MAPS_URL,
} from '../data/contact'

/* EmailJS settings. These are public, front-end-safe values (the public key is designed to be
   exposed). They come from Vite env vars — see .env.local. Never put private keys or passwords here. */
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID

const ENQUIRY_TYPES = ['General Enquiry', 'Custom Order', 'Product Question', 'Other']

// `website` is the honeypot: hidden from people, but bots tend to fill it in.
const EMPTY = { name: '', email: '', phone: '', subject: '', message: '', website: '' }
const FIELD_ORDER = ['name', 'email', 'phone', 'subject', 'message']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const validate = (v) => {
  const e = {}
  if (!v.name.trim()) e.name = 'Please enter your full name.'
  if (!v.email.trim()) e.email = 'Please enter your email address.'
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email address.'
  const digits = v.phone.replace(/\D/g, '')
  if (v.phone.trim() && (digits.length < 7 || digits.length > 15)) {
    e.phone = 'Please enter a valid phone number, or leave it blank.'
  }
  if (!v.subject) e.subject = 'Please choose an enquiry type.'
  if (!v.message.trim()) e.message = 'Please write a message.'
  return e
}

/* ── Styling helpers (theme-aware via the existing semantic tokens) ── */
const errorText = 'text-red-700 [[data-theme=dark]_&]:text-red-400'

const inputCls = (hasError) =>
  `w-full bg-page-bg text-page-text font-sans text-[0.85rem] tracking-[0.02em]
   px-4 py-3.5 border transition-colors duration-200 placeholder:text-body-text/50
   focus:outline-none focus:border-gold focus-visible:ring-1 focus-visible:ring-gold
   ${hasError ? 'border-red-600 [[data-theme=dark]_&]:border-red-400' : 'border-gold/30'}`

const linkCls =
  `relative inline-flex items-center gap-2 font-sans text-page-text
   after:content-[''] after:absolute after:inset-x-0 after:-inset-y-3
   border-b border-gold/40 pb-[2px] transition-colors duration-300
   hover:text-accent-warm hover:border-accent-warm
   focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4`
const linkSmallCaps = `${linkCls} text-[0.72rem] tracking-[0.14em] uppercase`   // phone numbers, map links
const linkEmail     = `${linkCls} text-[0.85rem] tracking-[0.04em] break-all`   // keeps the address's real case

const Label = ({ children }) => (
  <h2 className="flex items-center gap-2 font-sans text-[0.58rem] tracking-[0.35em] text-accent-warm uppercase mb-4">
    {children}
  </h2>
)

const Field = ({ id, label, required, error, children }) => (
  <div>
    <label htmlFor={id} className="block font-sans text-[0.62rem] tracking-[0.2em] uppercase text-page-text mb-2">
      {label}
      {required
        ? <span aria-hidden="true" className="text-accent-warm"> *</span>
        : <span className="text-body-text normal-case tracking-normal"> (optional)</span>}
    </label>
    {children}
    {error && <p id={`${id}-error`} className={`mt-2 font-sans text-[0.72rem] leading-snug ${errorText}`}>{error}</p>}
  </div>
)

const Contact = () => {
  const [values, setValues]   = useState(EMPTY)
  const [errors, setErrors]   = useState({})
  const [status, setStatus]   = useState('idle')   // idle | sending | success | error
  const statusRef  = useRef(null)
  const sendingRef = useRef(false)                  // hard guard: state updates are async, a ref is not

  // Opening this page from the footer must start at the top, not at the old scroll position.
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])

  // Move focus to the result message so keyboard / screen-reader users notice it.
  useEffect(() => {
    if (status === 'success' || status === 'error') statusRef.current?.focus()
  }, [status])

  const setField = (name) => (e) => {
    const value = e.target.value
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
    if (status === 'success' || status === 'error') setStatus('idle')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (sendingRef.current) return                  // already sending — ignore duplicate submits

    // Honeypot: people never see this field. Quietly drop bot submissions — nothing is sent
    // and no success message is shown.
    if (values.website) return

    const found = validate(values)
    setErrors(found)
    const firstInvalid = FIELD_ORDER.find((k) => found[k])
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus()
      return
    }

    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      console.error('EmailJS is not configured. Set VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_SERVICE_ID and VITE_EMAILJS_TEMPLATE_ID.')
      setStatus('error')
      return
    }

    sendingRef.current = true
    setStatus('sending')
    const email = values.email.trim()

    try {
      const res = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  values.name.trim(),
          from_email: email,
          phone:      values.phone.trim() || 'Not provided',
          subject:    values.subject,
          message:    values.message.trim(),
          reply_to:   email,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      )
      if (res.status !== 200) throw res             // only a confirmed 200 counts as sent
      setValues(EMPTY)
      setErrors({})
      setStatus('success')
    } catch (err) {
      console.error('EmailJS send failed:', err)
      setStatus('error')
    } finally {
      sendingRef.current = false
    }
  }

  const sending = status === 'sending'

  return (
    <main className="min-h-screen bg-page-bg pt-20 transition-colors duration-300">

      {/* ── A. Introduction ── */}
      <section className="px-6 sm:px-10 pt-16 pb-14 lg:pt-20 lg:pb-16 text-center border-b border-gold/[0.12]
        bg-gradient-to-br from-page-bg to-page-gradient-end">
        <span className="font-sans text-[0.6rem] tracking-[0.38em] text-accent-warm uppercase block mb-4">
          Contact
        </span>
        <h1 className="font-serif font-light text-page-text mb-5" style={{ fontSize: 'clamp(2.6rem,5vw,4.5rem)' }}>
          Get in Touch
        </h1>
        <p className="font-sans text-[0.875rem] leading-[1.95] tracking-[0.04em] text-body-text max-w-[560px] mx-auto">
          Have a question, need assistance, or want to discuss something special? We're here to help.
          Reach out to our team and we'll be happy to assist you.
        </p>
      </section>

      <section className="px-6 sm:px-10 py-14 lg:py-20">
        <div className="max-w-[1200px] mx-auto grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

          {/* ── B / C / D. Contact details ── */}
          <div className="flex flex-col gap-10">

            <div className="border-t border-gold/25 pt-6">
              <Label><MessageCircle size={14} strokeWidth={1.5} aria-hidden="true" /> WhatsApp</Label>
              <p className="font-serif font-light text-[1.9rem] leading-none text-page-text mb-3">{WHATSAPP_DISPLAY}</p>
              <p className="font-sans text-[0.8rem] leading-[1.8] tracking-[0.03em] text-body-text mb-6 max-w-[420px]">
                Our primary line for customer enquiries and custom orders.
              </p>
              <a
                href={whatsappLink(WHATSAPP_MESSAGES.custom)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gold text-black font-sans text-[0.65rem]
                  tracking-[0.22em] uppercase px-7 py-4 transition-colors duration-300 hover:bg-gold-light
                  focus-visible:outline-2 focus-visible:outline-page-text focus-visible:outline-offset-4"
              >
                <MessageCircle size={16} strokeWidth={1.5} aria-hidden="true" />
                Message on WhatsApp
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>

            <div className="border-t border-gold/25 pt-6">
              <Label><Phone size={14} strokeWidth={1.5} aria-hidden="true" /> Call Us</Label>
              <ul className="flex flex-col gap-6 list-none p-0 m-0">
                {PHONES.map((p) => (
                  <li key={p.tel}>
                    <a href={`tel:${p.tel}`} className={linkSmallCaps}>{p.display}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gold/25 pt-6">
              <Label><Mail size={14} strokeWidth={1.5} aria-hidden="true" /> Email</Label>
              <a href={`mailto:${EMAIL}`} className={linkEmail}>
                {EMAIL}
              </a>
            </div>

            <div className="border-t border-gold/25 pt-6">
              <Label><MapPin size={14} strokeWidth={1.5} aria-hidden="true" /> Visit Our Shop</Label>
              <address className="not-italic font-sans text-[0.85rem] leading-[1.9] tracking-[0.03em] text-body-text mb-5 max-w-[420px]">
                {SHOP_ADDRESS}
              </address>
              <div className="flex flex-wrap gap-x-8 gap-y-6">
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={linkSmallCaps}>
                  Get Directions <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden="true" />
                  <span className="sr-only">(opens Google Maps in a new tab)</span>
                </a>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={linkSmallCaps}>
                  View Google Reviews <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden="true" />
                  <span className="sr-only">(opens Google Maps in a new tab)</span>
                </a>
              </div>
              <p className="mt-4 font-sans text-[0.7rem] leading-relaxed tracking-[0.03em] text-body-text">
                Google lists our shop under its earlier name, BobbyShoes.
              </p>
            </div>

          </div>

          {/* ── Contact form ── */}
          <form
            noValidate
            onSubmit={handleSubmit}
            aria-labelledby="contact-form-title"
            className="relative bg-panel-bg border border-gold/15 p-6 sm:p-10 flex flex-col gap-6
              transition-colors duration-300"
          >
            <div>
              <h2 id="contact-form-title" className="font-serif font-light text-[1.7rem] text-page-text mb-2">
                Send Us a Message
              </h2>
              <p className="font-sans text-[0.78rem] leading-[1.8] tracking-[0.03em] text-body-text">
                Fields marked <span aria-hidden="true" className="text-accent-warm">*</span>
                <span className="sr-only">with an asterisk</span> are required.
              </p>
            </div>

            <Field id="contact-name" label="Full Name" required error={errors.name}>
              <input
                id="contact-name" name="name" type="text" autoComplete="name" maxLength={100}
                value={values.name} onChange={setField('name')}
                aria-required="true" aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                className={inputCls(errors.name)}
              />
            </Field>

            <Field id="contact-email" label="Email Address" required error={errors.email}>
              <input
                id="contact-email" name="email" type="email" autoComplete="email" maxLength={254}
                value={values.email} onChange={setField('email')}
                aria-required="true" aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                className={inputCls(errors.email)}
              />
            </Field>

            <Field id="contact-phone" label="Phone Number" error={errors.phone}>
              <input
                id="contact-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={30}
                value={values.phone} onChange={setField('phone')}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                className={inputCls(errors.phone)}
              />
            </Field>

            <Field id="contact-subject" label="Subject / Enquiry Type" required error={errors.subject}>
              <select
                id="contact-subject" name="subject"
                value={values.subject} onChange={setField('subject')}
                aria-required="true" aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                className={inputCls(errors.subject)}
              >
                <option value="">Select an enquiry type</option>
                {ENQUIRY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>

            <Field id="contact-message" label="Message" required error={errors.message}>
              <textarea
                id="contact-message" name="message" rows={6} maxLength={2000}
                value={values.message} onChange={setField('message')}
                aria-required="true" aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                className={`${inputCls(errors.message)} resize-y min-h-[8rem]`}
              />
            </Field>

            {/* Honeypot — invisible to people; see handleSubmit */}
            <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
              <label>
                Website
                <input type="text" name="website" tabIndex={-1} autoComplete="off"
                  value={values.website} onChange={setField('website')} />
              </label>
            </div>

            <button
              type="submit"
              disabled={sending}
              aria-busy={sending}
              className="w-full inline-flex items-center justify-center gap-3 bg-page-text text-page-bg
                font-sans text-[0.68rem] tracking-[0.22em] uppercase py-4 transition-all duration-300
                hover:bg-gold hover:text-black
                disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-page-text disabled:hover:text-page-bg
                focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4"
            >
              {sending
                ? <><LoaderCircle size={14} className="animate-spin" aria-hidden="true" /> Sending…</>
                : 'Send Message'}
            </button>

            {status === 'success' && (
              <div
                ref={statusRef} tabIndex={-1} role="status"
                className="flex items-start gap-3 border border-green-700/40 bg-green-700/10 px-4 py-4 outline-none
                  text-green-800 [[data-theme=dark]_&]:text-green-400"
              >
                <CircleCheck size={18} strokeWidth={1.5} className="mt-[2px] shrink-0" aria-hidden="true" />
                <p className="font-sans text-[0.8rem] leading-[1.7] tracking-[0.02em]">
                  Thank you — your message has been sent. We'll get back to you as soon as we can.
                </p>
              </div>
            )}

            {status === 'error' && (
              <div
                ref={statusRef} tabIndex={-1} role="alert"
                className={`flex items-start gap-3 border border-red-600/40 bg-red-600/10 px-4 py-4 outline-none ${errorText}`}
              >
                <CircleAlert size={18} strokeWidth={1.5} className="mt-[2px] shrink-0" aria-hidden="true" />
                <p className="font-sans text-[0.8rem] leading-[1.7] tracking-[0.02em]">
                  We couldn't send your message. Please try again, or reach us on{' '}
                  <a href={whatsappLink(WHATSAPP_MESSAGES.custom)} target="_blank" rel="noopener noreferrer" className="underline">WhatsApp</a>
                  {' '}or at{' '}
                  <a href={`mailto:${EMAIL}`} className="underline break-all">{EMAIL}</a>.
                </p>
              </div>
            )}
          </form>

        </div>
      </section>
    </main>
  )
}

export default Contact
