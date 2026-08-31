import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useLang } from "@/lib/i18n";
import { EASE, Star4 } from "./primitives";
import { HermesLoading } from "./FeatureOverlays";

const makeChallenge = () => {
  const left = Math.floor(Math.random() * 8) + 2;
  const right = Math.floor(Math.random() * 8) + 2;
  return { question: `${left} + ${right}`, answer: String(left + right) };
};

const validate = (form, t) => {
  const errors = {};
  if (!form.name.trim()) errors.name = t.contact.errorRequired || "REQUIRED";
  if (!form.email.trim()) {
    errors.email = t.contact.errorRequired || "REQUIRED";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = t.contact.errorEmail || "INVALID EMAIL";
  }
  if (!form.message.trim()) errors.message = t.contact.errorRequired || "REQUIRED";
  return errors;
};

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <motion.p
      id={id}
      role="alert"
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.2, ease: EASE }}
      className="font-mono-label text-[10px] font-bold text-[#FF5C5C] mt-1.5"
    >
      ↑ {message}
    </motion.p>
  );
}

export default function ContactModal({ open, onClose, estimate }) {
  const { t, lang } = useLang();
  const [form, setForm] = useState({ name: "", email: "", project_type: "", message: "", website: "" });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("idle");
  const [captcha, setCaptcha] = useState(makeChallenge);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const closeRef = useRef(null);

  const refreshCaptcha = useCallback(() => {
    setCaptcha(makeChallenge());
    setCaptchaAnswer("");
  }, []);

  useEffect(() => {
    if (!open) return;
    setStatus("idle");
    setErrors({});
    setTouched({});
    setSubmitted(false);
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    refreshCaptcha();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, refreshCaptcha]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleBlur = (key) => () => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors(validate(form, t));
  };

  // Re-validate on form change if already submitted or field touched
  useEffect(() => {
    if (submitted || Object.keys(touched).length > 0) {
      setErrors(validate(form, t));
    }
  }, [form, submitted, touched, t]);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const validationErrors = validate(form, t);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (form.website || captchaAnswer.trim() !== captcha.answer) {
      setStatus("error");
      toast.error(t.contact.captchaError);
      refreshCaptcha();
      return;
    }

    setSending(true);
    const details = [
      `${t.contact.name}: ${form.name}`,
      `${t.contact.email}: ${form.email}`,
      `${t.contact.type}: ${form.project_type || "—"}`,
      estimate ? `${t.contact.estimateNote} ${estimate}` : null,
      "",
      form.message,
    ].filter(Boolean).join("\n");

    window.location.href = `mailto:info@hermessoftware.space?subject=${encodeURIComponent(`${t.contact.title}: ${form.name}`)}&body=${encodeURIComponent(details)}`;
    setSending(false);
    setStatus("success");
    toast.success(t.contact.emailDraft);
  };

  const showError = (key) => (touched[key] || submitted) && errors[key];

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

            {status === "success" ? <div className="p-8 sm:p-12" role="status" aria-live="polite"><div className="border-[3px] border-[#111] bg-[#45B7D1] p-6"><p className="font-display text-5xl leading-none mb-5">RECEIVED.</p><p className="font-display text-3xl">WE'LL TAKE A LOOK.</p><p className="font-semibold mt-6">{t.contact.emailDraft}</p></div><button type="button" onClick={onClose} className="btn-press mt-7 bg-[#111] text-[#F5F0E8] border-[3px] border-[#111] shadow-hard font-display text-xl px-6 py-4" data-testid="contact-success-close">CLOSE →</button></div> : <form onSubmit={submit} className="p-6 space-y-4" noValidate>
              <p className="font-semibold text-sm">{t.contact.sub}</p>
              {estimate && (
                <p className="font-mono-label text-[10px] font-bold bg-[#45B7D1] border-[3px] border-[#111] inline-block px-3 py-1.5" data-testid="contact-estimate-badge">
                  {t.contact.estimateNote} {estimate}
                </p>
              )}
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

              {/* Name */}
              <div>
                <label data-testid="contact-label-name" className="font-mono-label text-[10px] font-bold block mb-1.5" htmlFor="c-name">{t.contact.name}</label>
                <input
                  id="c-name"
                  data-testid="contact-input-name"
                  className={`input-brutal ${showError("name") ? "border-[#FF5C5C]" : ""}`}
                  required
                  value={form.name}
                  onChange={set("name")}
                  onBlur={handleBlur("name")}
                  placeholder="ADA LOVELACE"
                  aria-invalid={!!showError("name")}
                  aria-describedby={showError("name") ? "err-name" : undefined}
                />
                <AnimatePresence>{showError("name") && <FieldError id="err-name" message={errors.name} />}</AnimatePresence>
              </div>

              {/* Email */}
              <div>
                <label data-testid="contact-label-email" className="font-mono-label text-[10px] font-bold block mb-1.5" htmlFor="c-email">{t.contact.email}</label>
                <input
                  id="c-email"
                  data-testid="contact-input-email"
                  className={`input-brutal ${showError("email") ? "border-[#FF5C5C]" : ""}`}
                  type="email"
                  required
                  value={form.email}
                  onChange={set("email")}
                  onBlur={handleBlur("email")}
                  placeholder="ADA@EXAMPLE.COM"
                  aria-invalid={!!showError("email")}
                  aria-describedby={showError("email") ? "err-email" : undefined}
                />
                <AnimatePresence>{showError("email") && <FieldError id="err-email" message={errors.email} />}</AnimatePresence>
              </div>

              {/* Project Type */}
              <div>
                <label data-testid="contact-label-type" className="font-mono-label text-[10px] font-bold block mb-1.5" htmlFor="c-type">{t.contact.type}</label>
                <select id="c-type" data-testid="contact-select-type" className="input-brutal" value={form.project_type} onChange={set("project_type")}>
                  <option value="">—</option>
                  {t.contact.typeOptions.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label data-testid="contact-label-message" className="font-mono-label text-[10px] font-bold block mb-1.5" htmlFor="c-msg">{t.contact.message}</label>
                <textarea
                  id="c-msg"
                  data-testid="contact-input-message"
                  className={`input-brutal min-h-[110px] ${showError("message") ? "border-[#FF5C5C]" : ""}`}
                  required
                  value={form.message}
                  onChange={set("message")}
                  onBlur={handleBlur("message")}
                  placeholder="..."
                  aria-invalid={!!showError("message")}
                  aria-describedby={showError("message") ? "err-message" : undefined}
                />
                <AnimatePresence>{showError("message") && <FieldError id="err-message" message={errors.message} />}</AnimatePresence>
              </div>

              {/* Captcha */}
              <div>
                <label data-testid="contact-label-captcha" className="font-mono-label text-[10px] font-bold block mb-1.5" htmlFor="c-captcha">{t.contact.captchaLabel}</label>
                <div className="grid grid-cols-[minmax(110px,1fr)_80px_48px] items-stretch gap-2">
                  <span
                    className="input-brutal flex w-auto items-center justify-center font-display text-lg bg-[#FFE45C] select-none"
                    style={{ width: "auto" }}
                    data-testid="contact-captcha-question"
                  >
                    {`${captcha.question} =`}
                  </span>
                  <input
                    id="c-captcha"
                    data-testid="contact-captcha-input"
                    className="input-brutal min-w-0"
                    inputMode="numeric"
                    required
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    placeholder={t.contact.captchaPlaceholder}
                  />
                  <button
                    type="button"
                    data-testid="contact-captcha-refresh"
                    onClick={refreshCaptcha}
                    aria-label={t.contact.captchaRefresh}
                    className="btn-press border-[3px] border-[#111] px-3 font-display text-lg hover:rotate-180 transition-transform duration-300"
                  >
                    ↻
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                data-testid="contact-submit"
                disabled={sending}
                className="btn-press w-full bg-[#FF5C5C] border-[3px] border-[#111] shadow-hard font-display text-xl px-6 py-4 disabled:opacity-60 disabled:pointer-events-none"
              >
                {sending ? <HermesLoading label={t.contact.sending} /> : t.contact.submit}
              </button>
            </form>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
