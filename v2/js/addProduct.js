const Datastore = require('nedb')
db = {};
db.produits = new Datastore('../TPOS_data/db/Prduits.db');
db.produits.loadDatabase();


function addWindow() {
    const app = {
        addProduct(){
            const _this = this
            var productName = document.getElementById('productName').value;
            var productPrice = document.getElementById('productPrice').value;
            var productQte = document.getElementById('productQte').value;
            var productUnt = document.getElementById('productUnt').value;
            var productPriceDemi = document.getElementById('productPriceDemi').checked;
            var productImage = document.getElementById('productImage').files[0];
        
            if(productName == ""){
                alert('Entrer le nom du produit.')
                return
            }
            if(productPrice == ""){
                alert('Entrer le prix du produit.')
                return
            }
            if(productImage == null){
                alert('Selectionner une image.')
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
                alert('Produit ajouté')
                document.getElementById('productName').value = null;
                document.getElementById('productPrice').value = null;
                document.getElementById('productPriceDemi').value = null;
                document.getElementById('productQte').value = null;
                document.getElementById('productImage').value = null;
            }
            reader.readAsDataURL(productImage);
        },
    }
    return app;
}