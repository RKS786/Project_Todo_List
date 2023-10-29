// Define categories and their corresponding CSS classes
const categoryClasses = {
    'Work': 'work',
    'Personal': 'personal',
    'Cleaning': 'cleaning',
    'Others': 'others'
  };
  
  // Function to apply category-specific styling
  function applyCategoryStyles() {
    const categories = document.getElementsByClassName('catesec');
  
    for (let category of categories) {
      const categoryName = category.innerHTML.trim();
      const cssClass = categoryClasses[categoryName];
  
      if (cssClass) {
        category.classList.add(cssClass);
        category.classList.add('commonClass');
      }
    }
  }
  
  // Execute this code when the document is ready
$(document).ready(function() {
    applyCategoryStyles();
  });



  // Function to toggle text decoration when a checkbox is checked
  function checkedOrNot() {
    const checkboxes = document.querySelectorAll('.delechack');
    const descriptions = document.querySelectorAll('.dispdsc');
    const dueDates = document.querySelectorAll('.dueDate');
  
    for (let i = 0; i < checkboxes.length; i++) {
      const checkbox = checkboxes[i];
      const dueDate = dueDates[i].innerHTML;
      const uid = checkbox.getAttribute('uid');
  
      if (checkbox.checked) {
        document.getElementById(uid).style.textDecoration = 'line-through';
        document.getElementById(uid + dueDate).style.textDecoration = 'line-through';
      } else {
        document.getElementById(uid).style.textDecoration = 'none';
        document.getElementById(uid + dueDate).style.textDecoration = 'none';
      }
    }
  }
  
    const deleteButton = document.getElementById('deleteButton');
    // Handle delete Button onClick event
    deleteButton.addEventListener('click', function() {
      const checkedCheckboxes = document.querySelectorAll('.delechack:checked');
      const checkedIds = Array.from(checkedCheckboxes, checkbox => checkbox.getAttribute('uid'));
  
      if (checkedIds.length === 0) {
        swal("No item is checked!!", "Please select items to remove.", "error");
        return;
      }
  
      $.ajax({
        type: 'post',
        url: '/delete_todo/?id=' + checkedIds.join(','),
        success: function() {
          swal("Item is deleted", "Click OK to go back Home", "success")
            .then(() => {
              window.location = '/';
            });
        },
        error: function(err) {
          console.log(err);
        }
      });
    });

  