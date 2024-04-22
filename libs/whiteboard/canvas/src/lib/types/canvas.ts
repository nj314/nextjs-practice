export const CanvasMode = {
  // avoid enums
  None: 1,
  Pressing: 2,
  SelectionNet: 3,
  Translating: 4,
  Inserting: 5,
  Resizing: 6,
  Pencil: 7,
} as const;

export type Color = {
  r: number;
  g: number;
  b: number;
};
export type Camera = {
  x: number;
  y: number;
};

export const LayerType = {
  Rectangle: 1,
  Ellipse: 2,
  Path: 3,
  Text: 4,
  Note: 5,
} as const;
export type LayerType = (typeof LayerType)[keyof typeof LayerType];

export type RectangleLayer = {
  type: typeof LayerType.Rectangle;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type EllipseLayer = {
  type: typeof LayerType.Ellipse;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type PathLayer = {
  type: typeof LayerType.Path;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  points: number[][];
  value?: string;
};

export type TextLayer = {
  type: typeof LayerType.Text;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type NoteLayer = {
  type: typeof LayerType.Note;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type Point = { x: number; y: number };
export type XYWH = { x: number; y: number; width: number; height: number };
export const Side = {
  Top: 1,
  Bottom: 2,
  Left: 4,
  Right: 8,
} as const;
export type Side = (typeof Side)[keyof typeof Side];

export type CanvasState =
  | { mode: typeof CanvasMode.None }
  | { mode: typeof CanvasMode.SelectionNet; origin: Point; current?: Point }
  | { mode: typeof CanvasMode.Translating; current: Point }
  | {
      mode: typeof CanvasMode.Inserting;
      layerType:
        | typeof LayerType.Ellipse
        | typeof LayerType.Rectangle
        | typeof LayerType.Text
        | typeof LayerType.Note;
    }
  | { mode: typeof CanvasMode.Pencil }
  | { mode: typeof CanvasMode.Pressing; origin: Point }
  | { mode: typeof CanvasMode.Resizing; initialBounds: XYWH; corner: Side };
