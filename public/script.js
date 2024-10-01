document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const filterSelect = document.getElementById("filter-select");
  const productList = document.getElementById("product-list");
  const productItems = productList.getElementsByClassName("product-item");

  // Search function
  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    filterProducts(searchTerm, filterSelect.value);
  });

  // Filter function
  filterSelect.addEventListener("change", function () {
    const searchTerm = searchInput.value.toLowerCase();
    filterProducts(searchTerm, filterSelect.value);
  });

  function filterProducts(searchTerm, category) {
    Array.from(productItems).forEach(function (item) {
      const productName = item.getAttribute("data-name").toLowerCase();
      const productCategory = item.getAttribute("data-category");

      const matchesSearch = productName.includes(searchTerm);
      const matchesCategory =
        category === "all" || productCategory === category;

      if (matchesSearch && matchesCategory) {
        item.style.display = ""; // Show product
      } else {
        item.style.display = "none"; // Hide product
      }
    });
  }
});
