
## Endpoints

### Customers

- **Create a new customer**
  - **URL:** `/customers`
  - **Method:** `POST`
  - **Request Body:**
    ```json
    {
      "name": "John Doe",
      "address": "123 Main St",
      "phoneNumber": "1234567890"
    }
    ```
  - **Response:**
    ```json
    {
      "customerID": 1,
      "name": "John Doe",
      "address": "123 Main St",
      "phoneNumber": "1234567890"
    }
    ```

- **Get all customers**
  - **URL:** `/customers`
  - **Method:** `GET`
  - **Response:**
    ```json
    [
      {
        "customerID": 1,
        "name": "John Doe",
        "address": "123 Main St",
        "phoneNumber": "1234567890"
      }
    ]
    ```

- **Get a single customer by ID**
  - **URL:** `/customers/:id`
  - **Method:** `GET`
  - **Response:**
    ```json
    {
      "customerID": 1,
      "name": "John Doe",
      "address": "123 Main St",
      "phoneNumber": "1234567890"
    }
    ```

- **Update a customer  IDby**
  - **URL:** `/customers/:id`
  - **Method:** `PUT`
  - **Request Body:**
    ```json
    {
      "name": "Jane Doe",
      "address": "456 Elm St",
      "phoneNumber": "0987654321"
    }
    ```
  - **Response:**
    ```json
    {
      "customerID": 1,
      "name": "Jane Doe",
      "address": "456 Elm St",
      "phoneNumber": "0987654321"
    }
    ```

- **Delete a customer by ID**
  - **URL:** `/customers/:id`
  - **Method:** `DELETE`
  - **Response:**
    ```json
    {
      "message": "Customer deleted successfully"
    }
    ```

### Service Providers

- **Create a new service provider**
  - **URL:** `/service-providers`
  - **Method:** `POST`
  - **Request Body:**
    ```json
    {
      "name": "AC Services",
      "address": "789 Pine St",
      "phoneNumber": "1122334455",
      "bankAccount": "bank123",
      "rating": 4.5,
      "category": "Air Conditioning",
      "distance": 5
    }
    ```
  - **Response:**
    ```json
    {
      "spID": 1,
      "name": "AC Services",
      "address": "789 Pine St",
      "phoneNumber": "1122334455",
      "bankAccount": "bank123",
      "rating": 4.5,
      "category": "Air Conditioning",
      "distance": 5
    }
    ```

- **Get all service providers**
  - **URL:** `/service-providers`
  - **Method:** `GET`
  - **Response:**
    ```json
    [
      {
        "spID": 1,
        "name": "AC Services",
        "address": "789 Pine St",
        "phoneNumber": "1122334455",
        "bankAccount": "bank123",
        "rating": 4.5,
        "category": "Air Conditioning",
        "distance": 5
      }
    ]
    ```

- **Get a single service provider by ID**
  - **URL:** `/service-providers/:id`
  - **Method:** `GET`
  - **Response:**
    ```json
    {
      "spID": 1,
      "name": "AC Services",
      "address": "789 Pine St",
      "phoneNumber": "1122334455",
      "bankAccount": "bank123",
      "rating": 4.5,
      "category": "Air Conditioning",
      "distance": 5
    }
    ```

- **Get all the service providers who provide the Service Type**
  - **URL:** `/service-providers/service-type/:type`
  - **Example:** `service-providers/service-type/AC%20Repair`
  - **Method:** `GET`
  - **Response:**
    ```json
    {
      "spID": 1,
      "name": "Ah Beng AC Services",
      "address": "Paya Lebar Drive",
      "phoneNumber": "69696969",
      "bankAccount": "HUATTT",
      "rating": 5,
      "category": "Air Con",
      "distance": 5
    }
    ```

- **Update a service provider by ID**
  - **URL:** `/service-providers/:id`
  - **Method:** `PUT`
  - **Request Body:**
    ```json
    {
      "name": "AC Services Updated",
      "address": "789 Pine St",
      "phoneNumber": "1122334455",
      "bankAccount": "bank123",
      "rating": 4.8,
      "category": "Air Conditioning",
      "distance": 5
    }
    ```
  - **Response:**
    ```json
    {
      "spID": 1,
      "name": "AC Services Updated",
      "address": "789 Pine St",
      "phoneNumber": "1122334455",
      "bankAccount": "bank123",
      "rating": 4.8,
      "category": "Air Conditioning",
      "distance": 5
    }
    ```

