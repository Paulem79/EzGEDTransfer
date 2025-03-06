import { instance, ged } from "../main.ts";

import { Docpak, Dossiers, Queries, TreeArchive } from "../types.ts";

export async function obtenirClasseur(): Promise<Queries> {
  return await (await fetch(
    ged +
      "/data/service.php?service=query/gettreearchive&depth=query&node=root",
    {
      "headers": {
        "accept": "*/*",
        "accept-language": "fr-FR,fr;q=0.9",
        "sec-gpc": "1",
        "x-requested-with": "XMLHttpRequest",
        "cookie": "instance=" + instance,
        "Referer": ged + "/apps/user/index.php",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      "body": null,
      "method": "GET",
    },
  )).json();
}

export async function obtenirSousDossier(QRYSET_ID: number): Promise<TreeArchive> {
  return await (await fetch(
    ged +
      "/data/service.php?service=query/gettreearchive&_dc=1741259404893&depth=treenode&qryid=" +
      QRYSET_ID,
    {
      "headers": {
        "accept": "*/*",
        "accept-language": "fr-FR,fr;q=0.9",
        "sec-gpc": "1",
        "x-requested-with": "XMLHttpRequest",
        "cookie": "instance=" + instance,
        "Referer": ged + "/apps/user/index.php",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      "body": null,
      "method": "GET",
    },
  )).json();
}

export async function obtenirClient(name: string): Promise<Dossiers> {
  return await(await fetch(ged + "/data/service.php?service=query/getexec&ignoremasked=1&qryusrffqn=%5B%22dossiers.DOSSIERS_nomprop%22%5D&qryusrop=%5B%22%3D%22%5D&qryusrval=%5B%22" + encodeURIComponent(name) + "%22%5D&qryid=1&limitstart=0&limitgridlines=100", {
    "headers": {
      "accept": "*/*",
      "accept-language": "fr-FR,fr;q=0.9",
      "sec-gpc": "1",
      "x-requested-with": "XMLHttpRequest",
      "cookie": "instance=" + instance,
      "Referer": ged + "/apps/user/index.php",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  })).json();
}

export async function obtenirDocuments(trucId: number): Promise<Docpak> {
  return await (await fetch(
    ged +
      "/data/service.php?service=docpak/loadalllastrevision&fsfileinfo=1&docpakrsid=" +
      trucId +
      "&docpaktbl=dossiers&docpakpage=*&wordlocalization=0&words=&mode=all&qryid=1&limitstart=0&limitgridlines=20",
    {
      "headers": {
        "accept": "*/*",
        "accept-language": "fr-FR,fr;q=0.9",
        "sec-gpc": "1",
        "x-requested-with": "XMLHttpRequest",
        "cookie": "instance=" + instance,
        "Referer": ged + "/apps/user/index.php",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      "body": null,
      "method": "GET",
    },
  )).json();
}