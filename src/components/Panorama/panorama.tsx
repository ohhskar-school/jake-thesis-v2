"use client";

import { useState } from "react";

import PanoramaCell from "@/components/PanoramaCell";
import PanoramaScan from "@/components/PanoramaScan";

import styles from "./panorama.module.scss";

const rows = [Array(9).fill(0), Array(9).fill(0), Array(9).fill(0)];

function Panorama() {
  const [cellStates, setCellStates] = useState<number[][]>(rows);

  const setCellAsViewed = (row: number, column: number) => {
    const newCellStates = structuredClone(cellStates);
    newCellStates[row][column] += 1;

    setCellStates(newCellStates);
  };

  return (
    <>
      <div className={styles.panorama}>
        {cellStates.map((column, rowIndex) => (
          <div className={styles.row}>
            {column.map((cell, columnIndex) => (
              <PanoramaCell row={rowIndex} column={columnIndex} isViewable={cell} />
            ))}
          </div>
        ))}
      </div>
      <PanoramaScan setCellAsViewed={setCellAsViewed} />
    </>
  );
}

export default Panorama;
