const Datastore = require('nedb')
const fs = require('fs');
const fetch = require('node-fetch');
var Airtable = require('airtable');

var apiKey = 'keynPu75N2wziwDUk';

database = {};
database.settings = new Datastore('./db/settings.db');
database.produits = new Datastore('./db/Prduits.db');
database.settings.loadDatabase();
database.produits.loadDatabase();

function init() {
    const app = {
        activation() {
            const _this = this
            var keyActivation = document.getElementById('keyActivation').value;
            var base = new Airtable({apiKey: apiKey}).base(keyActivation);
            base('Produits').select({ view: "Grid view" }).eachPage(function page(records, fetchNextPage) {
                records.forEach(function(record) {
                    async function download() {
                        const response = await fetch(record.get('Image'));
                        const buffer = await response.buffer();
                        fs.writeFile(`./public/img/`+record.get('Name')+`.jpg`, buffer, () => 
                            database.produits.insert({
                                'Ref': record.id,
                                'name': record.get('Name'), 
                                'price': record.get('Prix'), 
                                'Quantité': record.get('Quantité'), 
                                'Unité': record.get('Unité'), 
                                'PriceDemi': record.get('Prix a moitie'),
                                'Vente': record.get('Vente'),
                                'Active': record.get('Active'),
                                'image': 'img/'+record.get('Name')+'.jpg',
                                'Date': record.get('Date'),
                            }),
                            console.log('finished downloading!')
                        );
                    }
                    i++;
                    download();
                });
                fetchNextPage();

            }, function done(err) {
                if (err) { console.error(err); return; }
                database.settings.find({ key: { $exists: true } }, function (err, docs) {
                  if(docs.length == 0){
                    database.settings.insert({'key':keyActivation})
                  }
                })
            });
        },
    }
    return app;
}