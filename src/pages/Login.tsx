import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await signIn(email, password);
      navigate("/admin");
    } catch (err: any) {
      toast({
        title: "Login failed",
        description: err.message ?? "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-16 flex items-center justify-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6 p-8 border border-white/10 bg-white/5 rounded-[4px]"
      >
        <h1 className="text-2xl font-bold text-white text-center">Admin Login</h1>

        <div className="space-y-2">
          <label className="text-sm text-slate-300">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white/5 border-white/10 text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-300">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-white/5 border-white/10 text-white"
          />
        </div>

        <Button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#B4FF33] text-black hover:bg-[#B4FF33]/90 font-bold uppercase tracking-tight"
        >
          {submitting ? "Signing in…" : "Sign In"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
