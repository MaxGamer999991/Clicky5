import { Rect } from "./Elemente/Rect.js";
import { Text } from "./Elemente/Text.js";
import { _Image } from "./Elemente/Image.js";
import { Gruppe } from "./Elemente/Gruppe.js";

(window as any).DEBUG = false;

export { Rect, Text, _Image, Gruppe };
export type Elemente = Rect | Text | _Image | Gruppe;
