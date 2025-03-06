export class Queries {
    errorcode: number;
    errormsg: string;
    rows: Array<{
        rows: Array<{
            rows: Array<{
                QRY_ASK: number;
                type: string;
                QRY_ID: number;
                QRY_DESC: string;
                rows: Array<{
                    LVL: number;
                    TYPE: string;
                    FFQN: string;
                    type: string;
                }>;
                SRCHQRYFLT_INCLUDED: number;
                QRY_RANK: number;
                QRY_PUBCNTCOR: number;
                QRY_TREE: number;
            }>;
            QRYSET_DESC: string;
            SRCHQRYFLT_INCLUDED: number;
            QRYSET_ID: number;
            type: string;
        }>;
        type: string;
        label: string;
    }>;
    count: number;
}

export class TreeNode {
    LVL: number;
    TYPE: string;
    FFQN: string;
    type: string;
}

export class TreeNodeDesc {
    LVL1: string;
    type: string;
}

export class TreeArchive {
    errorcode: number;
    errormsg: string;
    rows: Array<TreeNode | TreeNodeDesc>;
    count: number;
}

export class Dossiers {
    errorcode: number;
    errormsg: string;
    rows: Array<{
        DOSSIERS_nomprop: string;
        DOSSIERS_dateinteg: string;
        DOSSIERS_adressbien: string;
        DOSSIERS_typebien: string;
        DOSSIERS_typedocprop: string;
        DOSSIERS_nomloc: string | null;
        DOSSIERS_ancienloc: number;
        DOSSIERS_ancienprop: number;
        DOSSIERS_typedocloc: string | null;
        DOSSIERS_fulltext: string;
        type: string;
        DOSSIERS_ID: number;
    }>;
    count: number;
}

export class Docpak {
    errorcode: number;
    count: number;
    rows: Array<{
        hasnot: number;
        ripe: string;
        datefilearchive: string;
        DOCPAK_RANK: number;
        lock: string;
        oname: string;
        rank: number;
        fssigid: number;
        ostamp: string;
        DOCPAK_ID: number;
        sigusers: Array<any>;
        isused: string;
        table: string;
        infwords: string;
        size: number;
        namefilearchive: string;
        haswords: number;
        dimensions: Array<[number, number]>;
        DOCPAK_FSFILEID: number;
        QRY_DESC: string;
        sizefileorigin: number;
        fsfileid: number;
        rsid: number;
        version: number;
        DOCPAK_RSID: number;
        hassig: string;
        DOCPAK_REVISION: number;
        type: string;
        userfilearchive: string;
        used: string;
        islock: string;
        ripefileorigin: string;
        docpakid: number;
        namefileorigin: string;
        datefileorigin: string;
        mime: string;
        user: string;
        path: string;
        usedby: string;
        pages: number;
        sigpath: string;
        extension: string;
        ripefilearchive: string;
        ext: string;
        DOCPAK_TBL: string;
        pathfilearchive: string;
        nname: string;
        newripe: string;
        issuers: Array<any>;
        nstamp: string;
        sigripe: string;
        fssigripe: string;
    }>;
    service: string;
    countdocpak: number;
    errormsg: string;
}