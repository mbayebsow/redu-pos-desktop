const Datastore = require('nedb')
const os = require("os");
const userHomeDir = os.homedir();

db = {};
db.ventes = new Datastore(userHomeDir+'/TPOS_data/db/Ventes.db');
db.clients = new Datastore(userHomeDir+'/TPOS_data/db/Clients.db');
db.ventes.loadDatabase();
db.clients.loadDatabase();


function init() {
    if(process.platform == 'darwin'){
      for (i = 0; i < document.querySelectorAll("#AppHeader").length; i++) {
        document.querySelectorAll("#AppHeader")[i].style.paddingLeft = '75px'
      }
    }else{
      for (i = 0; i < document.querySelectorAll("#AppHeader").length; i++) {
        document.querySelectorAll("#AppHeader")[i].style.paddingRight = '160px'
      }
    }
    const app = {
        searchKeyword: "",
        ventes: [],
        FactureView: [],
        loadVentes() {
          const _this = this
          db.ventes.find({}, function (err, docs) {
            _this.ventes = docs
          })
        },
        getVentesCount() {
          return this.ventes.reduce((count, item) => count + 1, 0);
        },
        getVentesTotal() {
          return this.ventes.reduce((count, item) => count + item.Total, 0);
        },
        searchVentes() {
          const rg = this.searchKeyword ? new RegExp(this.searchKeyword, "gi") : null;
          return this.ventes.filter((p) => !rg || p.No.match(rg));
        },
        factureView(vente){
          this.FactureView = []
          this.FactureView.push(vente);
        },
        numberFormat(number) {
          return (number || "")
            .toString()
            .replace(/^0|\./g, "")
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        },
        priceFormat(number) {
          return number ? `${this.numberFormat(number)} FCFA` : `0 FCFA`;
        },
        printAndProceed() {
            const receiptContent = document.getElementById('receipt-content');
            const titleBefore = document.title;
            const printArea = document.getElementById('print-area');
            const copyright = `Dévelloper par Teldoo group - 78 010 89 62`
            printArea.innerHTML = receiptContent.innerHTML + copyright;
            document.title = 'Facture N° '+this.receiptNo+' - TPOS';
 
            window.print();
            this.isShowModalReceipt = false;
        
            printArea.innerHTML = '';
            document.title = titleBefore;
        }
    }
    return app;
}