# API Contract Update - October 2025

**Date:** October 16, 2025  
**Status:** Completed  
**Reference:** [Bakuhantam Public API v1 OpenAPI](https://bakuhantam-api.zakiego.com/api/v1/openapi.json)

## Overview

Updated the ts-rest contract (`src/lib/api/contract.ts`) and all related UI components to align with the new Bakuhantam Public API v1 specification.

## Breaking Changes

### 1. Debate Schema Changes

**Before:**

```typescript
{
  titleEn: string,
  titleId: string,
  descriptionEn: string | null,
  descriptionId: string | null,
  lang: string,
  avatars: Array<{ image: string }> | null
}
```

**After:**

```typescript
{
  title: string,
  description: string | null,
  lang: "id" | "en",
  avatars: Array<{ image: string }>
}
```

**Impact:**

- Unified title and description fields (no more separate `En`/`Id` suffixes)
- `lang` is now strictly typed as enum `["id", "en"]`
- `avatars` is now always an array (never null, empty array if no avatars)

### 2. Profile Endpoint Path Change

**Before:** `/profile/:authorHandle`  
**After:** `/profile/:handle`

**Impact:**

- Updated all `restClient.getProfile()` calls to use `params.handle` instead of `params.authorHandle`

### 3. Profile Schema Changes

**Before:**

```typescript
profile: {
  authorImage: string,
  firstTweetedAt: string,
  lastTweetedAt: string
}
debates: Array<{
  titleEn: string,
  titleId: string
}>
```

**After:**

```typescript
profile: {
  authorImage: string | null,
  firstTweetedAt: string | null,
  lastTweetedAt: string | null
}
debates: Array<{
  title: string
}>
```

**Impact:**

- Profile image and tweet dates can now be null
- Debate titles unified to single `title` field

### 4. Categories Endpoint Removed

**Removed:**

- `listCategories` endpoint
- `getCategorySchema` and `getCategoriesSchema` schemas
- `ResponseListCategories` type export
- `category` query parameter from `getDebates`

**Impact:**

- Category filtering is no longer available through the API
- Any UI components using categories need alternative solutions

### 5. GetDebates Query Parameter Changes

**Before:**

```typescript
{
  category?: string,
  limit: number (default: 1000)
}
```

**After:**

```typescript
{
  // category removed
  limit: number (default: 20)
}
```

**Impact:**

- Default limit reduced from 1000 to 20 (more reasonable pagination default)
- Category filtering removed

## Files Modified

### Contract & Schema

- `src/lib/api/contract.ts` - Updated all schemas and endpoints

### UI Components

- `src/app/(home)/page-client.tsx` - Use `debate.title` and `debate.description`
- `src/app/debate/[slug]/page.tsx` - Use unified title/description fields
- `src/app/leaderboard/[username]/page.tsx` - Updated profile param and debate links
- `src/app/sitemap.ts` - Changed `/topic/` paths to `/debate/`

## Migration Notes

### For Frontend Developers

1. **Replace field access:**

   ```typescript
   // Old
   debate.titleEn
   debate.descriptionId
   
   // New
   debate.title
   debate.description
   ```

2. **Update profile calls:**

   ```typescript
   // Old
   restClient.getProfile({ params: { authorHandle: username } })
   
   // New
   restClient.getProfile({ params: { handle: username } })
   ```

3. **Handle nullable profile fields:**

   ```typescript
   // authorImage, firstTweetedAt, lastTweetedAt can now be null
   profile.authorImage ?? defaultImage
   ```

4. **Update debate URLs:**

   ```typescript
   // Old
   `/topic/${debate.slug}`
   
   // New
   `/debate/${debate.slug}`
   ```

### For Backend/API Consumers

- If using categories, implement alternative filtering mechanism
- Adjust pagination expectations (default limit is now 20 instead of 1000)
- Ensure proper handling of nullable profile fields
- Update any hardcoded API paths for profiles

## Testing Checklist

- [x] Contract schemas validate against new API spec
- [x] Home page displays debate titles correctly
- [x] Debate detail pages show correct title/description
- [x] Profile pages load with correct handle parameter
- [x] Sitemap generates correct debate URLs
- [x] No TypeScript/linter errors

## Rollback Plan

If issues arise, revert the following commits/changes:

1. Contract schema changes in `src/lib/api/contract.ts`
2. UI field access updates across all pages
3. Profile endpoint parameter changes

Keep a backup of the old contract structure for reference.

## Related Links

- [OpenAPI Specification](https://bakuhantam-api.zakiego.com/api/v1/openapi.json)
- [API Documentation](https://github.com/zakiego/bakuhantam-cms)
