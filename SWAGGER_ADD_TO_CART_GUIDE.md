# 📝 WHAT TO WRITE IN SWAGGER FOR ADD TO CART

## You're At This Screen:

```
POST /api/cart - Add product to cart
Request body required
```

---

## ✅ WHAT TO WRITE IN THE REQUEST BODY

Replace the current content with this:

```json
{
  "productId": "6787373b479017d32807c71bd",
  "quantity": 2
}
```

### Explanation:

- **productId:** The product ID (you can get from GET /products endpoint)
- **quantity:** How many items to add (can be any number: 1, 2, 5, etc.)

---

## 🔍 HOW TO GET A REAL PRODUCT ID

### Step 1: Go to GET /products endpoint

```
Scroll up to find: GET /products
Click on it
Click "Try it out"
Click "Execute"
```

### Step 2: Copy a Product ID

From the response, you'll see:

```json
{
  "data": [
    {
      "_id": "6787373b479017d32807c71bd",
      "name": "Product Name",
      ...
    }
  ]
}
```

**Copy the \_id value** (the long string like `6787373b479017d32807c71bd`)

### Step 3: Go back to POST /api/cart

Scroll back down to **POST /api/cart**

### Step 4: Paste the ID

In the Request body, replace the productId value:

```json
{
  "productId": "PASTE_THE_ID_YOU_COPIED_HERE",
  "quantity": 2
}
```

---

## 📝 EXAMPLE FORMATS

### Format 1: Add 1 item

```json
{
  "productId": "6787373b479017d32807c71bd",
  "quantity": 1
}
```

### Format 2: Add 2 items

```json
{
  "productId": "6787373b479017d32807c71bd",
  "quantity": 2
}
```

### Format 3: Add 5 items

```json
{
  "productId": "6787373b479017d32807c71bd",
  "quantity": 5
}
```

---

## ✨ WHAT EACH FIELD MEANS

| Field         | Meaning              | Example                     |
| ------------- | -------------------- | --------------------------- |
| **productId** | Which product to add | "6787373b479017d32807c71bd" |
| **quantity**  | How many to add      | 2                           |

---

## 🎯 STEP-BY-STEP PROCESS

### Step 1: Get Product ID

1. Scroll up to **GET /products**
2. Click it → Try it out → Execute
3. Copy a **\_id** value from response

### Step 2: Go to Add to Cart

1. Scroll down to **POST /api/cart**
2. Click it
3. You should see "Try it out" button

### Step 3: Enter Request Body

1. Click "Try it out" if not already there
2. You'll see a text box with the request body
3. Clear it and paste:

```json
{
  "productId": "[PASTE_ID_HERE]",
  "quantity": 2
}
```

### Step 4: Execute

1. Replace `[PASTE_ID_HERE]` with actual ID
2. Click **"Execute"** button
3. Wait for response

### Step 5: Check Response

Should see:

```json
{
  "success": true,
  "message": "Product added to cart (stub)"
}
```

---

## 🆘 IF YOU'RE CONFUSED

### What is productId?

It's the unique identifier for a product. Like a barcode for database records.

### Where do I get it?

From the GET /products endpoint response. It's the `_id` field.

### What about userId?

You can leave it out OR add it like this:

```json
{
  "productId": "6787373b479017d32807c71bd",
  "quantity": 2,
  "userId": "user123"
}
```

### What if I don't have a product ID?

1. Run GET /products first
2. Copy any \_id from the response
3. Use that

---

## 💡 QUICK TEMPLATE TO COPY-PASTE

Copy this and replace the productId with your actual ID:

```json
{
  "productId": "6787373b479017d32807c71bd",
  "quantity": 2
}
```

---

## ✅ WHAT TO DO NOW

1. **Clear** the current text in the request body box
2. **Paste** this template:

```json
{
  "productId": "6787373b479017d32807c71bd",
  "quantity": 2
}
```

3. **Click Execute**
4. **See the success response!**

---

## 📸 VISUAL GUIDE

```
┌─────────────────────────────────┐
│ Request body (required)         │
├─────────────────────────────────┤
│ {                               │
│   "productId": "YOUR_ID_HERE",  │  ← Replace this
│   "quantity": 2                 │  ← Can change this
│ }                               │
└─────────────────────────────────┘
        ↓
   Click Execute
        ↓
┌──────────────────────────┐
│ Response:                │
│ {                        │
│   "success": true,       │ ✅ Success!
│   "message": "..."       │
│ }                        │
└──────────────────────────┘
```

---

**Now you know exactly what to write! Go test it! 🚀**
