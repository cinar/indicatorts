// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { roundDigits } from '../helper/numArray';
import { NumRange } from './numRange';
import { NumScaler } from './numScaler';

const DEFAULT_STYLE = 'black';
const DEFAULT_WIDTH = 1;
const FOCUS_STYLE = 'red';
const FOCUS_WIDTH = 1;
const LEGEND_HEIGHT = 30;
const LEGEND_GAP = 4;
const LEGEND_FONT = '14px Arial';
const NO_FOCUS = -1;
const DEFAULT_RANGE = new NumRange(0, 1);

/**
 * Data set.
 */
export interface DataSet {
  legend: string;
  values: number[];
  style?: string | string[];
  width?: number;
}

/**
 * Chart object.
 */
export class Chart {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private dataSets: Map<string, DataSet>;
  private dateSetsChanged: boolean;
  private xScaler: NumScaler;
  private yScaler: NumScaler;
  private xFocus: number;

  /**
   * Constructor.
   * @param id canvas id.
   */
  constructor(id: string) {
    const canvas = document.getElementById(id);
    if (canvas === null) {
      throw new Error('Canvas element not found');
    } else if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error('Not a canvas element');
    }

    this.canvas = canvas;

    const context = this.canvas.getContext('2d');
    if (context === null) {
      throw new Error('Canvas context is null');
    }

    this.context = context;
    this.dataSets = new Map<string, DataSet>();
    this.dateSetsChanged = false;
    this.xScaler = new NumScaler(DEFAULT_RANGE, DEFAULT_RANGE);
    this.yScaler = new NumScaler(DEFAULT_RANGE, DEFAULT_RANGE);
    this.xFocus = NO_FOCUS;

    this.canvas.addEventListener('mousemove', (ev) => this.onMouseMove(ev));
    this.canvas.addEventListener('mouseout', () => this.onMouseOut());
  }

  /**
   * Add the data set.
   * @param dataSet data set.
   */
  add(dataSet: DataSet): void {
    this.dataSets.set(dataSet.legend, dataSet);
    this.dateSetsChanged = true;
  }

  /**
   * Removes the data set by the given legend.
   * @param legend data set legend value.
   * @return data set is removed.
   */
  remove(legend: string): boolean {
    const found = this.dataSets.delete(legend);
    if (found) {
      this.dateSetsChanged = true;
    }

    return found;
  }

  /**
   * Draw canvas.
   */
  draw(): void {
    if (this.dateSetsChanged) {
      this.updateScalers();
      this.dateSetsChanged = false;
    }

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawDataSets();
    this.drawFocus();
  }

  /**
   * Draws the data sets.
   */
  private drawDataSets() {
    const height = this.chartHeight();

    for (const dataSet of this.dataSets.values()) {
      this.context.lineWidth = dataSet.width ?? DEFAULT_WIDTH;

      let lastX = 0;
      let lastY = 0;

      for (let i = 0; i < dataSet.values.length; i++) {
        const x = this.xScaler.scale(i);
        const y = height - this.yScaler.scale(dataSet.values[i]);

        if (i > 0) {
          this.context.strokeStyle = this.styleAtIndex(dataSet, i);
          this.context.beginPath();
          this.context.moveTo(lastX, lastY);
          this.context.lineTo(x, y);
          this.context.stroke();
        }

        lastX = x;
        lastY = y;
      }
    }
  }

  /**
   * Style at given index.
   * @param dataSet data set.
   * @param index at index.
   * @return at style.
   */
  private styleAtIndex(dataSet: DataSet, index: number): string {
    if (dataSet.style === undefined) {
      return DEFAULT_STYLE;
    } else if (Array.isArray(dataSet.style)) {
      return dataSet.style[index];
    } else {
      return dataSet.style;
    }
  }

  /**
   * Draws focus line and focused values.
   */
  private drawFocus() {
    if (this.xFocus !== NO_FOCUS) {
      this.drawFocusLine();
      this.drawFocusedValues();
    }
  }

  /**
   * Draws the focus line.
   */
  private drawFocusLine() {
    this.context.strokeStyle = FOCUS_STYLE;
    this.context.lineWidth = FOCUS_WIDTH;
    this.context.beginPath();
    this.context.moveTo(this.xFocus, 0);
    this.context.lineTo(this.xFocus, this.chartHeight());
    this.context.stroke();
  }

  /**
   * Draws the focused values.
   */
  private drawFocusedValues() {
    const index = Math.round(this.xScaler.descale(this.xFocus));
    let xOffset = LEGEND_GAP;

    this.context.font = LEGEND_FONT;
    this.context.textBaseline = 'bottom';

    for (const dataSet of this.dataSets.values()) {
      if (index >= 0 && index < dataSet.values.length) {
        const text =
          dataSet.legend +
          ' ' +
          roundDigits(2, dataSet.values[index]).toString();

        this.context.fillStyle = this.styleAtIndex(dataSet, index);
        this.context.fillText(text, xOffset, this.canvas.height - LEGEND_GAP);

        xOffset += this.context.measureText(text).width + LEGEND_GAP;
      }
    }
  }

  /**
   * Calculates the chart height.
   * @return chart height.
   */
  private chartHeight(): number {
    return this.canvas.height - LEGEND_HEIGHT;
  }

  /**
   * Updates scalers.
   */
  private updateScalers() {
    if (this.dataSets.size === 0) {
      return;
    }

    this.xScaler = new NumScaler(
      new NumRange(
        0,
        Math.max(...Array.from(this.dataSets.values(), (d) => d.values.length))
      ),
      new NumRange(0, this.canvas.width)
    );

    this.yScaler = new NumScaler(
      NumRange.merge(
        Array.from(this.dataSets.values(), (d) => NumRange.from(d.values))
      ),
      new NumRange(0, this.chartHeight())
    );
  }

  /**
   * On mouse move event.
   * @param ev mouse event.
   */
  private onMouseMove(ev: MouseEvent) {
    const clientRect = this.canvas.getBoundingClientRect();
    this.xFocus = ev.clientX - clientRect.left;
    this.draw();
  }

  /**
   * On mouse out event.
   */
  private onMouseOut() {
    this.xFocus = NO_FOCUS;
    this.draw();
  }
}
