import { useState, useEffect } from "react";

import { QrScanner } from "@yudiel/react-qr-scanner";
import { Portal } from "react-portal";

import styles from "./panorama-scan.module.scss";
import type { QrScannerProps } from "@yudiel/react-qr-scanner";

function parseQRCode(input: string): [number, number] {
  const firstSplit = input.split(":");

  if (firstSplit?.[0] !== "JAKE" || firstSplit.length !== 2) {
    throw new Error(`error: invalid qr scanned: ${input}. not jake-boiwa syntax.`);
  }

  const secondSplit = firstSplit[1].split("-").map((val) => Number(val));

  if (secondSplit.length !== 2) {
    throw new Error(`error: invalid qr scanned: ${input}. too many row-column pair.`);
  }

  if (secondSplit[0] > 2 || secondSplit[0] < 0 || secondSplit[1] > 9 || secondSplit[1] < 0) {
    throw new Error(`error: invalid qr scanned: ${input}. row or column out of range.`);
  }

  return secondSplit as [number, number];
}

interface PanoramaScanProps {
  setCellAsViewed: (row: number, column: number) => void;
}

function PanoramaScan({ setCellAsViewed }: PanoramaScanProps) {
  const [showScanner, setShowScanner] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [prevResult, setPrevResult] = useState<string>("");

  const onDecode: QrScannerProps["onDecode"] = (result) => {
    // Prevent multiple scans of the same QR;
    if (prevResult === result) {
      return;
    }

    setPrevResult(result);
    setError(null);

    console.log("result", result);

    try {
      const [row, column] = parseQRCode(result);
      console.log("row,column", row, column);

      setCellAsViewed(row, column);
      setShowScanner(false);
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }

      setError(error.message);
    }
  };

  return (
    <>
      <button onClick={() => setShowScanner(true)} className={styles.button}>
        Scan
      </button>

      {showScanner && (
        <Portal>
          <div className={styles.portal}>
            <div className={styles.backdrop} onClick={() => setShowScanner(false)} />
            <div className={styles.scanner}>
              <QrScanner onDecode={onDecode} onError={(error) => console.log(error?.message)} />
              {error && <p className={styles.p}>{error}</p>}
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}

export default PanoramaScan;
