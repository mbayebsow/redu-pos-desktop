const Datastore = require('nedb')
const os = require("os");
const userHomeDir = os.homedir();

db = {};
db.clients = new Datastore(userHomeDir+'/TPOS_data/db/Clients.db');
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
      addClientModal: false,
      Clients: [],
      ClientView: [],
      searchKeyword: "",
      notices: [],
      visible: [],
      add(notice) {
        notice.id = Date.now()
        this.notices.push(notice)
        this.fire(notice.id)
      },
      fire(id) {
        this.visible.push(this.notices.find(notice => notice.id == id))
        const timeShown = 5000 * this.visible.length
        setTimeout(() => {
          this.remove(id)
        }, timeShown)
      },
      remove(id) {
        const notice = this.visible.find(notice => notice.id == id)
        const index = this.visible.indexOf(notice)
        this.visible.splice(index, 1)
      },
      searchClients() {
        const rg = this.searchKeyword ? new RegExp(this.searchKeyword, "gi") : null;
        return this.Clients.filter((p) => !rg || p.Prenom.match(rg) || p.Nom.match(rg));
      },
      loadClients() {
        const _this = this
        db.clients.find({}, function (err, docs) {
          _this.Clients = docs
        })
      },
      clientView(client){
        this.ClientView = []
        this.ClientView.push(client);
      },
      addClient(){
        const _this = this
        var PrenomClient = document.getElementById('PrenomClient').value;
        var NomClient = document.getElementById('NomClient').value;
        var TelephoneClient = document.getElementById('TelephoneClient').value;
        var AdresseClient = document.getElementById('AdresseClient').value;
    
        if(PrenomClient == ""){
          this.add({type: 'error', text: 'Entrer le Prenom du clients.'})
          return
        }
        if(NomClient == ""){
          this.add({type: 'error', text: 'Entrer le nom du clients.'})
          return
        }
        if(TelephoneClient == ""){
          this.add({type: 'error', text: 'Entrer le numéro du clients.'})
          return
        }
        db.clients.insert({
          'Prenom': PrenomClient, 
          'Nom': NomClient, 
          'Telephone': TelephoneClient,
          'Adresse': AdresseClient, 
          'Date': new Date().toISOString(),
        });
        this.add({type: 'success', text: 'Client ajouté'})
        document.getElementById('PrenomClient').value = null;
        document.getElementById('NomClient').value = null;
        document.getElementById('TelephoneClient').value = null;
        document.getElementById('AdresseClient').value = null;
        this.loadClients()
      },
      saveEditClient(id){
        const _this = this
        var PrenomClientEdit = document.getElementById('PrenomClientEdit').value;
        var NomClienEditt = document.getElementById('NomClienEditt').value;
        var TelephoneClientEdit = document.getElementById('TelephoneClientEdit').value;
        var AdresseClientEdit = document.getElementById('AdresseClientEdit').value;
  
        db.clients.update( { _id: id }, {
          $set: { 
            Prenom: PrenomClientEdit,
            Nom: NomClienEditt,
            Telephone: TelephoneClientEdit,
            Adresse: AdresseClientEdit,
          }},
          {},
          function (err, numReplaced) {
            if(numReplaced == 1){
              _this.add({type: 'success', text: PrenomClientEdit+' modifier avec succes.'})
              _this.loadClients()
              _this.ClientView = []
              db.clients.loadDatabase();
            }
          }
        );
      },
      deleteCLient(id, name) {
        const _this = this
        if (confirm('Voullez vous vraiment supprimer '+name) == true) {
          db.clients.remove({ _id: id }, {}, function (err, numRemoved) {
            if(numRemoved ==1) {
              _this.loadClients()
              _this.ClientView = []
            }
          });
        } else {
          return
        }
      },
    }
    return app;
}