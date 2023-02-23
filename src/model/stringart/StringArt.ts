import {StringArtData} from "./StringArtData";
import {StringArtProcessor} from "./StringArtProcessor";

export class StringArt {
    readonly data = new StringArtData();
    readonly processor = new StringArtProcessor();
}