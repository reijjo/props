import "./PageHeader.css";
import Button from "@/components/ui/Button";

export default function PageHeader() {
  return (
    <div className="header-row">
      <h2>NBA Leaders</h2>
      <Button className="btn-pressable active" disabled>
        2025-2026
      </Button>
    </div>
  );
}
