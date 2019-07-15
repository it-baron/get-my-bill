"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const htmlPdf = __importStar(require("html-pdf-chrome"));
const bodyParser = require("body-parser");
exports.default = (queue, options = {}) => {
    const app = express_1.default();
    const port = 3022;
    const defaultOptions = {
        port: 9222,
    };
    app.use(bodyParser.text({ type: "*/*" })); // to support URL-encoded bodies
    app.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
        (() => __awaiter(this, void 0, void 0, function* () {
            yield queue.add(() => __awaiter(this, void 0, void 0, function* () {
                console.log('body', req.body);
                // TODO: json & template mustache with Content-Type: mustashe
                const pageWidth = req.header("X-Page-Width");
                const pageHeight = req.header("X-Page-Height");
                const pageWidthInch = pageWidth ? parseFloat(pageWidth) / 25.4 : undefined;
                const pageHeightInch = pageHeight ? parseFloat(pageHeight) / 25.4 : undefined;
                let buffer = yield htmlPdf.create(req.body, Object.assign({}, defaultOptions, { printOptions: {
                        paperWidth: pageWidthInch,
                        paperHeight: pageHeightInch
                    } }, options))
                    .then((pdf) => pdf.toBuffer());
                res.writeHead(200, {
                    'Content-Type': 'application/pdf',
                    'Content-Length': buffer.length
                });
                res.end(buffer);
            }));
            console.log('task resolved');
        }))();
        console.log('task added');
    }));
    app.listen(port, () => console.log(`Server listening on port ${port}!`));
};
//# sourceMappingURL=api.js.map