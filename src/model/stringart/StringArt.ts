import {StringArtData} from "./StringArtData";
import {makeObservable} from "../../core/reactive/MakeObservable";

export class StringArt {
    readonly data = makeObservable(new StringArtData());

    process() {

    }
}
