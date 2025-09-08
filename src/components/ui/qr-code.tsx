import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Button } from "./button";
import { Download, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
  showActions?: boolean;
}

export const QRCodeComponent = ({ 
  value, 
  size = 200, 
  className,
  showActions = true 
}: QRCodeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (canvasRef.current && value) {
      QRCode.toCanvas(canvasRef.current, value, {
        width: size,
        margin: 2,
        color: {
          dark: '#1e293b',
          light: '#ffffff'
        }
      });
    }
  }, [value, size]);

  const downloadQR = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = canvasRef.current.toDataURL();
      link.click();
      toast.success("QR Code downloaded!");
    }
  };

  const copyQR = async () => {
    if (canvasRef.current) {
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          toast.success("QR Code copied to clipboard!");
        }
      });
    }
  };

  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      <div className="p-4 bg-white rounded-xl shadow-card">
        <canvas ref={canvasRef} className="rounded-lg" />
      </div>
      
      {showActions && (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={downloadQR}
            className="h-8 px-3"
          >
            <Download className="w-3 h-3 mr-1" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={copyQR}
            className="h-8 px-3"
          >
            {copied ? (
              <Check className="w-3 h-3 mr-1 text-success" />
            ) : (
              <Copy className="w-3 h-3 mr-1" />
            )}
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
      )}
    </div>
  );
};