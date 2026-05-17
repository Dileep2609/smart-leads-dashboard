# API Documentation

## Base URL

http://localhost:5000/api

---

# Authentication APIs

## Register User

### Endpoint

POST /auth/register

### Request Body

{
"name": "Dileep",
"email": "dileep@gmail.com",
"password": "123456"
}

### Response

{
"success": true,
"token": "jwt_token"
}

---

## Login User

### Endpoint

POST /auth/login

### Request Body

{
"email": "dileep@gmail.com",
"password": "123456"
}

### Response

{
"success": true,
"token": "jwt_token"
}

---

# Leads APIs

## Get All Leads

### Endpoint

GET /leads

### Query Parameters

| Parameter | Description          |
| --------- | -------------------- |
| page      | Pagination           |
| search    | Search by name/email |
| status    | Filter by status     |

### Example

GET /leads?page=1&search=rahul&status=Qualified

---

## Create Lead

### Endpoint

POST /leads

### Request Body

{
"name": "Rahul",
"email": "rahul@gmail.com",
"status": "New",
"source": "Website"
}

---

## Update Lead

### Endpoint

PUT /leads/:id

---

## Delete Lead

### Endpoint

DELETE /leads/:id

---

# Authentication

Protected APIs require:

Authorization: Bearer token

---

# Status Values

- New
- Contacted
- Qualified
- Lost

---

# Source Values

- Website
- Instagram
- Referral
