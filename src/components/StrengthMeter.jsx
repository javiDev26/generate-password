import { Activity, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { calculateStrength } from "@/utils/passwordGenerator";

export function StrengthMeter({ options }) {
  const strength = calculateStrength(options);

  return (
    <div className="space-y-3 rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
          <Activity className="h-4 w-4 text-cyan-200" />
          Fortaleza
        </div>
        <Badge variant="outline" className={strength.badgeClassName}>
          <ShieldCheck className="mr-1 h-3.5 w-3.5" />
          {strength.label}
        </Badge>
      </div>
      <Progress value={strength.value} indicatorClassName={strength.className} />
    </div>
  );
}
