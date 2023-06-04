import { useState } from "react";

import { QrScanner } from "@yudiel/react-qr-scanner";
import { Portal } from "react-portal";

import styles from "./panorama-scan.module.scss";

function PanoramaScan() {
  const [showScanner, setShowScanner] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setShowScanner((prev) => !prev)} className={styles.button}>
        Scan
      </button>

      {showScanner && (
        <Portal>
          <div className={styles.portal}>
            <div className={styles.backdrop} />
            <div className={styles.scanner}>
              <QrScanner onDecode={(result) => console.log(result)} onError={(error) => console.log(error?.message)} />
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}

export default PanoramaScan;
