import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { useLang } from "@/lib/i18n";
import { EASE, Star4 } from "./primitives";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ContactModal({ open, onClose, estimate }) {
  const { t, lang } = useLang();
  const [form, setForm] = useState({ name: "", email: "", project_type: "", message: "", website: "" });
  const [sending, setSending] = useState(false);
  const [captcha, setCaptcha] = useState(null);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const closeRef = useRef(null);

  const fetchCaptcha = async () => {
    setCaptcha(null);
    setCaptchaAnswer("");
    try {
      const { data } = await axios.get(`${API}/captcha`);
      setCaptcha(data);
    } catch {
      setCaptcha(null);
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // move focus into the dialog on open
    closeRef.current?.focus();
    fetchCaptcha();
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onClose]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await axios.post(`${API}/inquiries`, {
        ...form,
        estimate: estimate || null,
        lang,
        captcha_id: captcha?.id,
        captcha_answer: captchaAnswer,
      });
      toast.success(t.contact.success);
      setForm({ name: "", email: "", project_type: "", message: "", website: "" });
      onClose();
    } catch (err) {
      if (err?.response?.status === 400) {
        toast.error(t.contact.captchaError);
        fetchCaptcha();
      } else {
        toast.error(t.contact.error);
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-[#111]/70 flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={t.contact.title}
        >
          <motion.div
            initial={{ y: 80, rotate: -1.5 }}
            animate={{ y: 0, rotate: 0 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="bg-[#F5F0E8] border-[4px] border-[#111] shadow-hard-lg w-full max-w-lg my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b-[4px] border-[#111] bg-[#FFE45C] px-6 py-4">
              <div className="flex items-center gap-3">
                <Star4 size={22} />
                <h2 className="font-display text-2xl">{t.contact.title}</h2>
              </div>
              <button
                data-testid="contact-modal-close"
                ref={closeRef}
                onClick={onClose}
                aria-label="Close"
                className="font-display text-3xl leading-none hover:rotate-90 transition-transform duration-200"
              >
                ×
              </button>
            </div>

            <form onSubmit={submit} className="p-6 space-y-4">
              <p className="font-semibold text-sm">{t.contact.sub}</p>
              {estimate && (
                <p className="font-mono-label text-[10px] font-bold bg-[#45B7D1] border-[3px] border-[#111] inline-block px-3 py-1.5" data-testid="contact-estimate-badge">
                  {t.contact.estimateNote} {estimate}
                </p>
              )}
              {/* Honeypot — hidden from real users, bots tend to fill every field */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={form.website}
                onChange={set("website")}
                className="absolute -left-[9999px] w-px h-px opacity-0"
                data-testid="contact-honeypot"
              />
              <div>
                <label className="font-mono-label text-[10px] font-bold block mb-1.5" htmlFor="c-name">{t.contact.name}</label>
                <input id="c-name" data-testid="contact-input-name" className="input-brutal" required value={form.name} onChange={set("name")} placeholder="ADA LOVELACE" />
              </div>
              <div>
                <label className="font-mono-label text-[10px] font-bold block mb-1.5" htmlFor="c-email">{t.contact.email}</label>
                <input id="c-email" data-testid="contact-input-email" className="input-brutal" type="email" required value={form.email} onChange={set("email")} placeholder="ADA@EXAMPLE.COM" />
              </div>
              <div>
                <label className="font-mono-label text-[10px] font-bold block mb-1.5" htmlFor="c-type">{t.contact.type}</label>
                <select id="c-type" data-testid="contact-select-type" className="input-brutal" value={form.project_type} onChange={set("project_type")}>
                  <option value="">—</option>
                  {t.contact.typeOptions.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-mono-label text-[10px] font-bold block mb-1.5" htmlFor="c-msg">{t.contact.message}</label>
                <textarea id="c-msg" data-testid="contact-input-message" className="input-brutal min-h-[110px]" required value={form.message} onChange={set("message")} placeholder="..." />
              </div>
              <div>
                <label className="font-mono-label text-[10px] font-bold block mb-1.5" htmlFor="c-captcha">{t.contact.captchaLabel}</label>
                <div className="flex items-stretch gap-2">
                  <span
                    className="input-brutal flex items-center justify-center font-display text-lg min-w-[110px] bg-[#FFE45C] select-none"
                    data-testid="contact-captcha-question"
                  >
                    {captcha ? `${captcha.question} =` : t.contact.captchaLoading}
                  </span>
                  <input
                    id="c-captcha"
                    data-testid="contact-captcha-input"
                    className="input-brutal flex-1"
                    inputMode="numeric"
                    required
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    placeholder={t.contact.captchaPlaceholder}
                  />
                  <button
                    type="button"
                    data-testid="contact-captcha-refresh"
                    onClick={fetchCaptcha}
                    aria-label={t.contact.captchaRefresh}
                    className="btn-press border-[3px] border-[#111] px-3 font-display text-lg hover:rotate-180 transition-transform duration-300"
                  >
                    ↻
                  </button>
                </div>
              </div>
              <button
                type="submit"
                data-testid="contact-submit"
                disabled={sending}
                className="btn-press w-full bg-[#FF5C5C] border-[3px] border-[#111] shadow-hard font-display text-xl px-6 py-4 disabled:opacity-60"
              >
                {sending ? t.contact.sending : t.contact.submit}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
