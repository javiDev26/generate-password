import { useEffect, useMemo, useState } from "react";
import { LockKeyhole, RefreshCw, Shield } from "lucide-react";
import { Toaster, toast } from "sonner";
import { PasswordDisplay } from "@/components/PasswordDisplay";
import { PasswordOptions } from "@/components/PasswordOptions";
import { StrengthMeter } from "@/components/StrengthMeter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generatePassword, getActiveTypes } from "@/utils/passwordGenerator";
import { cn } from "@/lib/utils";

const DEFAULT_OPTIONS = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  excludeAmbiguous: true,
};

function App() {
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [password, setPassword] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const hasSelection = useMemo(() => getActiveTypes(options).length > 0, [options]);

  function handleGenerate() {
    const result = generatePassword(options);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    setIsGenerating(true);
    setPassword(result.password);
    window.setTimeout(() => setIsGenerating(false), 260);
  }

  useEffect(() => {
    const result = generatePassword(DEFAULT_OPTIONS);
    setPassword(result.password);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.28),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.2),transparent_38%),linear-gradient(135deg,rgba(15,23,42,1),rgba(2,6,23,1))]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(720px,90vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-teal-300/70 to-transparent" />

      <section className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-xl items-center">
        <Card className="w-full rounded-2xl border-white/10 bg-slate-900/58 shadow-2xl shadow-black/40 backdrop-blur-2xl">
          <CardHeader className="space-y-4 p-5 pb-4 sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-teal-300/25 bg-teal-300/10 shadow-glow">
                <LockKeyhole className="h-6 w-6 text-teal-200" />
              </div>
              <Badge
                variant="outline"
                className="border-cyan-300/30 bg-cyan-300/10 text-cyan-100"
              >
                <Shield className="mr-1 h-3.5 w-3.5" />
                SecurePass
              </Badge>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl text-slate-50 sm:text-4xl">
                SecurePass
              </CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-400">
                Genera contraseñas robustas y listas para copiar con controles claros.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 p-5 pt-0 sm:p-7 sm:pt-0">
            <div className={cn("transition duration-300", isGenerating && "scale-[1.01]")}>
              <PasswordDisplay password={password} />
            </div>

            <StrengthMeter options={options} />

            <PasswordOptions
              options={options}
              onChange={setOptions}
              hasSelection={hasSelection}
            />

            <Button
              type="button"
              size="lg"
              className="h-12 w-full text-base"
              onClick={handleGenerate}
              disabled={!hasSelection}
            >
              <RefreshCw className={cn("h-5 w-5", isGenerating && "animate-spin")} />
              Generar contraseña
            </Button>
          </CardContent>
        </Card>
      </section>

      <Toaster richColors position="top-center" theme="dark" />
    </main>
  );
}

export default App;
