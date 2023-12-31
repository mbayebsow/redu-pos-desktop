const Datastore = require('nedb')
db = {};
db.produits = new Datastore('../TPOS_data/db/Prduits.db');
db.produits.loadDatabase();


function products() {
  if(process.platform == 'darwin'){
    document.getElementById('AppHeader').style.paddingLeft = '80px'
  }else{
    document.getElementById('AppHeader').style.paddingRight = '80px'  
  }
  const app = {
    products: [],
    keyword: "",
    productEdit: [],
    loadProducts() {
      const _this = this
      db.produits.find({}, function (err, docs) {
        _this.products = docs
      })
    },
    filteredProducts() {
      const rg = this.keyword ? new RegExp(this.keyword, "gi") : null;
      return this.products.filter((p) => !rg || p.name.match(rg));
    },
    priceFormat(number) {
      return number ? `${this.numberFormat(number)} FCFA` : `0 FCFA`;
    },
    numberFormat(number) {
      return (number || "")
        .toString()
        .replace(/^0|\./g, "")
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    },
    findCartIndex(product) {
      return this.cart.findIndex((p) => p.productId === product._id);
    },

    
  }
  return app;
}