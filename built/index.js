"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("./api"));
const p_queue_1 = __importDefault(require("p-queue"));
const queue = new p_queue_1.default({ concurrency: 10 });
queue.on('active', () => {
    console.log(`Working on item. Size: ${queue.size} Pending: ${queue.pending}`);
});
api_1.default(queue);
//# sourceMappingURL=index.js.map