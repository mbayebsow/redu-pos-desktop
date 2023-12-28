// const dbproduits = new Datastore({ filename: userHomeDir + "/TPOS_data/db/Produits.db", autoload: true });
// const dbventes = new Datastore({ filename: userHomeDir + "/TPOS_data/db/Ventes.db", autoload: true });
// const dbsettings = new Datastore({ filename: userHomeDir + "/TPOS_data/db/Settings.db", autoload: true });
// const dbclients = new Datastore({ filename: userHomeDir + "/TPOS_data/db/Clients.db", autoload: true });

moment.locale("fr");
UPLOADCARE_LOCALE = "fr";

const db = new localdb("ReduPos");

if (!db.tableExists("Products")) db.createTable("Produits");
if (!db.tableExists("Sales")) db.createTable("Ventes");
if (!db.tableExists("Clients")) db.createTable("Clients");

function initApp() {
  const app = {
    isShowModalReceipt: false,
    priceDemiModal: false,
    addProductModal: false,
    clientsModal: false,
    clientEditModal: false,
    priceDemiProduct: "",
    // firstTime: localStorage.getItem("first_time") === null,
    time: null,
    products: [],
    clients: [],
    cart: [],
    clientCart: [],
    keyword: "",
    keywordp: "",
    cash: 0,
    change: 0,
    receiptNo: null,
    receiptDate: null,
    notices: [],
    visible: [],
    add(notice) {
      notice.id = Date.now();
      this.notices.push(notice);
      this.fire(notice.id);
    },
    fire(id) {
      this.visible.push(this.notices.find((notice) => notice.id == id));
      const timeShown = 5000 * this.visible.length;
      setTimeout(() => {
        this.remove(id);
      }, timeShown);
    },
    remove(id) {
      const notice = this.visible.find((notice) => notice.id == id);
      const index = this.visible.indexOf(notice);
      this.visible.splice(index, 1);
    },
    filteredProducts() {
      const rg = this.keyword ? new RegExp(this.keyword, "gi") : null;
      return this.products.filter((p) => !rg || p.name.match(rg));
    },
    loadProducts() {
      const _this = this;
      const PRODUCTDB = JSON.parse(db.exportData("Products"))

      if(PRODUCTDB) _this.products = JSON.parse(db.exportData("Products")).rows;

      _this.loadClients();

      // console.log("product", JSON.parse(db.exportData("Products")));
    },
    loadClients() {
      const _this = this;
      const CLIENTDB = JSON.parse(db.exportData("Clients"))
      if(CLIENTDB) _this.clients = JSON.parse(db.exportData("Clients")).rows;

      // console.log("clients", _this.clients);
    },
    // syncData() {
    //   const _this = this;
    //   var keyActivation = document.getElementById("keyActivation").value;

    //   var base = new Airtable({ apiKey: apiKey }).base(keyActivation);
    //   base("Produits")
    //     .select({ view: "Grid view" })
    //     .eachPage(
    //       function page(records, fetchNextPage) {
    //         dbproduits.count({}, function (err, count) {
    //           if (count > 0) {
    //             _this.setFirstTime(false);
    //             dbsettings.insert({ Key: keyActivation });
    //             _this.baseKey = false;
    //           } else {
    //             records.forEach(function (record) {
    //               async function download() {
    //                 const response = await fetch(record.get("Image"));
    //                 const buffer = await response.buffer();
    //                 fs.writeFile(
    //                   userHomeDir + `/TPOS_data/img/` + record.get("Name") + `.jpg`,
    //                   buffer,
    //                   () =>
    //                     dbproduits.insert({
    //                       name: record.get("Name"),
    //                       price: record.get("Prix"),
    //                       Quantité: record.get("Quantité"),
    //                       Unité: record.get("Unité"),
    //                       PriceDemi: record.get("Prix a moitie"),
    //                       Vente: record.get("Vente"),
    //                       Active: record.get("Active"),
    //                       image: "img/" + record.get("Name") + ".jpg",
    //                       Date: record.get("Date"),
    //                     }),
    //                   _this.loadProducts()
    //                 );
    //               }
    //               download();
    //             });
    //             fetchNextPage();
    //           }
    //         });
    //       },
    //       function done(err) {
    //         if (err) {
    //           _this.add({ type: "error", text: "Une erreur c'est produite veuillez réessayer" }), console.error(err);
    //           return;
    //         }
    //         dbsettings.insert({ Key: keyActivation });
    //         _this.baseKey = false;
    //         _this.setFirstTime(false);
    //       }
    //     );
    // },
    addClientCart(client) {
      this.beep();
      this.clientCart = [];
      this.clientCart.push({
        Id: client._id,
        Prenom: client.Prenom,
        Nom: client.Nom,
        Telephone: client.Telephone,
        Adresse: client.Adresse,
      });
    },
    // setFirstTime(firstTime) {
    //   this.firstTime = firstTime;
    //   if (firstTime) {
    //     localStorage.removeItem("first_time");
    //   } else {
    //     localStorage.setItem("first_time", new Date().getTime());
    //   }
    // },
    addToCart(product) {
      const index = this.findCartIndex(product);
      if (index === -1) {
        if (product.PriceDemi == true) {
          this.priceDemiModal = true;
          this.priceDemiProduct = product;
        } else {
          this.addToCartConfirmed(product, "Complet");
        }
      } else {
        this.beep();
        this.cart[index].qty += 1;
        this.updateChange();
      }
    },
    addToCartConfirmed(product, type) {
      this.beep();
      if (type == "Moitie") {
        this.cart.push({
          productId: product._id,
          image: product.image,
          name: product.name + " (Moitié)",
          price: product.price / 2,
          demiPrice: true,
          Vente: product.Vente,
          qty: 1,
        });
        this.updateChange();
      }
      if (type == "Complet") {
        this.cart.push({
          productId: product._id,
          image: product.image,
          name: product.name,
          price: product.price,
          demiPrice: false,
          qty: 1,
        });
        this.updateChange();
      }
      this.priceDemiModal = false;
    },
    findCartIndex(product) {
      return this.cart.findIndex((p) => p.productId === product._id);
    },
    addQty(item, qty) {
      const index = this.cart.findIndex((i) => i.productId === item.productId);
      if (index === -1) {
        return;
      }
      const afterAdd = item.qty + qty;
      if (afterAdd === 0) {
        this.clearSound();
        this.cart.splice(index, 1);
      } else {
        this.beep();
        this.cart[index].qty = afterAdd;
      }
      this.updateChange();
    },
    addCash(amount) {
      this.beep();
      this.cash = "";
      this.cash = (this.cash || 0) + amount;
      this.updateChange();
    },
    getItemsCount() {
      return this.cart.reduce((count, item) => count + item.qty, 0);
    },
    updateChange() {
      this.change = this.getTotalPrice() - this.cash;
    },
    updateCash(value) {
      this.cash = parseFloat(value.replace(/[^0-9]+/g, ""));
      this.updateChange();
    },
    addCashNumber(value) {
      this.cash = this.cash + value;
      this.beep();
      this.updateChange();
    },
    deleteCashNumber() {
      this.cash = this.cash.slice(0, -1);
      this.updateChange();
    },
    clearCashNumber() {
      this.cash = "";
      this.updateChange();
    },
    getTotalPrice() {
      return this.cart.reduce((total, item) => total + item.qty * item.price, 0);
    },
    submitable() {
      return this.change >= 0 && this.cart.length > 0;
    },
    submit() {
      this.time = new Date();
      this.isShowModalReceipt = true;
      this.receiptNo = `${Math.round(this.time.getTime() / 100)}`;
      this.receiptDate = moment(this.time).format("dddd Do MMM YYYY à HH:mm");
    },
    dateFormat(date) {
      const formatter = new Intl.DateTimeFormat("id", { dateStyle: "short", timeStyle: "short" });
      return formatter.format(date);
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
    setVente() {
      // const sellPid = [];
      // this.cart.map((item) => {
      //   dbproduits.update({ _id: item.productId }, { $set: { Vente: 1 } }, {}, function (err, numReplaced) {
      //     //console.log(err)
      //     if (numReplaced == 1) {
      //       dbproduits.loadDatabase();
      //     }
      //   });
      // });

      db.insert("Sales", {
        Date: moment(this.time).format("Do MMM YYYY / HH:mm"),
        No: this.receiptNo,
        Total: this.getTotalPrice(),
        Accompte: this.cash,
        Netapayer: this.change,
        Produits: this.cart,
        Client: this.clientCart,
      });
    },
    // getProductImage(url) {
    //   if (url.indexOf("base64") > -1) {
    //     return url;
    //   } else {
    //     return path.join(__dirname, url);
    //   }
    // },
    clear() {
      this.clearSound();
      this.cash = 0;
      this.cart = [];
      this.receiptNo = null;
      this.receiptDate = null;
      this.updateChange();
    },
    beep() {
      this.playSound("sound/beep-29.mp3");
    },
    clearSound() {
      this.playSound("sound/button-21.mp3");
    },
    playSound(src) {
      const sound = new Audio();
      sound.src = src;
      sound.play();
      sound.onended = () => delete sound;
    },
    printAndProceed() {
      const receiptContent = document.getElementById("receipt-content");
      const titleBefore = document.title;
      const printArea = document.getElementById("print-area");
      const copyright = `by MBAYE SOW | mbayebabssow@gmail.com`;
      printArea.innerHTML = receiptContent.innerHTML + copyright;
      document.title = "Facture N° " + this.receiptNo + " - RP";

      window.print();
      this.isShowModalReceipt = false;

      printArea.innerHTML = "";
      document.title = titleBefore;

      // TODO save sale data to db
      this.setVente();
      this.clear();
    },
  };
  return app;
}
