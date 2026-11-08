// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

/**
 * The tests run in Node, so they provide a minimal fake canvas and 2D
 * context that record the drawing calls the chart makes.
 */

type Call = [string, ...unknown[]];

class FakeContext {
  calls: Call[] = [];
  lineWidth = 0;
  strokeStyle = '';
  fillStyle = '';
  font = '';
  textBaseline = '';

  clearRect(...args: number[]): void {
    this.calls.push(['clearRect', ...args]);
  }
  beginPath(): void {
    this.calls.push(['beginPath']);
  }
  moveTo(x: number, y: number): void {
    this.calls.push(['moveTo', x, y]);
  }
  lineTo(x: number, y: number): void {
    this.calls.push(['lineTo', x, y]);
  }
  stroke(): void {
    this.calls.push(['stroke', this.strokeStyle, this.lineWidth]);
  }
  fillText(text: string, x: number, y: number): void {
    this.calls.push(['fillText', text, x, y, this.fillStyle]);
  }
  measureText(text: string): { width: number } {
    this.calls.push(['measureText', text]);
    return { width: text.length * 10 };
  }

  named(name: string): Call[] {
    return this.calls.filter((call) => call[0] === name);
  }
}

class FakeCanvas {
  width = 200;
  height = 130;
  left = 10;
  context: FakeContext | null = new FakeContext();
  listeners = new Map<string, (ev: { clientX: number }) => void>();

  getContext(): FakeContext | null {
    return this.context;
  }
  addEventListener(type: string, listener: (ev: { clientX: number }) => void) {
    this.listeners.set(type, listener);
  }
  getBoundingClientRect(): { left: number } {
    return { left: this.left };
  }
}

const elements = new Map<string, unknown>();

Object.assign(globalThis, {
  HTMLCanvasElement: FakeCanvas,
  document: { getElementById: (id: string) => elements.get(id) ?? null },
});

// Imported after the globals are in place.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Chart } = require('./chart') as typeof import('./chart');

function newChart(): { chart: InstanceType<typeof Chart>; canvas: FakeCanvas } {
  const canvas = new FakeCanvas();
  elements.set('chart', canvas);
  return { chart: new Chart('chart'), canvas };
}

describe('Chart', () => {
  afterEach(() => elements.clear());

  it('should throw when the canvas element is not found', () => {
    expect(() => new Chart('missing')).toThrow('Canvas element not found');
  });

  it('should throw when the element is not a canvas', () => {
    elements.set('div', {});
    expect(() => new Chart('div')).toThrow('Not a canvas element');
  });

  it('should throw when the canvas has no 2D context', () => {
    const canvas = new FakeCanvas();
    canvas.context = null;
    elements.set('chart', canvas);
    expect(() => new Chart('chart')).toThrow('Canvas context is null');
  });

  it('should draw each data set scaled to the chart area', () => {
    const { chart, canvas } = newChart();
    chart.add({ legend: 'a', values: [0, 10, 5], width: 2 });
    chart.draw();

    const context = canvas.context as FakeContext;
    expect(context.named('clearRect')).toStrictEqual([
      ['clearRect', 0, 0, 200, 130],
    ]);

    // The chart area is the canvas height minus the 30px legend. x spans
    // the indexes 0..2 over 0..200, and y spans the values 0..10 over
    // 100..0, since the canvas y axis points down.
    expect(context.named('moveTo')).toStrictEqual([
      ['moveTo', 0, 100],
      ['moveTo', 100, 0],
    ]);
    expect(context.named('lineTo')).toStrictEqual([
      ['lineTo', 100, 0],
      ['lineTo', 200, 50],
    ]);
    expect(context.named('stroke')).toStrictEqual([
      ['stroke', 'black', 2],
      ['stroke', 'black', 2],
    ]);
  });

  it('should use a single style, or a style per index with a default', () => {
    const { chart, canvas } = newChart();
    chart.add({ legend: 'a', values: [1, 2], style: 'blue' });
    chart.add({ legend: 'b', values: [1, 2, 3], style: ['x', 'green'] });
    chart.draw();

    const styles = (canvas.context as FakeContext)
      .named('stroke')
      .map((call) => call[1]);
    expect(styles).toStrictEqual(['blue', 'green', 'black']);
  });

  it('should scale every data set to the longest one and the combined value range', () => {
    const { chart, canvas } = newChart();
    chart.add({ legend: 'a', values: [0, 20] });
    chart.add({ legend: 'b', values: [10, 10, 10, 10, 10] });
    chart.draw();

    expect((canvas.context as FakeContext).named('lineTo')[0]).toStrictEqual([
      'lineTo',
      50,
      0,
    ]);
  });

  it('should remove data sets by legend', () => {
    const { chart, canvas } = newChart();
    chart.add({ legend: 'a', values: [1, 2] });

    expect(chart.remove('missing')).toBe(false);
    expect(chart.remove('a')).toBe(true);

    chart.draw();
    expect((canvas.context as FakeContext).named('stroke')).toStrictEqual([]);
  });

  it('should show a focus line and the values under the mouse, until it leaves', () => {
    const { chart, canvas } = newChart();
    chart.add({ legend: 'a', values: [0, 10, 5] });
    chart.add({ legend: 'short', values: [1] });
    chart.draw();

    const context = canvas.context as FakeContext;
    context.calls = [];

    // clientX 110 is 100px into the canvas, which is index 1.
    canvas.listeners.get('mousemove')?.({ clientX: 110 });

    expect(context.named('moveTo')).toContainEqual(['moveTo', 100, 0]);
    expect(context.named('lineTo')).toContainEqual(['lineTo', 100, 100]);
    expect(context.named('stroke')).toContainEqual(['stroke', 'red', 1]);

    // Only data sets with a value at the focused index are listed.
    expect(context.named('fillText')).toStrictEqual([
      ['fillText', 'a 10', 4, 126, 'black'],
    ]);

    context.calls = [];
    canvas.listeners.get('mouseout')?.({ clientX: 0 });
    expect(context.named('fillText')).toStrictEqual([]);
    expect(context.named('stroke')).not.toContainEqual(['stroke', 'red', 1]);
  });
});
