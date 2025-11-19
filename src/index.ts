import webpan = require("webpan")
import type { ProcessorOutputRaw } from "webpan/dist/types/processorStates";

export default class CopyProcessor extends webpan.Processor {
    async build(content: Buffer | "dir"): Promise<ProcessorOutputRaw> {
        if (content === "dir") return {}
        return {
            relative: new Map([[this.filePath(), content]]),
        }
    }
}
