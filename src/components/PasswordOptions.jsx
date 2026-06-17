import { Braces, Hash, LetterText, ShieldOff, Type } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const CHARACTER_OPTIONS = [
  {
    id: "uppercase",
    label: "Mayúsculas",
    icon: Type,
  },
  {
    id: "lowercase",
    label: "Minúsculas",
    icon: LetterText,
  },
  {
    id: "numbers",
    label: "Números",
    icon: Hash,
  },
  {
    id: "symbols",
    label: "Símbolos",
    icon: Braces,
  },
];

export function PasswordOptions({ options, onChange, hasSelection }) {
  function updateOption(key, value) {
    onChange({
      ...options,
      [key]: value,
    });
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="password-length" className="text-sm font-medium text-slate-200">
            Longitud
          </label>
          <span className="rounded-full border border-teal-300/30 bg-teal-300/10 px-3 py-1 font-mono text-sm text-teal-100">
            {options.length}
          </span>
        </div>
        <Slider
          id="password-length"
          value={[options.length]}
          min={6}
          max={32}
          step={1}
          onValueChange={([value]) => updateOption("length", value)}
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>6</span>
          <span>32</span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {CHARACTER_OPTIONS.map(({ id, label, icon: Icon }) => (
          <label
            key={id}
            htmlFor={id}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3 transition hover:border-teal-300/40 hover:bg-white/[0.07]",
              options[id] && "border-teal-300/40 bg-teal-300/10",
            )}
          >
            <Checkbox
              id={id}
              checked={options[id]}
              onCheckedChange={(checked) => updateOption(id, Boolean(checked))}
            />
            <Icon className="h-4 w-4 text-teal-200" />
            <span className="text-sm text-slate-200">{label}</span>
          </label>
        ))}
      </div>

      {!hasSelection && (
        <p className="rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-100">
          Selecciona al menos un tipo de carácter para generar una contraseña.
        </p>
      )}

      <div className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-slate-950/35 p-3">
        <div className="flex items-center gap-3">
          <ShieldOff className="h-4 w-4 text-cyan-200" />
          <div>
            <label
              htmlFor="exclude-ambiguous"
              className="cursor-pointer text-sm font-medium text-slate-200"
            >
              Excluir ambiguos
            </label>
            <p className="text-xs text-slate-500">O, 0, l, 1, I</p>
          </div>
        </div>
        <Switch
          id="exclude-ambiguous"
          checked={options.excludeAmbiguous}
          onCheckedChange={(checked) => updateOption("excludeAmbiguous", checked)}
        />
      </div>
    </div>
  );
}
