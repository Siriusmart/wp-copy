"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpan = require("webpan");
class CopyProcessor extends webpan.Processor {
    async build(content) {
        if (content === "dir")
            return {};
        return {
            relative: new Map([[this.filePath(), content]]),
        };
    }
}
exports.default = CopyProcessor;
//# sourceMappingURL=index.js.map