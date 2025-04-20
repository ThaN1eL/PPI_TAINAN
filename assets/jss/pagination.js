// Standalone pagination system for PPI Tainan News
document.addEventListener('DOMContentLoaded', function() {
    const ITEMS_PER_PAGE = 8;
    
    const newsItems = document.querySelectorAll('.news-item');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const paginationContainer = document.querySelector('.pagination-buttons');
    
    let currentFilter = 'all';
    let currentPage = 1;
    
    function getFilteredItems() {
      return Array.from(newsItems).filter(item => {
        return currentFilter === 'all' || item.dataset.category === currentFilter;
      });
    }
    
    function getTotalPages() {
      const filteredItems = getFilteredItems();
      return Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    }
    
    function showPage(page) {
      // Update current page
      currentPage = page;
      
      // Get filtered items
      const filteredItems = getFilteredItems();
      
      // Hide all items first
      newsItems.forEach(item => {
        item.style.display = 'none';
      });
      
      // Calculate range for current page
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredItems.length);
      
      // Show only items for current page
      for (let i = startIndex; i < endIndex; i++) {
        filteredItems[i].style.display = 'block';
      }
      
      // Update pagination buttons
      updatePaginationButtons();
    }
    
    function updatePaginationButtons() {
      // Clear pagination container
      paginationContainer.innerHTML = '';
      
      // Get total pages
      const totalPages = getTotalPages();
      
      // show pagination if have more than one page
      if (totalPages <= 1) return;
      
      // Create prev button
      const prevButton = document.createElement('button');
      prevButton.classList.add('pagination-btn', 'prev-btn');
      prevButton.innerHTML = '&laquo; Prev';
      prevButton.disabled = currentPage === 1;
      prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
          showPage(currentPage - 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
      paginationContainer.appendChild(prevButton);
      
      // Create page buttons
      for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.classList.add('pagination-btn', 'page-btn');
        if (i === currentPage) {
          pageButton.classList.add('active');
        }
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
          showPage(i);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        paginationContainer.appendChild(pageButton);
      }
      
      // Create next button
      const nextButton = document.createElement('button');
      nextButton.classList.add('pagination-btn', 'next-btn');
      nextButton.innerHTML = 'Next &raquo;';
      nextButton.disabled = currentPage === totalPages;
      nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
          showPage(currentPage + 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
      paginationContainer.appendChild(nextButton);
    }
    
    function setFilter(filter) {
      currentFilter = filter;
      
      showPage(1);
      
      filterButtons.forEach(btn => {
        if (btn.dataset.filter === filter) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }
    
    function init() {
      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          setFilter(button.dataset.filter);
        });
      });
      
      
      showPage(1);
    }
    
    init();
  });