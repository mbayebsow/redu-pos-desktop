const Datastore = require('nedb')
const os = require("os");
const userHomeDir = os.homedir();

db = {};
db.produits = new Datastore(userHomeDir+'/TPOS_data/db/Produits.db');
db.produits.loadDatabase();


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
      addProductModal: false,
      products: [],
      productEdit: [],
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
      searchProducts() {
        const rg = this.searchKeyword ? new RegExp(this.searchKeyword, "gi") : null;
        return this.products.filter((p) => !rg || p.name.match(rg));
      },
      loadProducts() {
        const _this = this
        db.produits.find({}, function (err, docs) {
          _this.products = docs
        })
      },
      addProduct(){
        const _this = this
        var productName = document.getElementById('productName').value;
        var productPrice = document.getElementById('productPrice').value;
        var productQte = document.getElementById('productQte').value;
        var productUnt = document.getElementById('productUnt').value;
        var productPriceDemi = document.getElementById('productPriceDemi').checked;
        var productImage = document.getElementById('productImage').files[0];
    
        if(productName == ""){
          this.add({type: 'error', text: 'Entrer le nom du produit.'})
          return
        }
        if(productPrice == ""){
          this.add({type: 'error', text: 'Entrer le prix du produit.'})
            return
        }
        if(productImage == null){
          this.add({type: 'error', text: 'Selectionner une image.'})
            return
        }
        var reader = new FileReader();
        reader.onloadend = function() {
          db.produits.insert({
            'name': productName, 
            'price': productPrice, 
            'PriceDemi': productPriceDemi,
            'Quantité': productQte, 
            'Unité': productUnt, 
            'Vente': 0,
            'Active':true,
            'image': reader.result,
            'Date': new Date().toISOString(),
          });
          _this.add({type: 'success', text: 'Produit ajouté'})
          document.getElementById('productName').value = null;
          document.getElementById('productPrice').value = null;
          document.getElementById('productPriceDemi').value = null;
          document.getElementById('productQte').value = null;
          document.getElementById('productImage').value = null;
          _this.loadProducts()
        }
        reader.readAsDataURL(productImage);
      },
      editProduct(product){
        this.productEdit = []
        this.productEdit.push({
          id: product._id,
          image: product.image,
          name: product.name,
          price: product.price,
          PriceDemi: product.PriceDemi,
          qty: product.Quantité,
          Unite: product.Unité,
          Active: product.Active,
          Date: product.Date,
        });
      },
      saveEditProduct(id){
        const _this = this
        var productName = document.getElementById('productName').value;
        var productPrice = document.getElementById('productPrice').value;
        var productPriceDemi = document.getElementById('productPriceDemi').checked;
        var productQte = document.getElementById('productQte').value;
        var productUnt = document.getElementById('productUnt').value;
        var productImage = document.getElementById('productImage').files[0];
  
        if(productImage == null){
          db.produits.update( { _id: id }, {
            $set: { 
              name: productName,
              price: productPrice,
              PriceDemi: productPriceDemi,
              Quantité: productQte,
              Unité: productUnt,
            }},
            {},
            function (err, numReplaced) {
              if(numReplaced == 1){
                _this.add({type: 'success', text: productName+' modifier avec succes.'})
                _this.loadProducts()
                db.produits.loadDatabase();
              }
            }
          );
        }
        if(productImage){
          var reader = new FileReader();
          reader.onloadend = function() {
            db.produits.update( { _id: id }, {
              $set: { 
                name: productName,
                price: productPrice,
                PriceDemi: productPriceDemi,
                Quantité: productQte,
                Unité: productUnt,
                image: reader.result,
              }},
              {},
              function (err, numReplaced) {
                if(numReplaced == 1){
                  _this.add({type: 'success', text: productName+' modifier avec succes.'})
                  _this.loadProducts()
                  db.produits.loadDatabase();
                }
              }
            );
          }
          reader.readAsDataURL(productImage);
        }
      },
      hideProduct(product) {
        const _this = this
        if(product.Active == true){
          if (confirm('Voullez vous masquer '+product.name) == true) {
            db.produits.update( { _id: product.id }, 
              { $set: { Active: false} },
              {},
              function (err, numReplaced) {
                if(numReplaced == 1){
                  _this.loadProducts()
                  db.produits.loadDatabase();
                }
              }
            );
          } else { return }
        }
        if(product.Active == false){
          db.produits.update( { _id: product.id }, 
            { $set: { Active: true} },
            {},
            function (err, numReplaced) {
              if(numReplaced == 1){
                _this.loadProducts()
                db.produits.loadDatabase();
              }
            }
          );
        }
      },
      deleteProduct(id, name) {
        const _this = this
        if (confirm('Voullez vous vraiment supprimer '+name) == true) {
          db.produits.remove({ _id: id }, {}, function (err, numRemoved) {
            if(numRemoved ==1) {
              _this.loadProducts()
              _this.productEdit = []
            }
          });
        } else {
          return
        }
      },
      getProductImage(url){
        if (url.indexOf('base64') > -1) {
          return url;
        } else {
          return '../../'+url;
        }
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
    }
    return app;
}