- **Delete a service provider by ID**
  - **URL:** `/service-providers/:id`
  - **Method:** `DELETE`
  - **Response:**
    ```json
    {
      "message": "Service Provider deleted successfully"
    }
    ```

### Services

- **Create a new service**
  - **URL:** `/services`
  - **Method:** `POST`
  - **Request Body:**
    ```json
    {
      "extraRequirement": "Extra requirement",
      "description": "Service description",
      "finalPrice": 100,
      "date": "2025-03-20",
      "time": "10:00:00",
      "customerID": 1,
      "typeID": 1
    }
    ```
  - **Response:**
    ```json
    {
      "serviceID": 1,
      "extraRequirement": "Extra requirement",
      "description": "Service description",
      "finalPrice": 100,
      "date": "2025-03-20",
      "time": "10:00:00",
      "customerID": 1,
      "typeID": 1
    }
    ```

- **Get all services**
  - **URL:** `/services`
  - **Method:** `GET`
  - **Response:**
    ```json
    [
      {
        "serviceID": 1,
        "extraRequirement": "Extra requirement",
        "description": "Service description",
        "finalPrice": 100,
        "date": "2025-03-20",
        "time": "10:00:00",
        "customerID": 1,
        "typeID": 1
      }
    ]
    ```

- **Get a single service by ID**
  - **URL:** `/services/:id`
  - **Method:** `GET`
  - **Response:**
    ```json
    {
      "serviceID": 1,
      "extraRequirement": "Extra requirement",
      "description": "Service description",
      "finalPrice": 100,
      "date": "2025-03-20",
      "time": "10:00:00",
      "customerID": 1,
      "typeID": 1
    }
    ```

- **Update a service by ID**
  - **URL:** `/services/:id`
  - **Method:** `PUT`
  - **Request Body:**
    ```json
    {
      "extraRequirement": "Updated requirement",
      "description": "Updated description",
      "finalPrice": 120,
      "date": "2025-03-21",
      "time": "11:00:00",
      "customerID": 1,
      "typeID": 1
    }
    ```
  - **Response:**
    ```json
    {
      "serviceID": 1,
      "extraRequirement": "Updated requirement",
      "description": "Updated description",
      "finalPrice": 120,
      "date": "2025-03-21",
      "time": "11:00:00",
      "customerID": 1,
      "typeID": 1
    }
    ```

- **Delete a service by ID**
  - **URL:** `/services/:id`
  - **Method:** `DELETE`
  - **Response:**
    ```json
    {
      "message": "Service deleted successfully"
    }
    ```

### Service Reviews

- **Create a new service review**
  - **URL:** `/service-reviews`
  - **Method:** `POST`
  - **Request Body:**
    ```json
    {
      "rating": 5,
      "comments": "Great service!",
      "serviceID": 1
    }
    ```
  - **Response:**
    ```json
    {
      "reviewID": 1,
      "rating": 5,
      "comments": "Great service!",
      "serviceID": 1
    }
    ```

- **Get all service reviews**
  - **URL:** `/service-reviews`
  - **Method:** `GET`
  - **Response:**
    ```json
    [
      {
        "reviewID": 1,
        "rating": 5,
        "comments": "Great service!",
        "serviceID": 1
      }
    ]
    ```

- **Get a single service review by ID**
  - **URL:** `/service-reviews/:id`
  - **Method:** `GET`
  - **Response:**
    ```json
    {
      "reviewID": 1,
      "rating": 5,
      "comments": "Great service!",
      "serviceID": 1
    }
    ```

- **Get all the Service Reviews of a Service Provider**
  - **URL:** `/service-reviews/service-provider/:spID`
  - **Method:** `GET`
  - **Response:**
    ```json
    {
        "reviewID": 2,
        "rating": 5,
        "comments": "Great service!",
        "serviceID": 1,
        "Service": {
            "typeID": 1
        }
    }
    ```

