document.addEventListener("DOMContentLoaded", function() {
    const searchBar = document.getElementById('searchBar');
    const petSidebarList = document.getElementById('petSidebarList');

    searchBar.addEventListener('input', function() {
        const query = searchBar.value.toLowerCase();
        const petItems = petSidebarList.getElementsByTagName('li');

        Array.from(petItems).forEach(function(item) {
            const itemName = item.textContent.toLowerCase();
            if (itemName.includes(query)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
});
