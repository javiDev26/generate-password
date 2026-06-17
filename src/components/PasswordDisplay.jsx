import { Check, Copy, KeyRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function PasswordDisplay({ password }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!password) {
      toast.error("Genera una contraseña primero");
      return;
    }

    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      toast.success("Contraseña copiada");
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      toast.error("No se pudo copiar la contraseña");
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
        <KeyRound className="h-4 w-4 text-teal-300" />
        Contraseña generada
      </div>
      <div className="flex gap-2">
        <Input
          readOnly
          value={password}
          placeholder="Tu contraseña segura aparecerá aquí"
          className={cn(
            "h-12 border-white/10 bg-slate-950/60 font-mono text-base text-teal-100 shadow-inner shadow-black/20 placeholder:text-slate-500 sm:text-lg",
            copied && "ring-2 ring-teal-300",
          )}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={handleCopy}
                className="h-12 w-12 shrink-0 border-white/10 bg-white/5 hover:bg-white/10"
                aria-label="Copiar contraseña"
              >
                {copied ? <Check className="text-teal-300" /> : <Copy />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copiar contraseña</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
