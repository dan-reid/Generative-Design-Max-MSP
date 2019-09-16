autowatch = 1;

const Max = require("max-api");
const tools = require('simple-svg-tools');
const path = require('path');
const fs = require('fs');


const directoryPath = path.join(__dirname, 'data');

Max.addHandler("bang", () => {
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return Max.post('Unable to scan directory: ' + err);
        }

        //listing all files using forEach
        files.forEach(function (file) {

            Max.post(directoryPath + '/' + file);
            tools.GetPalette(directoryPath + '/' + file).then(result => {
                // Max.post('Colors used in SVG: ' + result.colors.join(', '));
                Max.post('Colors used in SVG: ');
                if (result.notices.length) {
                    //result.notices.forEach(notice => Max.post(notice));
                }
            }).catch(err => {
                //Max.post(err);
            });
        });
    });
});




