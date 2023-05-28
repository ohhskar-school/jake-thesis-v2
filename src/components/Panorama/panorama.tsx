"use client";

import PanoramaCell from "@/components/PanoramaCell";

import styles from "./panorama.module.scss";

const rows = [Array(9).fill(false), Array(9).fill(false), Array(9).fill(false)];

function Panorama() {
  return (
    <div className={styles.panorama}>
      {rows.map((column, rowIndex) => (
        <div className={styles.row}>
          {column.map((cell, columnIndex) => (
            <PanoramaCell row={rowIndex} column={columnIndex} isViewable={cell} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Panorama;
