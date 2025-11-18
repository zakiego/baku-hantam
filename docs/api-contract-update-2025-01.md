# API Contract Update - January 2025 (v1.1.0)

**Date:** October 16, 2025 (Implemented)  
**API Version:** v1.1.0  
**Status:** Completed  
**Reference:** [Bakuhantam Public API v1 OpenAPI](https://bakuhantam-api.zakiego.com/api/v1/openapi.json)

## Overview

Updated the ts-rest contract (`src/lib/api/contract.ts`) to support AI-generated debate summaries. This update adds new nullable fields to the debate schemas for both English and Indonesian summaries.

## Summary

This is a **non-breaking, backward-compatible** update that adds AI-generated summary fields to debate endpoints. Existing integrations will continue to work without modifications.

## New Features

### AI-Generated Debate Summaries

Added two new optional fields to provide AI-generated summaries of debates in both English and Indonesian:

- **`summary`** (string | null) - AI-generated summary in English
- **`summaryId`** (string | null) - AI-generated summary in Indonesian (Ringkasan dalam Bahasa Indonesia)

#### Summary Characteristics

- **Format:** Markdown-formatted text with bullet points
- **Structure:** Grouped by similar perspectives
- **Content:** 2-3 sentences overview + bullet points with key arguments
- **Mentions:** 2-3 key participants per perspective group
- **Tone:** Neutral and objective
- **Generation:** AI-powered using OpenRouter with GLM-4.5-Air model via Cloudflare AI Gateway

## Schema Changes

### 1. Debates List Schema (`getDebatesSchema`)

**Before:**

```typescript
{
  data: Array<{
    id: string,
    title: string,
    slug: string,
    description: string | null,
    lang: "id" | "en",
    createdAt: string,
    updatedAt: string,
    avatars: Array<{ image: string }>
  }>
}
```

**After:**

```typescript
{
  data: Array<{
    id: string,
    title: string,
    slug: string,
    description: string | null,
    summary: string | null,        // NEW
    summaryId: string | null,      // NEW
    lang: "id" | "en",
    createdAt: string,
    updatedAt: string,
    avatars: Array<{ image: string }>
  }>
}
```

### 2. Debate Details Schema (`getDebateDetailsSchema`)

**Before:**

```typescript
{
  data: {
    id: string,
    title: string,
    slug: string,
    description: string | null,
    lang: "id" | "en",
    createdAt: string,
    updatedAt: string,
    avatars: Array<{ image: string }>,
    participants: Array<Participant>,
    dateRange: { start: string, end: string } | null,
    tweetCount: number
  }
}
```

**After:**

```typescript
{
  data: {
    id: string,
    title: string,
    slug: string,
    description: string | null,
    summary: string | null,        // NEW
    summaryId: string | null,      // NEW
    lang: "id" | "en",
    createdAt: string,
    updatedAt: string,
    avatars: Array<{ image: string }>,
    participants: Array<Participant>,
    dateRange: { start: string, end: string } | null,
    tweetCount: number
  }
}
```

## Affected Endpoints

### 1. `GET /api/v1/debates`

**Change:** Response now includes `summary` and `summaryId` fields for each debate

**Breaking:** No (backward compatible - new fields are nullable)

**Example Response:**

```json
{
  "data": [
    {
      "id": "debate-123",
      "title": "Notion Makes People Productive or Procrastinate?",
      "slug": "notion-productive-procrastinate",
      "description": "Discussion about Notion's impact on productivity",
      "summary": "This debate discusses whether Notion makes people productive or causes procrastination...",
      "summaryId": "Debat ini membahas apakah Notion membuat orang produktif atau malah bikin prokrastinasi...",
      "lang": "en",
      "createdAt": "2025-01-15T10:00:00Z",
      "updatedAt": "2025-01-16T14:30:00Z",
      "avatars": [
        { "image": "https://..." }
      ]
    }
  ],
  "page": 1,
  "limit": 20,
  "hasNext": false
}
```

### 2. `GET /api/v1/debates/:idOrSlug`

**Change:** Response now includes `summary` and `summaryId` fields

**Breaking:** No (backward compatible - new fields are nullable)

**Example Response:**

```json
{
  "data": {
    "id": "debate-123",
    "title": "Notion Makes People Productive or Procrastinate?",
    "slug": "notion-productive-procrastinate",
    "description": "Discussion about Notion's impact on productivity",
    "summary": "This debate discusses whether Notion makes people productive or causes procrastination...",
    "summaryId": "Debat ini membahas apakah Notion membuat orang produktif atau malah bikin prokrastinasi...",
    "lang": "en",
    "createdAt": "2025-01-15T10:00:00Z",
    "updatedAt": "2025-01-16T14:30:00Z",
    "avatars": [{ "image": "https://..." }],
    "participants": [...],
    "dateRange": { "start": "2025-01-01", "end": "2025-01-15" },
    "tweetCount": 42
  }
}
```

## Files Modified

### Contract & Schema

- `src/lib/api/contract.ts` - Added `summary` and `summaryId` fields to debate schemas

## Migration Guide

### For Frontend Developers

This update is **fully backward compatible**. No changes are required to existing code, but you can enhance your UI by displaying the summaries when available.

#### 1. Basic Usage - Check for Summary Availability

```typescript
const debate = await restClient.getDebateDetails({
  params: { idOrSlug: 'my-debate' }
});

// Safe to access new fields
if (debate.body.data.summary) {
  console.log('English summary:', debate.body.data.summary);
}

if (debate.body.data.summaryId) {
  console.log('Indonesian summary:', debate.body.data.summaryId);
}
```

#### 2. Display Summary in UI (React)

```tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function DebateDetail({ debate }) {
  return (
    <div>
      <h1>{debate.title}</h1>
      
      {/* Display summary if available */}
      {debate.summary && debate.summary !== 'summary_id' && (
        <div className="summary">
          <h2>Summary</h2>
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {debate.summary}
            </ReactMarkdown>
          </div>
        </div>
      )}
      
      {/* Display Indonesian summary if available */}
      {debate.summaryId && debate.summaryId !== 'summary_id' && (
        <div className="summary-id">
          <h2>Ringkasan</h2>
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {debate.summaryId}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
```

#### 3. Language-Aware Display

```tsx
function DebateSummary({ debate, lang }) {
  const summary = lang === 'id' ? debate.summaryId : debate.summary;
  
  if (!summary) {
    return null; // No summary available
  }
  
  return (
    <div className="debate-summary">
      <h3>{lang === 'id' ? 'Ringkasan' : 'Summary'}</h3>
      <div dangerouslySetInnerHTML={{ __html: marked(summary) }} />
    </div>
  );
}
```

#### 4. TypeScript Types

The existing TypeScript types are automatically updated:

```typescript
import type { ResponseGetDebates, ResponseGetDebateDetails } from '@/lib/api/contract';

// Types now include summary and summaryId as nullable fields
type Debate = ResponseGetDebates['data'][0];
type DebateDetails = ResponseGetDebateDetails['data'];

// Both have:
// - summary: string | null
// - summaryId: string | null
```

### Important Notes

1. **Null Handling:** Both `summary` and `summaryId` can be `null` - always check before displaying
2. **Independent Generation:** Summaries can be generated independently (English without Indonesian, or vice versa)
3. **Markdown Format:** Summaries are in Markdown format - use a Markdown parser for proper rendering
4. **No Breaking Changes:** Existing code continues to work without modifications

## Field Behavior

- **Default Value:** Both fields are `null` when no summary has been generated
- **Independence:** English and Indonesian summaries can exist independently
- **Updates:** Summaries are managed via admin interface (not exposed in public API)
- **Persistence:** Once generated, summaries are stored with the debate record

## Version Compatibility

- **Current Version:** v1.1.0
- **Previous Version:** v1.0.0
- **Compatibility:** Fully backward compatible
- **Deprecations:** None

## UI Implementation

### Overview

The UI has been updated to display AI-generated summaries on both the home page (debate list) and debate detail pages. The implementation is responsive and handles placeholder values gracefully.

### Home Page - Debate List

**Location:** `src/app/(home)/page-client.tsx`

**Features:**

- Shows a preview of the summary in a highlighted blue box below each debate card
- Automatically selects the appropriate language summary based on `debate.lang`
- Uses `line-clamp-3` for a clean three-line preview with markdown rendering
- Renders markdown formatting (bold, lists, headers) properly
- Hides summaries with placeholder value "summary_id"
- Adds hover effect to debate cards for better UX

**Visual Design:**

```tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Preview shown as a blue-highlighted box with markdown rendering
<div className="mt-3 p-3 bg-blue-50 border-l-2 border-blue-400 rounded-r text-xs text-gray-700">
  <div className="flex items-start gap-1">
    <span className="text-blue-600 font-semibold shrink-0">📝 AI:</span>
    <div className="line-clamp-3 prose prose-sm max-w-none [&>*]:my-0 [&>*]:leading-tight">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {summary}
      </ReactMarkdown>
    </div>
  </div>
</div>
```

### Debate Detail Page

**Location:** `src/app/debate/[slug]/page.tsx`

**Features:**

- Shows full summary in an expanded view with border-left accent
- Language-aware display: shows English or Indonesian based on `debate.lang`
- Falls back to showing both summaries if language is undefined
- Renders markdown formatting using `react-markdown` with `remark-gfm`
- Filters out placeholder "summary_id" values
- Uses IIFE pattern to handle complex conditional rendering
- Supports bold text, lists, headers, and other markdown syntax

**Visual Design:**

```tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Full summary with blue accent border and background
<div className="mt-6 border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
  <h3 className="text-sm font-semibold text-blue-900 mb-2">
    📝 AI Summary / Ringkasan AI
  </h3>
  <div className="prose prose-sm max-w-none text-gray-700">
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {summary}
    </ReactMarkdown>
  </div>
</div>
```

### Responsive Design

Both implementations are fully responsive:

**Mobile (< 768px):**

- Full-width containers
- Proper padding maintained
- Text wraps naturally
- Blue accent borders remain visible

**Desktop (≥ 768px):**

- Same layout scales well
- Maintains readability
- Preserves visual hierarchy

### Placeholder Handling

Both pages filter out invalid summary values:

```typescript
// Filter out placeholder "summary_id"
const hasValidSummary = debate.summary && debate.summary !== "summary_id";
const hasValidSummaryId = debate.summaryId && debate.summaryId !== "summary_id";
```

This ensures that placeholder values from the database don't appear in the UI.

### Language Selection Logic

**Home Page:**

```typescript
const summary = debate.lang === "id" ? debate.summaryId : debate.summary;
```

**Debate Detail Page:**

- If `lang === "en"` → show English summary only
- If `lang === "id"` → show Indonesian summary only  
- If no lang or other value → show both summaries if available

### Styling Approach

- **Tailwind CSS** for all styling (no custom CSS needed)
- **Blue color scheme** (`bg-blue-50`, `border-blue-400/500`, `text-blue-900`) to differentiate AI-generated content
- **Prose classes** for proper typography in summaries
- **Consistent spacing** with Tailwind's spacing scale

### Markdown Rendering

**Dependencies:**

```bash
bun add react-markdown remark-gfm
```

**Packages:**

- `react-markdown`: Renders markdown content as React components
- `remark-gfm`: GitHub Flavored Markdown plugin for better list and table support

**Implementation:**

```tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

<ReactMarkdown remarkPlugins={[remarkGfm]}>
  {summaryText}
</ReactMarkdown>
```

**Supported Markdown Features:**

- **Bold text** using `**text**`
- *Italic text* using `*text*`
- Unordered lists using `-` or `*`
- Ordered lists using `1.`, `2.`, etc.
- Headers using `#`, `##`, `###`
- Nested lists and sublists
- Line breaks and paragraphs

**Preview Mode (Home Page):**

- Renders markdown with `line-clamp-3` for truncated display
- Shows formatted text with bold, lists, and other markdown features
- Uses compact spacing with `[&>*]:my-0 [&>*]:leading-tight` to fit more content

## Testing Checklist

- [x] Contract schemas updated with new fields
- [x] TypeScript types include nullable summary fields
- [x] No linter errors
- [x] Backward compatibility maintained (nullable fields)
- [x] UI components updated to display summaries
- [x] Home page shows summary previews (3-line clamp with markdown)
- [x] Debate detail page shows full summaries
- [x] Language-aware summary display
- [x] Placeholder "summary_id" values filtered out
- [x] Responsive design for mobile and desktop
- [x] Markdown rendering with react-markdown and remark-gfm
- [x] Bold text, lists, and headers properly formatted
- [x] Markdown preview on home page (properly rendered with formatting)

## Related Documentation

- [Previous Update: October 2025](./api-contract-update-2025-10.md)
- [Client Fetch with React Query](./client-fetch-react-query.md)
- [OpenAPI Specification](https://bakuhantam-api.zakiego.com/api/v1/openapi.json)
- [API Documentation](https://github.com/zakiego/bakuhantam-cms)
