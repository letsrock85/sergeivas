# Sanity Studio Webhook Update - 2026 Modernization

## Current Problem
Your webhook is still using the old approach that triggers full rebuilds (2 years old setup). This causes 1+ minute rebuilds even for small content changes.

## Solution: Modern Path-Based Revalidation

### Step 1: Update Sanity Studio Webhook

1. Go to **Sanity Studio** → **Settings** → **API** → **Webhooks**
2. Find your existing webhook
3. Update these settings:

**URL:**
```
https://sergeivas.vercel.app/api/revalidate-path
```

**Filter:**
```javascript
_type in ["blogPost", "project", "author", "page"]
```

**Projection:**
```javascript
{
  "_type": _type,
  "slug": slug,
  "path": select(
    _type == "blogPost" => "/blog/" + slug.current,
    _type == "project" => "/projects/" + slug.current,
    _type == "author" => "/",
    "/"
  )
}
```

**HTTP Method:** POST
**Enable:** Create, Update, Delete events

### Step 2: Environment Variables

Add this to your Vercel environment variables:
```
SANITY_REVALIDATE_SECRET=your-webhook-secret
```

### Step 3: Test the New Setup

1. Make a small change in Sanity Studio (e.g., change a blog post title)
2. Click "Publish"
3. Check your site - should update instantly without rebuild!

## Benefits of This Approach

✅ **Instant Updates** - No more 1+ minute rebuilds  
✅ **Path-Specific** - Only affected pages get revalidated  
✅ **Modern Architecture** - Uses Next.js 16 ISR best practices  
✅ **CDN Optimized** - Vercel edge caching with smart invalidation  
✅ **Zero Downtime** - Updates happen seamlessly  

## How It Works

1. **Content Change** → Sanity Studio webhook sends update
2. **Smart Path Detection** → System determines which pages need updating
3. **Targeted Revalidation** → Only specific paths get refreshed
4. **Instant Visibility** → Changes appear immediately on site

## No More Full Rebuilds!

This eliminates the old workflow of:
- Content change → Git commit → Full site rebuild → 1+ minute wait

Now it's:
- Content change → Direct API call → Instant update → 0 second wait!