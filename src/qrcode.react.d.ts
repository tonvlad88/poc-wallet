declare module "qrcode.react" {
  import * as React from "react";

  export interface QRCodeProps {
    value: string; // The data to encode in the QR code
    size?: number; // Size of the QR code in pixels (default: 128)
    bgColor?: string; // Background color (default: #ffffff)
    fgColor?: string; // Foreground color (default: #000000)
    level?: "L" | "M" | "Q" | "H"; // Error correction level (default: L)
    includeMargin?: boolean; // Whether to include a margin (default: false)
  }

  const QRCode: React.FC<QRCodeProps>;
  export default QRCode;
}
