const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.static("mia_pag"));

// FONTE: e spiegazione campi ed esempi di visualizzazione
// https://dati.lombardia.it/Mobilit-e-trasporti/Flussi-Stazioni-Ferroviarie/m2u2-frtq
// https://dati.lombardia.it/stories/s/52uy-dgwp


const listener = app.listen(process.env.PORT || 3000, function () {
    console.log("* Your app is listening on port " + listener.address().port);
})


fs.readFile("Flussi_Stazioni_Ferroviarie.json", 'utf8', function (err, data) {

    if (err) {
        throw new Error("fatale")
    }
    let stazioni = JSON.parse(data);

    var mappa = {}  // mappa[210] = {x:45.25, y: 9.32} cioè la staz di albano sta lì
    stazioni.forEach(s => {
        mappa[s.CodStaz] = { "nome": s.Stazione, "x": s.POINT_X, "y": s.POINT_Y, "Corse24H": s.Corse24H, "Saliti24H": s.Saliti24H }
    });


    app.get("/stazioni", (req, res) => {
        res.json(Object.values(mappa))
    });

    app.get("/stazione", (req, res) => {
        console.log(`req.params`, req.query.CodStaz);
        res.json(mappa[req.query.CodStaz])
    });

});