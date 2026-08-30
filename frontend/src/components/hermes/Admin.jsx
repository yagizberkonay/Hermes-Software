import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Star4, RegMark } from "./primitives";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const KEY = "hermes_admin_pw";

const fmtDate = (iso) => {
  try {
    return new Date(iso).toLocaleString("en-GB", {
      day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
  } catch {
    return iso;
  }
};

const InquiryCard = ({ q, index }) => (
  <article
    data-testid={`admin-inquiry-${index}`}
    className="border-[3px] border-[#111] bg-[#F5F0E8] shadow-hard-sm p-6 sm:p-8"
  >
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-4 pb-4 border-b-[3px] border-[#111]">
      <h3 className="font-display text-2xl sm:text-3xl">{q.name}</h3>
      <a href={`mailto:${q.email}`} className="link-underline font-mono-label text-xs font-bold">{q.email}</a>
      <span className="font-mono-label text-[10px] font-semibold text-[#111]/50 ml-auto">{fmtDate(q.created_at)}</span>
    </div>
    <div className="flex flex-wrap gap-2 mb-4">
      {q.project_type && (
        <span className="font-mono-label text-[10px] font-bold border-[3px] border-[#111] bg-[#45B7D1] px-3 py-1.5">{q.project_type}</span>
      )}
      {q.estimate && (
        <span className="font-mono-label text-[10px] font-bold border-[3px] border-[#111] bg-[#FFE45C] px-3 py-1.5">EST. {q.estimate}</span>
      )}
      <span className="font-mono-label text-[10px] font-bold border-[3px] border-[#111] px-3 py-1.5">{(q.lang || "en").toUpperCase()}</span>
    </div>
    <p className="text-sm sm:text-base font-semibold leading-relaxed whitespace-pre-wrap">{q.message}</p>
  </article>
);

const Gate = ({ onAuthed }) => {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      await axios.post(`${API}/admin/verify`, {}, { headers: { "X-Admin-Password": pw } });
      sessionStorage.setItem(KEY, pw);
      onAuthed(pw);
    } catch {
      setErr("WRONG PASSWORD. TRY AGAIN.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-[#F5F0E8] border-[4px] border-[#111] shadow-hard-lg"
        data-testid="admin-gate-form"
      >
        <div className="flex items-center gap-3 border-b-[4px] border-[#111] bg-[#FFE45C] px-6 py-4">
          <Star4 size={22} />
          <h1 className="font-display text-2xl">INQUIRY INBOX</h1>
        </div>
        <div className="p-6 space-y-4">
          <p className="font-semibold text-sm">Private area. Enter the studio password to continue.</p>
          <input
            data-testid="admin-password-input"
            type="password"
            className="input-brutal"
            placeholder="PASSWORD"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            autoFocus
            required
          />
          {err && <p className="font-mono-label text-[10px] font-bold text-[#FF5C5C]" data-testid="admin-error">{err}</p>}
          <button
            type="submit"
            data-testid="admin-login-btn"
            disabled={busy}
            className="btn-press w-full bg-[#111] text-[#F5F0E8] border-[3px] border-[#111] shadow-hard font-display text-xl px-6 py-4 disabled:opacity-60"
          >
            {busy ? "CHECKING..." : "UNLOCK →"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default function Admin() {
  const [pw, setPw] = useState(() => sessionStorage.getItem(KEY) || "");
  const [inquiries, setInquiries] = useState(null);
  const [error, setError] = useState("");

  const load = useCallback(async (password) => {
    try {
      const { data } = await axios.get(`${API}/inquiries`, { headers: { "X-Admin-Password": password } });
      setInquiries(data);
      setError("");
    } catch {
      sessionStorage.removeItem(KEY);
      setPw("");
      setError("Session expired. Please sign in again.");
    }
  }, []);

  useEffect(() => {
    if (pw) load(pw);
  }, [pw, load]);

  const logout = () => {
    sessionStorage.removeItem(KEY);
    setPw("");
    setInquiries(null);
  };

  if (!pw) return <Gate onAuthed={(p) => setPw(p)} />;

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#111]">
      <header className="sticky top-0 z-40 bg-[#F5F0E8] border-b-[3px] border-[#111]">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-10 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Star4 size={20} />
            <span className="font-display text-lg sm:text-xl">INQUIRY INBOX</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="font-mono-label text-xs font-bold link-underline hidden sm:inline" data-testid="admin-back-site">← SITE</a>
            <button
              data-testid="admin-logout-btn"
              onClick={logout}
              className="btn-press bg-[#FF5C5C] border-[3px] border-[#111] shadow-hard-sm font-mono-label text-xs font-bold px-4 py-2"
            >
              LOG OUT
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-5 sm:px-10 py-14 sm:py-20">
        <div className="flex items-end justify-between gap-4 mb-12 sm:mb-16">
          <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.9]">
            EVERY<br />INQUIRY
          </h2>
          <div className="text-right">
            <div className="font-display text-4xl sm:text-6xl" data-testid="admin-inquiry-count">
              {inquiries ? inquiries.length : "—"}
            </div>
            <div className="font-mono-label text-[10px] font-semibold text-[#111]/50">TOTAL LEADS</div>
          </div>
        </div>

        {error && <p className="font-mono-label text-xs font-bold text-[#FF5C5C] mb-6">{error}</p>}

        {inquiries === null ? (
          <p className="font-mono-label text-xs font-semibold" data-testid="admin-loading">LOADING...</p>
        ) : inquiries.length === 0 ? (
          <div className="border-[3px] border-dashed border-[#111] p-16 text-center" data-testid="admin-empty">
            <RegMark size={44} className="mx-auto opacity-30 mb-4" />
            <p className="font-display text-2xl">NO INQUIRIES YET.</p>
            <p className="font-mono-label text-[11px] font-semibold text-[#111]/50 mt-2">New leads land here the moment they hit send.</p>
          </div>
        ) : (
          <div className="space-y-8" data-testid="admin-inquiry-list">
            {inquiries.map((q, i) => (
              <InquiryCard key={q.id || i} q={q} index={i} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
