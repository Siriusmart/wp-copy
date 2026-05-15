"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const path_1 = __importDefault(require("path"));
const webpan = require("webpan");
class DirTocProcessor extends webpan.Processor {
    async build(content) {
        let entries = new Map();
        for (const [fileName, fileProcs] of this.files({ include: path_1.default.join(this.filePath(), "/**") }).entries()) {
            let unifiedProcs = fileProcs.procs().get("unified");
            if (unifiedProcs === undefined)
                continue;
            outer: for (const proc of unifiedProcs.values()) {
                let res = await proc.getResult();
                for (const plugin of res.result.pluginResults) {
                    if (plugin.pluginName === "remark-frontmatter") {
                        entries.set(fileName.split('/').filter(s => s.length), {
                            type: "file",
                            source: fileName,
                            meta: plugin.result,
                            output: res.files.values().next().value ?? null
                        });
                        break outer;
                    }
                }
            }
        }
        let directories = {};
        for (const path of entries.keys()) {
            for (let i = 0; i < path.length; i++) {
                let dirPath = path.slice(0, i).join("/");
                if (directories[dirPath] === undefined)
                    directories[dirPath] = {
                        type: "dir",
                        source: dirPath,
                        children: []
                    };
                if (i !== 0) {
                    let parentDirPath = path.slice(0, i - 1).join("/");
                    (0, assert_1.default)(directories[parentDirPath]?.type === "dir");
                    directories[parentDirPath].children.push(directories[dirPath]);
                }
            }
        }
        for (const [path, file] of entries.entries()) {
            let dirPath = path.slice(0, -1).join("/");
            (0, assert_1.default)(directories[dirPath]?.type === "dir");
            directories[dirPath].children.push(file);
        }
        let result = directories[""];
        return {
            relative: new Map([[path_1.default.join(this.filePath(), "index.json"), { buffer: JSON.stringify(result), priority: this.settings().priority ?? 0 }]]),
            result
        };
    }
}
exports.default = DirTocProcessor;
//# sourceMappingURL=index.js.map