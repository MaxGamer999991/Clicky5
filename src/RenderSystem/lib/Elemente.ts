import { Rect } from "./Elemente/Rect.js";
import { _Text } from "./Elemente/Text.js";
import { _Image } from "./Elemente/Image.js";
import { Gruppe } from "./Elemente/Gruppe.js";

(window as any).DEBUG = false;

export { Rect, _Text, _Image, Gruppe };
export type Elemente = Rect | _Text | _Image | Gruppe;
