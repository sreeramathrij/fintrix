import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
    >
      <ArrowLeft size={32} />
    
    </Button>
  );
}