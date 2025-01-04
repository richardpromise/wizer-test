import { CSSProperties } from "react";
import {  Table } from "@tanstack/react-table";


export interface ITable {
    table: Table<any>;
    data: any[];
    noScroll?: boolean;
    addRowStyle?: (row: any) => CSSProperties;
  }
  