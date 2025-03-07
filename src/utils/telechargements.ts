import fs from 'node:fs';
import axios from 'npm:axios';
import { Buffer } from "node:buffer";

import { base, instance, ged, ip, __dirname } from "../main.ts";

export async function telechargePdf(
    parents: string[],
    fsfileid: number,
    fsfileripe: string,
    name: string,
) {
    const parent = __dirname + "/" + base + "/" + parents.map((str) =>
        str.replace(/\s+$/, "")
    ).join("/") + "/";

    const pdfURL = ged + "/data/showdocs.php?fsfileid=" + fsfileid +
        "&fsfileripe=" + fsfileripe;

    const response = await axios.get(pdfURL, {
        responseType: "arraybuffer",
        headers: {
            "accept":
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
            "accept-encoding": "gzip, deflate",
            "accept-language": "fr-FR,fr;q=0.9",
            "cache-control": "max-age=0",
            "connection": "keep-alive",
            "cookie": "instance=" + instance,
            "host": ip,
            "referer": ged + "/apps/user/index.php",
            "sec-gpc": "1",
            "upgrade-insecure-requests": "1",
            "user-agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
        },
    });

    const pdfBuffer = Buffer.from(response.data);

    if (!fs.existsSync(parent)) {
        fs.mkdirSync(parent, { recursive: true });
    }

    fs.writeFile(
        getRevisioned(parent, name),
        new Uint8Array(pdfBuffer),
        (err) => {
            if (err) {
                console.error(err);
            }
        },
    );
}

function getRevisioned(parent: string, name: string) {
    const split = name.split("."); // Split name and extension

    name = split[0];
    const extension = split[1];

    let revision = -1;

    let newPath = computePath(parent, name, revision, extension);

    do {
        revision++;
        newPath = computePath(parent, name, revision, extension);
    } while (fs.existsSync(newPath));

    return newPath;
}

function computePath(parent: string, name: string, revision: number, extension: string) {
    if(revision == 0) {
        return parent + name + "." + extension;
    }
    return parent + name + "-" + revision + "." + extension;
}