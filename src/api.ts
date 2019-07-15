import express, {Request, Response} from 'express'
import * as htmlPdf from "html-pdf-chrome";
import PQueue from "p-queue";
import bodyParser = require("body-parser");


export default (queue: PQueue, options = {}) => {
    const app = express();
    const port = 3022;

    const defaultOptions: htmlPdf.CreateOptions = {
        port: 9222, // port Chrome is listening on
    };

    app.use(bodyParser.text({type: "*/*"})); // to support URL-encoded bodies

    app.post('/', async (req: Request, res: Response) => {
        (async () => {
            await queue.add(async () => {
                console.log('body', req.body);

                // TODO: json & template mustache with Content-Type: mustashe

                const pageWidthMM = req.header("X-Page-Width");
                const pageHeightMM = req.header("X-Page-Height");
                const pageWidthInch = pageWidthMM ? parseFloat(pageWidthMM) / 25.4 : undefined;
                const pageHeightInch = pageHeightMM ? parseFloat(pageHeightMM) / 25.4 : undefined;

                let buffer = await htmlPdf.create(req.body,
                    {
                        ...defaultOptions,
                        printOptions: {
                            paperWidth: pageWidthInch,
                            paperHeight: pageHeightInch
                        },
                        ...options
                    })
                    .then((pdf) => pdf.toBuffer());

                res.writeHead(200, {
                    'Content-Type': 'application/pdf',
                    'Content-Length': buffer.length
                });

                res.end(buffer);
            });

            console.log('task resolved');
        })();

        console.log('task added');
    });

    app.listen(port, () => console.log(`Server listening on port ${port}!`))
}
