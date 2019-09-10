/***********************************************************************
 * App Controllers. These controllers will be called on page initialization. *
 ***********************************************************************/

myApp.controllers = {


  /*
    Login Controller
  */

  loginPage: function(page) {
    Array.prototype.forEach.call(page.querySelectorAll('[component="button/login"]'), function(element) {
      element.onclick = function() {
        document.querySelector('#myNavigator').pushPage('home.html');
      };

      element.show && element.show(); // Fix ons-fab in Safari.
    });
  },

  salesListPage: function(page) {
    myApp.services.getSalesList().then(function(sales){
      sales.forEach(function(sale) {
        var date = new Date(sale.timeCreated);
        sale.salesTime = date.toLocaleTimeString();
        sale.totalAmountFmt = myApp.services.util.formatAmount(sale.totalAmount);
        sale.totalTaxFmt = myApp.services.util.formatAmount(sale.totalTax);
        sale.salesAmountFmt = myApp.services.util.formatAmount(sale.salesAmount);
        myApp.services.sales.create(sale);
    });
    })
  },

  productListPage: function(page) {
    myApp.repository.products = [];
    myApp.services.products.getList().then(function(products){
      products.forEach(function(product) {
          product.priceFmt = myApp.services.util.formatAmount(product.price);
          myApp.repository.products.push(product);
          myApp.services.products.create(product);
    });
    })
  },

  salesDetailsPage: function(page) {
    // Get the element passed as argument to pushPage.
    var salesItem = page.data.element;

    // Fill the view with the stored data.
    page.querySelector('#id').innerHTML = salesItem.data.id;
    page.querySelector('#totalAmount').innerHTML = salesItem.data.totalAmountFmt;
    page.querySelector('#totalSales').innerHTML = salesItem.data.salesAmountFmt;
    page.querySelector('#totalTax').innerHTML = salesItem.data.totalTaxFmt;

    var productList = page.querySelector('#productList');

    salesItem.data.productSale.forEach(function(productSales){
      var productListItem = ons.createElement(
        '<ons-list-item tappable>' +
          '<label class="left">' +
          productSales.id +
          '</label>' +
          '<label class="center">' +
          productSales.product.name +
          '</label>' +
          '<div class="right">' +
          productSales.saleQuantity +
          '</div>' +
          '<div class="right">' +
          productSales.salePrice +
          '</div>' +
        '</ons-list-item>'
      );
  
      // Store data within the element.
      productListItem.data = productSales;
      productList.insertBefore(productListItem);
    });
  },

  productDetailsPage: function(page) {
      // Get the element passed as argument to pushPage.
      var productItem = page.data.element;

      // Fill the view with the stored data.
      page.querySelector('#id').innerHTML = productItem.data.id;
      page.querySelector('#name').innerHTML = productItem.data.name;
      page.querySelector('#quantity').innerHTML = productItem.data.quantity;
      page.querySelector('#price').innerHTML = productItem.data.price;
    },

  //////////////////////////
  // Tabbar Page Controller //
  //////////////////////////
  tabbarPage: function(page) {
    // Set button functionality to open/close the menu.
    page.querySelector('[component="button/menu"]').onclick = function() {
      document.querySelector('#mySplitter').left.toggle();
    };

    // Set button functionality to push 'new_task.html' page.
    Array.prototype.forEach.call(page.querySelectorAll('[component="button/new-sale"]'), function(element) {
      element.onclick = function() {
        document.querySelector('#myNavigator').pushPage('html/create_sales.html');
      };

      element.show && element.show(); // Fix ons-fab in Safari.
    });

    // Change tabbar animation depending on platform.
    page.querySelector('#myTabbar').setAttribute('animation', ons.platform.isAndroid() ? 'slide' : 'none');
  },

  ////////////////////////
  // Menu Page Controller //
  ////////////////////////
  menuPage: function(page) {
    // Set functionality for 'No Category' and 'All' default categories respectively.
    myApp.services.categories.bindOnCheckboxChange(page.querySelector('#default-category-list ons-list-item[category-id=""]'));
    myApp.services.categories.bindOnCheckboxChange(page.querySelector('#default-category-list ons-list-item:not([category-id])'));

    // Change splitter animation depending on platform.
    document.querySelector('#mySplitter').left.setAttribute('animation', ons.platform.isAndroid() ? 'overlay' : 'reveal');
  },

  createSalesPage: function(page) {

    var productSearchListElement = page.querySelector("#productSearchList");
    var productsListElement = page.querySelector("#productsList");
    var totalAmountInput = page.querySelector("#totalAmount");
    
    var selectedProducts = [];

    var refreshSelectedProductList = function() {
      productsListElement.innerHTML = '';
      var total = 0;
      selectedProducts.forEach(function(product){
        var listItem = myApp.services.util.createProductListItem(product);
        productsListElement.insertBefore(listItem);
        total += product.price;
      });
      totalAmountInput.value = myApp.services.util.formatAmount(total);
    };

    
    Array.prototype.forEach.call(page.querySelectorAll('[component="button/create-sales"]'), function(element) {
      element.onclick = function() {
        alert("not implemented yet");
      };
    });

    page.querySelector("#query").onkeyup = function(target){
      var products = myApp.services.products.search(target.srcElement.value);
      productSearchListElement.innerHTML = '';

      if(products.length > 0) {
        myApp.services.util.show(productSearchListElement);
        products.forEach(function(product) {
          var listItem = myApp.services.util.createProductListItem(product);
          listItem.onclick = function(target) {
            selectedProducts.push(target.srcElement.parentElement.data);
            refreshSelectedProductList();
            
            productSearchListElement.innerHTML = '';
            myApp.services.util.hide(productSearchListElement);
          };
          productSearchListElement.insertBefore(listItem);
        }); 
      } else {
        myApp.services.util.hide(productSearchListElement);
      }
    };

    page.querySelector("#query").onblur = function(target){
      
      // Needed a delay as the list item onclick will not be triggred,
      // if we remove the element at the same time.
      setTimeout(function(){
        productSearchListElement.innerHTML = '';
        myApp.services.util.hide(productSearchListElement);
      }, 100);
    };
  },

  ////////////////////////////////
  // Details Task Page Controller //
  ///////////////////////////////
  detailsTaskPage: function(page) {
    // Get the element passed as argument to pushPage.
    var element = page.data.element;

    // Fill the view with the stored data.
    page.querySelector('#title-input').value = element.data.title;
    page.querySelector('#category-input').value = element.data.category;
    page.querySelector('#description-input').value = element.data.description;
    page.querySelector('#highlight-input').checked = element.data.highlight;
    page.querySelector('#urgent-input').checked = element.data.urgent;

    // Set button functionality to save an existing task.
    page.querySelector('[component="button/save-task"]').onclick = function() {
      var newTitle = page.querySelector('#title-input').value;

      if (newTitle) {
        // If input title is not empty, ask for confirmation before saving.
        ons.notification.confirm(
          {
            title: 'Save changes?',
            message: 'Previous data will be overwritten.',
            buttonLabels: ['Discard', 'Save']
          }
        ).then(function(buttonIndex) {
          if (buttonIndex === 1) {
            // If 'Save' button was pressed, overwrite the task.
            myApp.services.tasks.update(element,
              {
                title: newTitle,
                category: page.querySelector('#category-input').value,
                description: page.querySelector('#description-input').value,
                ugent: element.data.urgent,
                highlight: page.querySelector('#highlight-input').checked
              }
            );

            // Set selected category to 'All', refresh and pop page.
            document.querySelector('#default-category-list ons-list-item ons-radio').checked = true;
            document.querySelector('#default-category-list ons-list-item').updateCategoryView();
            document.querySelector('#myNavigator').popPage();
          }
        });

      } else {
        // Show alert if the input title is empty.
        ons.notification.alert('You must provide a task title.');
      }
    };
  }
};
