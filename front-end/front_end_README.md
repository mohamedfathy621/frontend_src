
# Application Documentation

## Overview

This React-based Single Page Application (SPA) functions as a company portal with two primary layers—before and after login—and a consistent header that adjusts according to the authentication state. 

### Layers and Components:
1. **Header**: Common across both layers, containing:
   - Company logo
   - Search bar (available only after login)
   - Navigation icons (changing based on authentication state)
   
2. **Authentication Layer** (Before Login):
   - **Login View**: User can log into the system using the provided form.
   - **Registration View**: New users can create an account.
   - Each view has a form controlled by its own class and regular expression (regex) validation logic, found in the `assets` folder.

3. **Authenticated Layer** (After Login):
   - **Home Page (Product List)**: Displays a list of products with the option to order.
   - **Chart Page (Dashboard)**: Displays various metrics related to orders and products.
   - **JWT Authentication**: After successful login, a JWT token is issued for user session management.

---

## Core Functionality

### Header

- **Before Login**:
  - Displays two icons: **Log In** and **Register**.
  
- **After Login**:
  - Displays four icons: **Log Out**, **Home**, **Chart**, **Cart**.
  - **Search Bar**: Filters the list of medicines (visible only after login).

### Form Views (Before Authentication)
Both the **Login** and **Registration** views are implemented in the same component, but differ based on the props provided:
- Each form has an input class and regex validation logic.
- Forms are submitted after passing through basic validation before sending data to the database.
- Upon successful registration, the user is redirected to the login form. 
- Upon successful login, the user is redirected to the authenticated layer.

### JWT Authentication
- **Login**: Upon successful login, a JWT token is issued to manage the session.
- **Session Management**: On page load, the app checks if the session (JWT token) is valid:
  - If valid, the user is directed to the second layer (authenticated page).
  - If invalid, the user is sent to the first layer (authentication page).

### Second Layer (Authenticated Pages)
- **Home Page**: Displays a product list (medicines), with each product represented by a card containing:
  - Image URL, product name, price
  - "Place Order" button for adding items to the cart.
  - Users can increase the quantity, remove items, or view the cart.
  
- **Chart Page (Dashboard)**: Displays order-related data, such as:
  - Counter (orders by year, month, week, day)
  - User order statistics (number of orders per user)
  - Graph/chart display (selected chart type)
  - A selection menu to change the type of chart.

### React State Management

React hooks manage the following states:
1. **[page, setPage]**: Controls the current page (e.g., 'login', 'register').
2. **[refill_request, setRefill_request]**: Manages the order menu state.
3. **[total_price, setTotal]**: Holds the total price of products in the cart.
4. **[loggedin, setLogged]**: Tracks the authentication state of the user.
5. **[notification, setNotification]**: Displays notifications to the user.
6. **[products, setProducts]**: Holds the list of products fetched from the backend.
7. **[tempProducts, setTempProducts]**: Used for filtering products (search functionality).
8. **[eco, setEco]**: Holds chart data.
9. **[current_chart, setCurrentChart]**: Controls which chart type is displayed.
10. **[validations, setValidations]**: Manages form validation states.
11. **[cart, setCart]**: Toggles the cart display.
12. **[filt, setFilter]**: Manages search/filter functionality.
13. **[message, setMessage]**: Sends messages to users based on actions.

---

## Backend Request Methods

Backend request methods are located in `./assets/script_files/handle_requests.js`.

### API Endpoints
- **Base URL**: `http://127.0.0.1:8000/Rest/`

#### Functions:
1. **`register(body)`**:
   - Sends a `POST` request to `${base_url}register` with registration form data.
   - Returns a confirmation notification on success or an error message on failure.

2. **`login(body)`**:
   - Sends a `POST` request to `${base_url}login` with login form data.
   - On success, a JWT token is returned and stored in local storage for session management.
   - Displays a success message or an error message if authentication fails.

3. **`refresh_token(body)`**:
   - Sends a request to `${base_url}token/refresh` to validate the refresh token and retrieve a new access token.
   - Notifies the user if the session has expired.

4. **`get_medications(Token)`**:
   - Fetches the list of medications using a valid JWT token for authentication.
   - Returns the list of medicines from the backend.

5. **`send_order(Token, body)`**:
   - Sends a `POST` request to `${base_url}medications/order` with order data and the JWT token.
   - On success, confirms the order submission to the user.

6. **`get_chart(Token)`**:
   - Sends a request to `${base_url}medications/chart` to retrieve chart data.
   - Returns data used for the dashboard/chart page.

---

## Usage Notes

- **State Management**: React `useState` hooks are used to handle the application state, including page navigation, product data, cart, and authentication states.
- **Form Validation**: Each form (login/registration) uses its own validation logic, and upon successful submission, the user is either logged in or registered.
- **JWT Token Handling**: Tokens are securely stored in local storage to manage user sessions and are used for backend communication.

