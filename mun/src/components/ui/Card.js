// components/ui/Card.js
// Change from: import { cn } from "../lib/utils";
import { cn } from "../../lib/utils"; // ui → components → src → lib (up three)

export function Card({ children, className }) {
  return (
    <div className={`${"bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6"} ${className || ""}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return (
    <div className={`${"font-semibold text-lg"} ${className || ""}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }) {
  return (
    <div className={`${"text-xl font-bold"} ${className || ""}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }) {
  return (
    <div className={`${"text-base text-muted-foreground"} ${className || ""}`}>
      {children}
    </div>
  );
}