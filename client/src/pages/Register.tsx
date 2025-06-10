import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "react-hot-toast";
import { Loader2, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const { isSigningUp, register } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = (): boolean => {
    if (!form.name.trim()) {
      toast.error("Full name is required!");
      return false;
    }
    if (!form.email.trim()) {
      toast.error("Email is required!");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      toast.error("Invalid Email Format!");
      return false;
    }

    if (!form.password) {
      toast.error("Password is required!");
      return false;
    }

    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) register(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="w-full max-w-md bg-white dark:bg-muted shadow-xl rounded-2xl p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Create an Account</h2>
          <ThemeToggle />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-[38px] text-muted-foreground"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button type="submit" className="w-full" disabled={isSigningUp}>
            {isSigningUp ? (
              <>
                <Loader2 className="size-5 animate-spin mr-2" />
                Loading...
              </>
            ) : (
              "Register"
            )}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground text-center">
          Already have an account? <a href="/login" className="underline">Sign in</a>
        </p>
      </div>
    </div>
  );
}
