import { useRef, useEffect } from "react";
import cn from "classnames";

import styles from "./panorama-cell.module.scss";

interface PanoramaCellProps {
  row: number;
  column: number;
  isViewable: number;
}

function PanoramaCell({ row, column, isViewable }: PanoramaCellProps) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isViewable === 0) {
      return;
    }

    if (!divRef.current) {
      return;
    }

    divRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }, [isViewable]);

  return (
    <div
      style={
        {
          "--js-row": `${(row / 2) * 100}%`,
          "--js-column": `${(column / 8) * 100}%`,
        } as React.CSSProperties
      }
      className={styles.cell}
      ref={divRef}
    >
      <div className={cn(styles.image, isViewable && styles.image___active)} />
    </div>
  );
}

export default PanoramaCell;