- **Update a service review by ID**
  - **URL:** `/service-reviews/:id`
  - **Method:** `PUT`
  - **Request Body:**
    ```json
    {
      "rating": 4,
      "comments": "Good service!",
      "serviceID": 1
    }
    ```
  - **Response:**
    ```json
    {
      "reviewID": 1,
      "rating": 4,
      "comments": "Good service!",
      "serviceID": 1
    }
    ```

- **Delete a service review by ID**
  - **URL:** `/service-reviews/:id`
  - **Method:** `DELETE`
  - **Response:**
    ```json
    {
      "message": "Service Review deleted successfully"
    }
    ```

### Payments

- **Create a new payment**
  - **URL:** `/payments`
  - **Method:** `POST`
  - **Request Body:**
    ```json
    {
      "paymentType": "Credit Card",
      "paymentDescription": "Visa ending in 1234",
      "paymentIsDefault": true,
      "customerID": 1
    }
    ```
  - **Response:**
    ```json
    {
      "paymentID": 1,
      "paymentType": "Credit Card",
      "paymentDescription": "Visa ending in 1234",
      "paymentIsDefault": true,
      "customerID": 1
    }
    ```

- **Get all payments**
  - **URL:** `/payments`
  - **Method:** `GET`
  - **Response:**
    ```json
    [
      {
        "paymentID": 1,
        "paymentType": "Credit Card",
        "paymentDescription": "Visa ending in 1234",
        "paymentIsDefault": true,
        "customerID": 1
      }
    ]
    ```

- **Get a single payment by ID**
  - **URL:** `/payments/:id`
  - **Method:** `GET`
  - **Response:**
    ```json
    {
      "paymentID": 1,
      "paymentType": "Credit Card",
      "paymentDescription": "Visa ending in 1234",
      "paymentIsDefault": true,
      "customerID": 1
    }
    ```

- **Update a payment by ID**
  - **URL:** `/payments/:id`
  - **Method:** `PUT`
  - **Request Body:**
    ```json
    {
      "paymentType": "Debit Card",
      "paymentDescription": "Mastercard ending in 5678",
      "paymentIsDefault": false,
      "customerID": 1
    }
    ```
  - **Response:**
    ```json
    {
      "paymentID": 1,
      "paymentType": "Debit Card",
      "paymentDescription": "Mastercard ending in 5678",
      "paymentIsDefault": false,
      "customerID": 1
    }
    ```

- **Delete a payment by ID**
  - **URL:** `/payments/:id`
  - **Method:** `DELETE`
  - **Response:**
    ```json
    {
      "message": "Payment deleted successfully"
    }
    ```

### Service Types

- **Create a new service type**
  - **URL:** `/service-types`
  - **Method:** `POST`
  - **Request Body:**
    ```json
    {
      "type": "Installation",
      "basePrice": 50,
      "consultPrice": 20,
      "spID": 1
    }
    ```
  - **Response:**
    ```json
    {
      "typeID": 1,
      "type": "Installation",
      "basePrice": 50,
      "consultPrice": 20,
      "spID": 1
    }
    ```

- **Get all service types**
  - **URL:** `/service-types`
  - **Method:** `GET`
  - **Response:**
    ```json
    [
      {
        "typeID": 1,
        "type": "Installation",
        "basePrice": 50,
        "consultPrice": 20,
        "spID": 1
      }
    ]
    ```

- **Get a single service type by ID**
  - **URL:** `/service-types/:id`
  - **Method:** `GET`
  - **Response:**
    ```json
    {
      "typeID": 1,
      "type": "Installation",
      "basePrice": 50,
      "consultPrice": 20,
      "spID": 1
    }
    ```

- **Update a service type by ID**
  - **URL:** `/service-types/:id`
  - **Method:** `PUT`
  - **Request Body:**
    ```json
    {
      "type": "Repair",
      "basePrice": 60,
      "consultPrice": 30,
      "spID": 1
    }
    ```
  - **Response:**
    ```json
    {
      "typeID": 1,
      "type": "Repair",
      "basePrice": 60,
      "consultPrice": 30,
      "spID": 1
    }
    ```

- **Delete a service type by ID**
  - **URL:** `/service-types/:id`
  - **Method:** `DELETE`
  - **Response:**
    ```json
    {
      "message": "Service Type deleted successfully"
    }
    ```

## Testing the Endpoints

You can use tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to test the API endpoints.
