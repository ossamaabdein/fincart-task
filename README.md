This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Overview

This project is a shopping cart application built with [Next.js](https://nextjs.org). It allows users to browse products, add them to a cart, and view a summary of their cart. The application is designed with modern web development practices, including state management, API integration, and responsive design.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/ossamaabdein/fincart-task.git
   cd fincart-task
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## APIs Used

The application integrates with the following APIs:

- **Products API**: Fetches product data, including details like name, price, and images.
  - Endpoint: `https://api.escuelajs.co/api/v1/products`
  - Supports pagination, search, and category filtering.

- **Categories API**: Fetches a list of product categories.
  - Endpoint: `https://api.escuelajs.co/api/v1/categories`

## State Management

The application uses [Zustand](https://github.com/pmndrs/zustand) for state management. Zustand is a lightweight and flexible state management library that simplifies managing global state in React applications.

### Cart State

- The cart state is managed using a Zustand store (`cartStore.ts`).
- Actions include adding items to the cart, removing items, and updating quantities.
- The cart state is persisted in `localStorage` to ensure data is retained across page reloads.

## Persistent Data

The cart data is stored in the browser's `localStorage` to provide a seamless user experience. This ensures that the cart contents are preserved even if the user refreshes the page or closes and reopens the browser.

### Implementation Details

- On application load, the cart state is initialized from `localStorage`.
- Any updates to the cart (e.g., adding or removing items) are automatically synced to `localStorage`.

## Features

- **Product Listing**: Displays a list of products with pagination and infinite scroll.
- **Search and Filters**: Allows users to search for products and filter by category.
- **Cart Management**: Users can add products to the cart, view a summary, and remove items.
- **Responsive Design**: The application is fully responsive and works on all screen sizes.

## Folder Structure

- `app/`: Contains the main application pages and layout.
- `components/`: Reusable UI components, including cart and product-related components.
- `store/`: Zustand store for managing global state.
- `utils/`: Utility functions for API integration and other reusable logic.
