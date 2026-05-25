import { useEffect, useState } from "react";
import SEO from "@/components/SEO";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/handle-email-unsubscribe`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type State = "loading" | "valid" | "invalid" | "already" | "submitting" | "success" | "error";

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    if (!token) {
      setState("invalid");
      return;
    }
    fetch(`${FUNCTION_URL}?token=${encodeURIComponent(token)}`, {
      headers: { apikey: ANON_KEY },
    })
      .then((r) => r.json())
      .then((d) => {
        if (d?.valid) setState("valid");
        else if (d?.reason === "already_unsubscribed") setState("already");
        else setState("invalid");
      })
      .catch(() => setState("error"));
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setState("submitting");
    try {
      const res = await fetch(FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: ANON_KEY },
        body: JSON.stringify({ token }),
      });
      const d = await res.json();
      if (d?.success) setState("success");
      else if (d?.reason === "already_unsubscribed") setState("already");
      else setState("error");
    } catch {
      setState("error");
    }
  };

  return (
    <main className="min-h-[100dvh] flex items-center justify-center bg-[#050505] text-white px-6 py-24">
      <SEO title="Unsubscribe — 1ROLLO" description="Unsubscribe from emails." path="/unsubscribe" noindex />
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Unsubscribe</h1>

        {state === "loading" && <p className="text-white/70">Verifying your link…</p>}

        {state === "valid" && (
          <>
            <p className="text-white/70">
              Click below to confirm you want to unsubscribe from 1ROLLO emails.
            </p>
            <Button onClick={confirm} className="bg-[#BEFF4B] text-black hover:bg-[#BEFF4B]/90">
              Confirm unsubscribe
            </Button>
          </>
        )}

        {state === "submitting" && <p className="text-white/70">Processing…</p>}

        {state === "success" && (
          <p className="text-[#BEFF4B]">You've been unsubscribed. Sorry to see you go.</p>
        )}

        {state === "already" && (
          <p className="text-white/70">This email is already unsubscribed.</p>
        )}

        {state === "invalid" && (
          <p className="text-red-400">This unsubscribe link is invalid or has expired.</p>
        )}

        {state === "error" && (
          <p className="text-red-400">Something went wrong. Please try again later.</p>
        )}

        <div className="pt-6">
          <Link to="/" className="text-white/60 hover:text-white text-sm underline">
            Back to 1ROLLO
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Unsubscribe;
