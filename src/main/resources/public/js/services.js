/***********************************************************************************
 * App Services. This contains the logic of the application organised in modules/objects. *
 ***********************************************************************************/

myApp.services = {

  /*
    Sales Service
  */

  sales: {
    create: function(sale) {
      var saleListItem = ons.createElement(
        '<ons-list-item tappable>' +
          '<label class="left">' +
          sale.id +
          '</label>' +
          '<div class="center">' +
          sale.totalAmountFmt +
          '</div>' +
          '<div class="right">' +
          sale.salesTime +
          '</div>' +
        '</ons-list-item>'
      );

      // Store data within the element.
      saleListItem.data = sale;

      var salesList = document.querySelector('#sales-list');
      salesList.insertBefore(saleListItem);

      // Add functionality to push 'sales_details.html' page with the current element as a parameter.
      salesList.onclick = function() {
        document.querySelector('#myNavigator')
          .pushPage('html/sale_details.html',
            {
              animation: 'lift',
              data: {
                element: saleListItem
              }
            }
          );
      };

    }
  },

   products: {
      create: function(product) {
        var productListItem = ons.createElement(
            '<ons-list-item tappable>' +
              '<label class="left">' +
              product.id +
              '</label>' +
              '<div class="center">' +
              product.name +
              '</div>' +
              '<div class="right">' +
               product.quantity +
              '</div>' +
              '<div class="right">' +
              product.price +
              '</div>' +
            '</ons-list-item>'
        );

        // Store data within the element.
        productListItem.data = product;

        var productsList = document.querySelector('#product-list');
        productsList.insertBefore(productListItem);

        // Add functionality to push 'sales_details.html' page with the current element as a parameter.
        productsList.onclick = function() {
        document.querySelector('#myNavigator')
          .pushPage('html/product_details.html',
            {
              animation: 'lift',
              data: {
                element: productListItem
              }
            });
        };
      },

      getList: async function() {
        var opts = {
          method: 'GET',
          headers: {}
        };
        const response = await fetch('/products', opts);
        return response.json();
     },

     search: function(input, maxResult=5) {
       input = input.toLowerCase();
       var products = [];
       var _products = myApp.repository.products;
       for(var i=0; i< _products.length && maxResult > 0; ++i) {
        var product = _products[i];
        if(product.id == input || product.name.toLowerCase().includes(input) || product.description.toLowerCase().includes(input)){
          products.push(product);
          --maxResult;
        }
       }
       return products;
     }

    },
  /////////////////
  // Task Service //
  /////////////////
  tasks: {

    // Creates a new task and attaches it to the pending task list.
    create: function(data) {
      // Task item template.
      var taskItem = ons.createElement(
        '<ons-list-item tappable category="' + myApp.services.categories.parseId(data.category)+ '">' +
          '<label class="left">' +
           '<ons-checkbox></ons-checkbox>' +
          '</label>' +
          '<div class="center">' +
            data.title +
          '</div>' +
          '<div class="right">' +
            '<ons-icon style="color: grey; padding-left: 4px" icon="ion-ios-trash-outline, material:md-delete"></ons-icon>' +
          '</div>' +
        '</ons-list-item>'
      );

      // Store data within the element.
      taskItem.data = data;

      // Add 'completion' functionality when the checkbox changes.
      taskItem.data.onCheckboxChange = function(event) {
        myApp.services.animators.swipe(taskItem, function() {
          var listId = (taskItem.parentElement.id === 'pending-list' && event.target.checked) ? '#completed-list' : '#pending-list';
          document.querySelector(listId).appendChild(taskItem);
        });
      };

      taskItem.addEventListener('change', taskItem.data.onCheckboxChange);

      // Add button functionality to remove a task.
      taskItem.querySelector('.right').onclick = function() {
        myApp.services.tasks.remove(taskItem);
      };

      // Add functionality to push 'details_task.html' page with the current element as a parameter.
      taskItem.querySelector('.center').onclick = function() {
        document.querySelector('#myNavigator')
          .pushPage('html/details_task.html',
            {
              animation: 'lift',
              data: {
                element: taskItem
              }
            }
          );
      };

      // Check if it's necessary to create new categories for this item.
      myApp.services.categories.updateAdd(taskItem.data.category);

      // Add the highlight if necessary.
      if (taskItem.data.highlight) {
        taskItem.classList.add('highlight');
      }

      // Insert urgent tasks at the top and non urgent tasks at the bottom.
      var pendingList = document.querySelector('#pending-list');
      pendingList.insertBefore(taskItem, taskItem.data.urgent ? pendingList.firstChild : null);
    },

    // Modifies the inner data and current view of an existing task.
    update: function(taskItem, data) {
      if (data.title !== taskItem.data.title) {
        // Update title view.
        taskItem.querySelector('.center').innerHTML = data.title;
      }

      if (data.category !== taskItem.data.category) {
        // Modify the item before updating categories.
        taskItem.setAttribute('category', myApp.services.categories.parseId(data.category));
        // Check if it's necessary to create new categories.
        myApp.services.categories.updateAdd(data.category);
        // Check if it's necessary to remove empty categories.
        myApp.services.categories.updateRemove(taskItem.data.category);

      }

      // Add or remove the highlight.
      taskItem.classList[data.highlight ? 'add' : 'remove']('highlight');

      // Store the new data within the element.
      taskItem.data = data;
    },

    // Deletes a task item and its listeners.
    remove: function(taskItem) {
      taskItem.removeEventListener('change', taskItem.data.onCheckboxChange);

      myApp.services.animators.remove(taskItem, function() {
        // Remove the item before updating the categories.
        taskItem.remove();
        // Check if the category has no items and remove it in that case.
        myApp.services.categories.updateRemove(taskItem.data.category);
      });
    }
  },

  /////////////////////
  // Category Service //
  ////////////////////
  categories: {

    // Creates a new category and attaches it to the custom category list.
    create: function(categoryLabel) {
      var categoryId = myApp.services.categories.parseId(categoryLabel);

      // Category item template.
      var categoryItem = ons.createElement(
        '<ons-list-item tappable category-id="' + categoryId + '">' +
          '<div class="left">' +
            '<ons-radio name="categoryGroup" input-id="radio-'  + categoryId + '"></ons-radio>' +
          '</div>' +
          '<label class="center" for="radio-' + categoryId + '">' +
            (categoryLabel || 'No category') +
          '</label>' +
        '</ons-list-item>'
      );

      // Adds filtering functionality to this category item.
      myApp.services.categories.bindOnCheckboxChange(categoryItem);

      // Attach the new category to the corresponding list.
      document.querySelector('#custom-category-list').appendChild(categoryItem);
    },

    // On task creation/update, updates the category list adding new categories if needed.
    updateAdd: function(categoryLabel) {
      var categoryId = myApp.services.categories.parseId(categoryLabel);
      var categoryItem = document.querySelector('#menuPage ons-list-item[category-id="' + categoryId + '"]');

      if (!categoryItem) {
        // If the category doesn't exist already, create it.
        myApp.services.categories.create(categoryLabel);
      }
    },

    // On task deletion/update, updates the category list removing categories without tasks if needed.
    updateRemove: function(categoryLabel) {
      var categoryId = myApp.services.categories.parseId(categoryLabel);
      var categoryItem = document.querySelector('#tabbarPage ons-list-item[category="' + categoryId + '"]');

      if (!categoryItem) {
        // If there are no tasks under this category, remove it.
        myApp.services.categories.remove(document.querySelector('#custom-category-list ons-list-item[category-id="' + categoryId + '"]'));
      }
    },

    // Deletes a category item and its listeners.
    remove: function(categoryItem) {
      if (categoryItem) {
        // Remove listeners and the item itself.
        categoryItem.removeEventListener('change', categoryItem.updateCategoryView);
        categoryItem.remove();
      }
    },

    // Adds filtering functionality to a category item.
    bindOnCheckboxChange: function(categoryItem) {
      var categoryId = categoryItem.getAttribute('category-id');
      var allItems = categoryId === null;

      categoryItem.updateCategoryView = function() {
        var query = '[category="' + (categoryId || '') + '"]';

        var taskItems = document.querySelectorAll('#tabbarPage ons-list-item');
        for (var i = 0; i < taskItems.length; i++) {
          taskItems[i].style.display = (allItems || taskItems[i].getAttribute('category') === categoryId) ? '' : 'none';
        }
      };

      categoryItem.addEventListener('change', categoryItem.updateCategoryView);
    },

    // Transforms a category name into a valid id.
    parseId: function(categoryLabel) {
      return categoryLabel ? categoryLabel.replace(/\s\s+/g, ' ').toLowerCase() : '';
    }
  },

  //////////////////////
  // Animation Service //
  /////////////////////
  animators: {

    // Swipe animation for task completion.
    swipe: function(listItem, callback) {
      var animation = (listItem.parentElement.id === 'pending-list') ? 'animation-swipe-right' : 'animation-swipe-left';
      listItem.classList.add('hide-children');
      listItem.classList.add(animation);

      setTimeout(function() {
        listItem.classList.remove(animation);
        listItem.classList.remove('hide-children');
        callback();
      }, 950);
    },

    // Remove animation for task deletion.
    remove: function(listItem, callback) {
      listItem.classList.add('animation-remove');
      listItem.classList.add('hide-children');

      setTimeout(function() {
        callback();
      }, 750);
    }
  },

  getSalesList: async function() {
    var opts = {
      method: 'GET',      
      headers: {}
    };
    const response = await fetch('/sales', opts);
    return response.json();
  },

  util: {
    formatAmount: function(amount) {
      var amount = parseFloat(amount);
      return amount.toFixed(2);
    },

    show: function(element) {
      element.style.display = "block";
    },
    
    hide: function(element) {
      element.style.display = "none";
    },

    // Product related Utilities
    createProductListItem: function(product) {
      var productListItem = ons.createElement(
        '<ons-list-item tappable>' +
          '<label class="left">' +
          product.id +
          '</label>' +
          '<div class="center">' +
          product.name +
          '</div>' +
          '<div class="right">' +
          product.quantity +
          '</div>' +
          '<div class="right">' +
          product.price +
          '</div>' +
        '</ons-list-item>'
      );
      // Store data within the element.
      productListItem.data = product;

      return productListItem;
    }
  }
};
