import { CrossIcon } from "lucide-react";

export default function Error({ message }: { message?: string }) {
  return (
    <div className="flex items-center gap-2">
      <CrossIcon className="h-5 w-5" />
      <span>{message || "Data can't loaded!"}</span>
    </div>
  );
}
