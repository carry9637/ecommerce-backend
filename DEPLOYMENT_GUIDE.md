# 🚀 Deployment Guide - E-commerce Backend

**Your GitHub Repo:** https://github.com/carry9637/project

---

## **Step 1: Prepare MongoDB (Free Cloud Database)**

### 1.1 Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click **Sign up** (free M0 tier available)
3. Create account with email/password or GitHub login

### 1.2 Create a Free Cluster
1. In MongoDB Atlas dashboard, click **Create a Deployment**
2. Select **Free (M0)** tier
3. Choose region close to you
4. Click **Create**
5. Wait for cluster to be created (2-3 minutes)

### 1.3 Get Connection String
1. Click **Connect** button
2. Choose **Drivers** (not MongoDB Compass)
3. Select **Node.js** driver
4. Copy the connection string:
   ```
   mongodb+srv://username:password@cluster0.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace:
   - `username` with your MongoDB username
   - `password` with your MongoDB password
   - Add database name: `.../ecommerce_db?retryWrites...`
   
   **Final URL should look like:**
   ```
   mongodb+srv://myusername:mypassword@cluster0.mongodb.net/ecommerce_db?retryWrites=true&w=majority
   ```

6. Copy and save this URL (you'll need it for Render)

---

## **Step 2: Deploy Backend to Render.com**

### 2.1 Sign Up on Render
1. Go to https://render.com
2. Click **Sign up**
3. Use **GitHub** (recommended) — click **Continue with GitHub**
4. Authorize Render to access your GitHub account
5. Complete signup

### 2.2 Create Web Service
1. Log in to https://dashboard.render.com
2. Click **New** → **Web Service**
3. Under "GitHub", click **Connect Account** if needed
4. Search for and select **`carry9637/project`** repository
5. Fill in the form:

   | Field | Value |
   |-------|-------|
   | **Name** | `ecommerce-backend` |
   | **Environment** | `Node` |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |
   | **Instance Type** | `Free` |

6. Scroll down to **Environment**

### 2.3 Add Environment Variables
In the **Environment** section, add these variables:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | `mongodb+srv://username:password@cluster0.mongodb.net/ecommerce_db?retryWrites=true&w=majority` (from Step 1.3) |
| `NODE_ENV` | `production` |

### 2.4 Deploy
1. Click **Create Web Service**
2. Wait 2-3 minutes for build and deployment
3. You'll see a message: **"Your service is live"**
4. Copy your live URL (looks like `https://ecommerce-backend-xxxx.onrender.com`)

---

## **Step 3: Seed Database with Sample Products**

Once deployment is complete:

```bash
# Option A: Use curl to trigger seed (if you add a seed endpoint)
curl https://ecommerce-backend-xxxx.onrender.com/seed

# Option B: SSH into Render and run manually
# (Contact Render support or use dashboard CLI)
```

**Alternative:** Seed locally, then the data will be in MongoDB Atlas (which Render uses).

---

## **Step 4: Test Live Backend**

### 4.1 Test Swagger UI (API Documentation)
Open in browser:
```
https://ecommerce-backend-xxxx.onrender.com/api-docs
```

You should see the **Swagger UI** with all endpoints listed.

### 4.2 Test GET Products
In Swagger:
1. Click **GET /products**
2. Click **Try it out**
3. Click **Execute**
4. You should see products returned from the cloud database

### 4.3 Test POST Cart
In Swagger:
1. Click **POST /api/cart**
2. Click **Try it out**
3. Fill in request body:
   ```json
   {
     "productId": "COPY_PRODUCT_ID_FROM_STEP_4.2",
     "quantity": 2,
     "userId": "test-user"
   }
   ```
4. Click **Execute**
5. Should see 201 response with cart data

### 4.4 Test Command Line (curl)
```bash
# Test products
curl https://ecommerce-backend-xxxx.onrender.com/products

# Test Swagger docs
curl https://ecommerce-backend-xxxx.onrender.com/api-docs

# Test add to cart
curl -X POST https://ecommerce-backend-xxxx.onrender.com/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId":"YOUR_PRODUCT_ID","quantity":2}'
```

---

## **Step 5: Share Live URL with Examiner**

Tell your examiner/teacher:

**Live API URL:** `https://ecommerce-backend-xxxx.onrender.com`

**Swagger UI (for testing):** `https://ecommerce-backend-xxxx.onrender.com/api-docs`

**They can:**
- View all products
- Test Add to Cart
- Test Add to Favorites
- Test all endpoints with real database
- See response data in real-time

---

## **Troubleshooting**

| Problem | Solution |
|---------|----------|
| **Deployment fails** | Check Render logs; ensure `npm install` works locally |
| **"Cannot connect to MongoDB"** | Verify MongoDB URI in Render env vars; check cluster is running on MongoDB Atlas |
| **API returns 500 error** | Check Render logs; verify MONGODB_URI is correct |
| **Swagger shows "Unknown" errors** | Wait 2-3 min after deploy; refresh browser |
| **Products not showing** | Seed the database first (run locally, data goes to MongoDB Atlas) |

---

## **Summary: What's Deployed Where**

```
Your Code (GitHub)
↓
Render (automatically deploys from GitHub)
├── Backend API: https://ecommerce-backend-xxxx.onrender.com
├── Swagger UI: /api-docs (same URL)
└── Connected to MongoDB Atlas (cloud database)
```

---

## **Next Steps (Optional)**

1. **Deploy Frontend (React):** 
   - Push React code to separate GitHub repo
   - Deploy to Vercel or Netlify
   - Update frontend to call `https://ecommerce-backend-xxxx.onrender.com`

2. **Add Custom Domain:**
   - On Render, under Settings → Add custom domain
   - (Requires paid plan or free subdomain)

3. **Enable Auto-Deploy:**
   - Already enabled! Render automatically redeploys when you push to GitHub main branch

---

## **Live URLs to Test**

Replace `xxxx` with your Render service ID:

| Endpoint | URL |
|----------|-----|
| Products | `https://ecommerce-backend-xxxx.onrender.com/products` |
| Products by Category | `https://ecommerce-backend-xxxx.onrender.com/products/electronics` |
| Swagger UI | `https://ecommerce-backend-xxxx.onrender.com/api-docs` |
| Add to Cart | `POST https://ecommerce-backend-xxxx.onrender.com/api/cart` |
| Get Cart | `https://ecommerce-backend-xxxx.onrender.com/cart` |
| Add to Favorites | `POST https://ecommerce-backend-xxxx.onrender.com/api/favorites` |
| Get Favorites | `https://ecommerce-backend-xxxx.onrender.com/favorites` |

---

**Questions?** Check Render dashboard logs or contact support.

**Ready to deploy?** Follow the steps above! 🎉
