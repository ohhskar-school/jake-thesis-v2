import QRCode from "react-qr-code";

import styles from "./page.module.scss";

const rows = [Array(9).fill(false), Array(9).fill(false), Array(9).fill(false)];

function QR() {
  return (
    <div className={styles.page}>
      {rows.map((column, rowIndex) => (
        <>
          {column.map((_, columnIndex) => (
            <div>
              <QRCode
                value={`JAKE:${rowIndex}-${columnIndex}`}
                key={`JAKE:${rowIndex}-${columnIndex}`}
                size={256}
                style={{ height: "auto", maxWidth: "256px", width: "100%" }}
                viewBox={`0 0 256 256`}
              />

              <br />
              <br />
              <br />
              <br />

              <p>
                JAKE:{rowIndex}-{columnIndex}
              </p>
            </div>
          ))}
        </>
      ))}
    </div>
  );
}

export default QR;
