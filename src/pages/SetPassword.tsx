import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const SetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Supabase processes the hash fragment automatically and fires SIGNED_IN / PASSWORD_RECOVERY
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setSessionReady(true);
        }
        if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
          setSessionReady(true);
        }
      }
    );

    // Also check if already have a session (invite link auto-signs in)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setSessionReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Paroolid ei kattu");
      return;
    }
    if (password.length < 6) {
      setError("Parool peab olema vähemalt 6 tähemärki");
      return;
    }
    setSubmitting(true);
    setError(null);

    try {
      // Update password
      const { error: pwError } = await supabase.auth.updateUser({ password });
      if (pwError) throw pwError;

      // Update profile name if provided
      if (fullName.trim()) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from("profiles").update({ full_name: fullName.trim() }).eq("id", user.id);
        }
      }

      // Sign out so user logs in fresh
      await supabase.auth.signOut();

      toast({ title: "Parool loodud!", description: "Nüüd saad sisse logida." });
      navigate("/login", { replace: true });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!sessionReady) {
    return (
      <div className="pt-24 pb-16 flex items-center justify-center min-h-[80vh]">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Linki töödeldakse…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 flex items-center justify-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6 p-8 border border-white/10 bg-white/5 rounded-[4px]"
      >
        <h1 className="text-2xl font-bold text-white text-center">Loo parool</h1>
        <p className="text-sm text-muted-foreground text-center">
          Sisesta oma nimi ja vali parool, et konto aktiveerida.
        </p>

        <div className="space-y-2">
          <label className="text-sm text-slate-300">Profiili nimi</label>
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Sinu nimi"
            className="bg-white/5 border-white/10 text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-300">Parool</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-white/5 border-white/10 text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-300">Kinnita parool</label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="bg-white/5 border-white/10 text-white"
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#B4FF33] text-black hover:bg-[#B4FF33]/90 font-bold uppercase tracking-tight"
        >
          {submitting ? "Salvestan…" : "Loo parool ja jätka"}
        </Button>
      </form>
    </div>
  );
};

export default SetPassword;
