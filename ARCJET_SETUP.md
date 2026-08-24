# Arcjet Configuration for NestJS

This document explains the Arcjet setup for your NestJS application.

## Overview

Arcjet is now configured in your NestJS application with the following components:

- **`src/arcjet/arcjet.ts`** - Main Arcjet client configuration
- **`src/arcjet/arcjet.interceptor.ts`** - NestJS interceptor for request protection
- **`src/arcjet/arcjet.module.ts`** - NestJS module for Arcjet integration
- **`.env`** - Environment configuration with `ARCJET_KEY` and `ARCJET_ENV`

## Current Configuration

Your Arcjet instance is configured with:
- **Shield rule**: Protects against bot abuse and automated attacks
- **Mode**: LIVE (active protection)
- **Characteristics**: IP source (`ip.src`)

## Installation

Before running your application, you need to install the Arcjet Node SDK:

```bash
npm install @arcjet/node
```

## Environment Variables

You already have the required environment variables in `.env`:
- `ARCJET_KEY` - Your Arcjet API key (keep this private!)
- `ARCJET_ENV` - Environment setting (development/production)

## How It Works

1. **Global Protection**: The `ArcjetInterceptor` is registered globally in `main.ts`
2. **Request Analysis**: Every HTTP request is analyzed by Arcjet before reaching your route handlers
3. **Decision Handling**: 
   - ALLOW: Request proceeds normally
   - DENY: Returns appropriate HTTP status (429 for rate limits, 403 for bot/abuse)
4. **Error Responses**: Includes retry information for rate-limited requests

## Response Examples

### Rate Limited (429)
```json
{
  "statusCode": 429,
  "message": "Too many requests. Please try again later.",
  "retryAfter": "2025-08-17T10:30:00Z"
}
```

### Bot Detected (403)
```json
{
  "statusCode": 403,
  "message": "Bot detected. Access denied."
}
```

## Customizing Rules

To add rate limiting or other protections, modify `src/arcjet/arcjet.ts`:

### Example: Add Rate Limiting

```typescript
import arcjet, { shield, fixedWindow } from "@arcjet/node";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({
      mode: "LIVE",
    }),
    // Rate limit: 30 requests per 1 minute per IP
    fixedWindow({
      window: "60s",
      max: 30,
      mode: "LIVE",
    }),
  ],
});

export default aj;
```

### Example: Add Email Validation

```typescript
import arcjet, { shield, validateEmail } from "@arcjet/node";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({
      mode: "LIVE",
    }),
    validateEmail({
      mode: "LIVE",
    }),
  ],
});

export default aj;
```

## User-Specific Protection

For authenticated endpoints, you can add user-level rate limiting:

### Example in Interceptor

```typescript
// Inside arcjet.interceptor.ts intercept method
const userId = request.user?.id;
if (userId) {
  const decision = await arcjet.withRule(
    fixedWindow({
      window: "60s",
      max: 100,
      key: userId,
      mode: "LIVE",
    })
  ).protect(request);
  // Handle decision...
}
```

## Accessing Arcjet Decision in Route Handlers

The Arcjet decision is attached to the request object and can be accessed:

```typescript
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('api')
export class ExampleController {
  @Get('protected')
  getProtected(@Req() req: Request) {
    const arcjetInfo = (req as any).arcjet;
    console.log('Arcjet Decision:', arcjetInfo.decision);
    return { message: 'Request was allowed' };
  }
}
```

## Testing

To test Arcjet protection:

1. **Start your application**:
   ```bash
   npm run start:dev
   ```

2. **Trigger a request**:
   ```bash
   curl http://localhost:3000/api/users
   ```

3. **Verify in Arcjet Console**:
   - Go to https://app.arcjet.com
   - Check the "Requests" tab for your site
   - You should see the request logged with the Arcjet decision

## Monitoring

### View Decisions in Arcjet Console
- Navigate to https://app.arcjet.com
- Select your site
- View all requests and decisions in the Requests tab

### CLI Monitoring
Once you have `@arcjet/cli` installed:
```bash
# List recent requests
npx @arcjet/cli requests list --site-id YOUR_SITE_ID

# Get details about a specific request
npx @arcjet/cli requests explain --site-id YOUR_SITE_ID --request-id REQUEST_ID
```

## Common Issues

### "ARCJET_KEY not found"
- Ensure `.env` file exists in the project root
- Check that `ARCJET_KEY=ajkey_...` is set
- Restart your development server

### Requests not appearing in Console
- Verify your `ARCJET_KEY` is valid
- Check that `ARCJET_ENV=development` is set
- Make actual HTTP requests to trigger logging
- Wait 30 seconds for requests to appear in the console

### Interceptor not running
- Verify `ArcjetModule` is imported in `app.module.ts`
- Verify `ArcjetInterceptor` is added in `main.ts` via `useGlobalInterceptors()`
- Check that `@arcjet/node` is installed: `npm list @arcjet/node`

## Next Steps

1. **Install the SDK**: `npm install @arcjet/node`
2. **Test the setup**: Run your application and make a request
3. **Add specific rules**: Based on your API's needs (rate limiting, email validation, etc.)
4. **Monitor requests**: Check the Arcjet console for decision logs
5. **Fine-tune**: Adjust rules and thresholds based on real traffic patterns

## Documentation

- [Arcjet Docs](https://docs.arcjet.com)
- [Arcjet Node SDK](https://github.com/arcjet/arcjet-js)
- [NestJS Interceptors](https://docs.nestjs.com/interceptors)
