moment.locale("fr");
UPLOADCARE_LOCALE = "fr";

DB.initializeTables("products");
DB.initializeTables("sales");
DB.initializeTables("clients");

// const currentUrl = window.location.pathname;
// console.log(currentUrl);

function initApp() {
  const app = {
    // PRODUCTS //
    searchKeyword: "",
    productEdit: [],
    products: [],
    addProductModal: false,

    // APP //
    currentPath: null,
    isShowModalReceipt: false,
    priceDemiModal: false,
    clientsModal: false,
    clientEditModal: false,
    priceDemiProduct: "",
    clients: [],
    cart: [],
    clientCart: [],
    keyword: "",
    cash: 0,
    change: 0,
    receiptNo: null,
    receiptDate: null,
    notices: [],
    visible: [],

    navigateTo(route) {
      const _this = this;

      if (route === "/") {
        _this.currentPath = null;
        document.getElementById("app-route").innerHTML = "";
      } else {
        const path = `screens/${route}.html`;
        _this.currentPath = path;

        fetch(path)
          .then((response) => response.text())
          .then((html) => {
            document.getElementById("app-route").innerHTML = html;
          })
          .catch((error) =>
            console.error("Erreur de chargement du fichier HTML", error)
          );
      }
    },

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

    // PRODUCTS //
    loadProducts() {
      const _this = this;
      _this.products = DB.retrieveData("products");
      _this.loadClients();

      // console.log("product", JSON.parse(db.exportData("Products")).rows);
    },

    searchProducts() {
      const rg = this.searchKeyword
        ? new RegExp(this.searchKeyword, "gi")
        : null;
      return this.products.filter((p) => !rg || p.name.match(rg));
    },

    addProduct() {
      const _this = this;
      var productName = document.getElementById("productName").value;
      var productPrice = document.getElementById("productPrice").value;
      var productQte = document.getElementById("productQte").value;
      var productUnt = document.getElementById("productUnt").value;
      var productPriceDemi =
        document.getElementById("productPriceDemi").checked;
      var productImage = document.getElementById("productImage").files[0];

      if (productName == "") {
        this.add({ type: "error", text: "Entrer le nom du produit." });
        return;
      }
      if (productPrice == "") {
        this.add({ type: "error", text: "Entrer le prix du produit." });
        return;
      }
      if (productImage == null) {
        this.add({ type: "error", text: "Selectionner une image." });
        return;
      }
      var reader = new FileReader();
      reader.onloadend = function () {
        const product = {
          name: productName,
          price: productPrice,
          PriceDemi: productPriceDemi,
          Quantité: productQte,
          Unité: productUnt,
          Active: true,
          image: reader.result,
          Date: new Date().toISOString(),
        };

        DB.storeData("products", product);
        console.log("products", product);
        _this.add({ type: "success", text: "Produit ajouté" });

        document.getElementById("productName").value = null;
        document.getElementById("productPrice").value = null;
        document.getElementById("productPriceDemi").value = null;
        document.getElementById("productQte").value = null;
        document.getElementById("productImage").value = null;
        _this.loadProducts();
      };
      reader.readAsDataURL(productImage);
    },

    editProduct(product) {
      this.productEdit = [];
      this.productEdit.push({
        id: product.id,
        image: product.image,
        name: product.name,
        price: product.price,
        priceDemi: product.PriceDemi,
        qty: product.Quantité,
        unite: product.Unité,
        active: product.Active,
        date: product.Date,
      });
    },

    saveEditProduct(id) {
      const _this = this;
      let productName = document.getElementById("productName").value;
      let productPrice = document.getElementById("productPrice").value;
      let productPriceDemi =
        document.getElementById("productPriceDemi").checked;
      let productQte = document.getElementById("productQte").value;
      let productUnt = document.getElementById("productUnt").value;
      let productImage = document.getElementById("productImage").files[0];

      if (productImage) {
        var reader = new FileReader();
        reader.onloadend = function () {
          productImage = reader.result;
        };
        reader.readAsDataURL(productImage);
      }

      const produit = {
        name: productName,
        price: productPrice,
        PriceDemi: productPriceDemi,
        quantité: productQte,
        unité: productUnt,
        image: productImage,
      };

      DB.updateData("products", id, produit);

      _this.add({
        type: "success",
        text: productName + " modifier avec succes.",
      });
    },

    hideProduct(product) {
      const _this = this;

      if (product.active)
        if (!confirm("Voullez vous masquer " + product.name)) return;
      DB.updateData("products", id, { active: !product.active });
      _this.loadProducts();
    },

    deleteProduct(id, name) {
      const _this = this;
      if (!confirm("Voullez vous vraiment supprimer " + name)) return;
      DB.deleteData("products", id);
      _this.loadProducts();
      _this.productEdit = [];
    },

    // CLIENTS //
    loadClients() {
      const _this = this;
      _this.clients = DB.retrieveData("clients");

      // console.log("clients", _this.clients);
    },

    // CARTS //
    filteredProducts() {
      const rg = this.keyword ? new RegExp(this.keyword, "gi") : null;
      return this.products.filter((p) => !rg || p.name.match(rg));
    },

    addClientCart(client) {
      this.beep();
      this.clientCart = [];
      this.clientCart.push({
        Id: client.id,
        Prenom: client.Prenom,
        Nom: client.Nom,
        Telephone: client.Telephone,
        Adresse: client.Adresse,
      });
    },

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
          productId: product.id,
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
          productId: product.id,
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
      return this.cart.findIndex((p) => p.productId === product.id);
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
      return this.cart.reduce(
        (total, item) => total + item.qty * item.price,
        0
      );
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
      const formatter = new Intl.DateTimeFormat("id", {
        dateStyle: "short",
        timeStyle: "short",
      });
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
      //   dbproducts.update({ id: item.productId }, { $set: { Vente: 1 } }, {}, function (err, numReplaced) {
      //     //console.log(err)
      //     if (numReplaced == 1) {
      //       dbproducts.loadDatabase();
      //     }
      //   });
      // });

      DB.storeData("sales", {
        Date: moment(this.time).format("Do MMM YYYY / HH:mm"),
        No: this.receiptNo,
        Total: this.getTotalPrice(),
        Accompte: this.cash,
        Netapayer: this.change,
        products: this.cart,
        Client: this.clientCart,
      });
    },

    clear() {
      this.clearSound();
      this.cash = 0;
      this.cart = [];
      this.receiptNo = null;
      this.receiptDate = null;
      this.updateChange();
    },

    // APP //
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
