# 🎯 QUICK ANSWER - WHAT TO WRITE

## ❌ WRONG - What you might think:

```json
{
  "productId": "6787373b479017d32807c71bd",
  "quantity": 0,
  "userId": "string"
}
```

---

## ✅ CORRECT - What to actually write:

```json
{
  "productId": "6787373b479017d32807c71bd",
  "quantity": 2
}
```

---

## 📝 EXPLANATION

### **productId** = The product's ID (copy from GET /products response)

### **quantity** = Number to add (any number like 1, 2, 5, etc.)

### **userId** = Optional (can skip it, it defaults to "guest")

---

## 🔴 WHAT NOT TO DO

❌ Don't write quantity as 0 (won't add anything)  
❌ Don't leave productId empty  
❌ Don't use invalid product ID  
❌ Don't write strings for quantity (must be number)

---

## 🟢 WHAT TO DO

✅ Get product ID from GET /products first  
✅ Write quantity as a number (1, 2, 3, etc.)  
✅ Keep it simple - just productId and quantity  
✅ Click Execute to test

---

## 📋 THREE SIMPLE EXAMPLES YOU CAN USE

### Example 1:

```json
{
  "productId": "6787373b479017d32807c71bd",
  "quantity": 1
}
```

### Example 2:

```json
{
  "productId": "6787373b479017d32807c71bd",
  "quantity": 2
}
```

### Example 3:

```json
{
  "productId": "6787373b479017d32807c71bd",
  "quantity": 5
}
```

---

## 🎯 COPY-PASTE READY

Just copy and paste this, then click Execute:

```json
{
  "productId": "6787373b479017d32807c71bd",
  "quantity": 2
}
```

---

**That's it! You're done! 🚀**
