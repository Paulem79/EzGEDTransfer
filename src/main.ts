import {
  createFolder,
  obtenirClasseur,
  obtenirClient,
  telechargePdf,
  obtenirSousDossier,
  obtenirDocuments,
} from "./utils/export.ts";

export const __dirname = import.meta.dirname;

export const base = "EzGED";

import config from "../config.json" with { type: "json" };
export const { instance, ged, ip } = config;

const views = await obtenirClasseur();

console.log(views)
for (const view of views.rows[0].rows) {
  // Dossiers clients
  createFolder([], view.QRYSET_DESC);

  for (const row of view.rows) {
    // Gestion
    createFolder([view.QRYSET_DESC], row.QRY_DESC);

    const proprios = await obtenirSousDossier(row.QRY_ID);
    for (const proprio of proprios.rows) {
      // ALBERT

      console.log(proprios.rows.indexOf(proprio) + "/" + proprios.rows.length);
      
      if ("LVL1" in proprio && proprio.LVL1) {
        console.log(proprio.LVL1);

        createFolder([view.QRYSET_DESC, row.QRY_DESC], proprio.LVL1);

        const dossiers = await obtenirClient(proprio.LVL1);
        for (const dossier of dossiers.rows) {
          // Adresse etc.
          const documents = await obtenirDocuments(dossier.DOSSIERS_ID);
          
          createFolder([view.QRYSET_DESC, row.QRY_DESC, proprio.LVL1], dossier.DOSSIERS_adressbien);
          createFolder([view.QRYSET_DESC, row.QRY_DESC, proprio.LVL1, dossier.DOSSIERS_adressbien], dossier.DOSSIERS_typebien);
          
          if (dossier.DOSSIERS_nomloc) {
            // Avec locataire
            createFolder([view.QRYSET_DESC, row.QRY_DESC, proprio.LVL1, dossier.DOSSIERS_adressbien, dossier.DOSSIERS_typebien], "LOCATAIRE");

            createFolder([view.QRYSET_DESC, row.QRY_DESC, proprio.LVL1, dossier.DOSSIERS_adressbien, dossier.DOSSIERS_typebien, "LOCATAIRE"], dossier.DOSSIERS_nomloc);
            if(dossier.DOSSIERS_typedocloc) {
              createFolder([view.QRYSET_DESC, row.QRY_DESC, proprio.LVL1, dossier.DOSSIERS_adressbien, dossier.DOSSIERS_typebien, "LOCATAIRE", dossier.DOSSIERS_nomloc], dossier.DOSSIERS_typedocloc);
              
              for (const doc of documents.rows) {
                const docName = doc.namefileorigin.replace("." + doc.extension, "");
                const fileName = docName + "-" + dossier.DOSSIERS_dateinteg + "." + doc.extension;
                telechargePdf([view.QRYSET_DESC, row.QRY_DESC, proprio.LVL1, dossier.DOSSIERS_adressbien, dossier.DOSSIERS_typebien, "LOCATAIRE", dossier.DOSSIERS_nomloc, dossier.DOSSIERS_typedocloc], doc.fsfileid, doc.ripe, fileName);
              }
            }
          } else {
            // Sans locataire
            
            for (const doc of documents.rows) {
              const docName = doc.namefileorigin.replace("." + doc.extension, "");
              const fileName = docName + "-" + dossier.DOSSIERS_dateinteg + "." + doc.extension;
              telechargePdf([view.QRYSET_DESC, row.QRY_DESC, proprio.LVL1, dossier.DOSSIERS_adressbien, dossier.DOSSIERS_typebien, docName], doc.fsfileid, doc.ripe, fileName);
            }
          }
        }
      } else console.log(proprio); // No LVL1
    }
  }
}

console.log("Terminé !");