import { CrossIcon } from "lucide-react";

export default function Error() {
  return (
    <div className="flex items-center gap-2">
      <CrossIcon className="h-5 w-5" />
      <span>Data can't loaded!</span>
    </div>
  );
}
