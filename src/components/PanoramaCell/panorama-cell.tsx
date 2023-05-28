import { useState } from "react";
import cn from "classnames";

import styles from "./panorama-cell.module.scss";

interface PanoramaCellProps {
  row: number;
  column: number;
  isViewable: boolean;
}

function PanoramaCell({ row, column }: PanoramaCellProps) {
  const [isViewable, setIsViewable] = useState<boolean>(false);

  return (
    <div
      style={
        {
          "--js-row": `${(row / 2) * 100}%`,
          "--js-column": `${(column / 8) * 100}%`,
          "--js-blur": isViewable ? "0" : "10px",
        } as React.CSSProperties
      }
      className={styles.cell}
      onClick={() => setIsViewable(true)}
    >
      <div className={cn(styles.image, isViewable && styles.image___active)} />
    </div>
  );
}

export default PanoramaCell;
