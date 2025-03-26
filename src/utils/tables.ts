import { instance, ged } from "../main.ts";

import { Docpak, Dossiers, Queries, TreeArchive } from "../types.ts";

export async function obtenirClasseur(): Promise<Queries> {
  return await (await fetchRetry(
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
  return await (await fetchRetry(
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
  let content: Dossiers = await(await fetchRetry(ged + "/data/service.php?service=query/getexec&ignoremasked=1&qryusrffqn=%5B%22dossiers.DOSSIERS_nomprop%22%5D&qryusrop=%5B%22%3D%22%5D&qryusrval=%5B%22" + encodeURIComponent(name) + "%22%5D&qryid=1&limitstart=0&limitgridlines=100", {
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

  let next = content;
  
  do {
    next = await(await fetchRetry(ged + "/data/service.php?service=query/getexec&ignoremasked=1&qryusrffqn=%5B%22dossiers.DOSSIERS_nomprop%22%5D&qryusrop=%5B%22%3D%22%5D&qryusrval=%5B%22" + encodeURIComponent(name) + "%22%5D&qryid=1&limitstart=" + content.rows.length + "&limitgridlines=100", {
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
    
    content.rows = content.rows.concat(next.rows);
  }
  while(next.rows.length == 100);

  return content;
}

export async function obtenirDocuments(trucId: number): Promise<Docpak> {
  let content: Docpak = await (await fetchRetry(
    ged +
      "/data/service.php?service=docpak/loadalllastrevision&fsfileinfo=1&docpakrsid=" +
      trucId +
      "&docpaktbl=dossiers&docpakpage=*&wordlocalization=0&words=&mode=all&qryid=1&limitstart=0&limitgridlines=20", {
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

  let next = content;
  
  do {
    next = await(await fetchRetry(
      ged +
      "/data/service.php?service=docpak/loadalllastrevision&fsfileinfo=1&docpakrsid=" +
      trucId +
      "&docpaktbl=dossiers&docpakpage=*&wordlocalization=0&words=&mode=all&qryid=1&limitstart=" + content.rows.length + "&limitgridlines=20", {
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
    
    content.rows = content.rows.concat(next.rows);
  }
  while(next.rows.length == 100);

  return content;
}

function wait(ms: number){
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fetchRetry(url: string, fetchOptions: RequestInit = {}, delay: number = 100) {
  function onError(err: any){
    console.error(`Failed to fetch ${url}: ${err}`);
    console.log(`Retrying in ${delay} ms...`);
    return wait(delay).then(() => fetchRetry(url, fetchOptions, delay));
  }
  return fetch(url, fetchOptions).catch(onError);
}