+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// page 1 APIs

- list of all cities
  => http://localhost:1896/locations

- list of all restaurants
  => http://localhost:1896/restaurants

- list of all restaurants wrt city
  => http://localhost:1896/restaurants?stateId=2

- list of meals
  => http://localhost:1896/restaurants?mealId=3&stateId=1

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// page 2 APIs

- Restaurants on the basis of meal type
  =>http://localhost:1896/meals

* Restaurants with respect to mealtype and cuisine type
  =>http://localhost:1896/filter/1?cuisineId=1

* Restaurants with respect to mealtype and cost
  =>http://localhost:1896/filter/1?hCost=600&lCost=100&cuisineId=1

* Sorting on the basis of price
  => http://localhost:1896/filter/1?hCost=600&lCost=300&sort=-1

* Pagination
  =>http://localhost:1896/filter/1?cuisineId=2&skip=1&limit=2

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Page 3

- Details of the restaurants
  =>http://localhost:1896/details/651478cddac7b5cf4f876b63

- Menu wrt to restaurant
  =>http://localhost:1896/menu/1

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Page 4

- Details of selected Menu
  =>

- Place order
  =>

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Page 5

- View all order / with or without email
  => http://localhost:1896/orders?email=anchal@gmail.com

- Update order details
  =>

- Delete order
  =>
