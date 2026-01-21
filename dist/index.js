"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpan = require("webpan");
class CopyProcessor extends webpan.Processor {
    async build(content) {
        if (content === "dir")
            return {};
        return {
            relative: new Map([[this.filePath(), { buffer: content, priority: this.settings().priority ?? 0 }]]),
        };
    }
}
exports.default = CopyProcessor;
//# sourceMappingURL=index.js.map