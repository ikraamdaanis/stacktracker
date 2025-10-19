export interface ServiceOption {
  name: string;
  slug: string;
  category: string;
}

export const POPULAR_SERVICES: ServiceOption[] = [
  // Payment
  { name: "Stripe", slug: "stripe", category: "Payment" },
  { name: "PayPal", slug: "paypal", category: "Payment" },
  { name: "Square", slug: "square", category: "Payment" },
  { name: "Paddle", slug: "paddle", category: "Payment" },
  { name: "Lemonsqueezy", slug: "lemonsqueezy", category: "Payment" },

  // Email
  { name: "SendGrid", slug: "sendgrid", category: "Email" },
  { name: "Mailgun", slug: "mailgun", category: "Email" },
  { name: "Resend", slug: "resend", category: "Email" },
  { name: "Postmark", slug: "postmark", category: "Email" },
  { name: "Amazon SES", slug: "amazonaws", category: "Email" },
  { name: "Mailchimp", slug: "mailchimp", category: "Email" },

  // Auth
  { name: "Clerk", slug: "clerk", category: "Auth" },
  { name: "Auth0", slug: "auth0", category: "Auth" },
  { name: "Supabase", slug: "supabase", category: "Auth" },
  { name: "Firebase", slug: "firebase", category: "Auth" },
  { name: "NextAuth", slug: "nextdotjs", category: "Auth" },
  { name: "Okta", slug: "okta", category: "Auth" },

  // Analytics
  { name: "Google Analytics", slug: "googleanalytics", category: "Analytics" },
  { name: "Plausible", slug: "plausible", category: "Analytics" },
  { name: "Mixpanel", slug: "mixpanel", category: "Analytics" },
  { name: "Amplitude", slug: "amplitude", category: "Analytics" },
  { name: "PostHog", slug: "posthog", category: "Analytics" },
  { name: "Segment", slug: "segment", category: "Analytics" },

  // Monitoring
  { name: "Sentry", slug: "sentry", category: "Monitoring" },
  { name: "LogRocket", slug: "logrocket", category: "Monitoring" },
  { name: "Datadog", slug: "datadog", category: "Monitoring" },
  { name: "New Relic", slug: "newrelic", category: "Monitoring" },
  { name: "Bugsnag", slug: "bugsnag", category: "Monitoring" },
  { name: "Rollbar", slug: "rollbar", category: "Monitoring" },

  // CMS
  { name: "Contentful", slug: "contentful", category: "CMS" },
  { name: "Sanity", slug: "sanity", category: "CMS" },
  { name: "Strapi", slug: "strapi", category: "CMS" },
  { name: "WordPress", slug: "wordpress", category: "CMS" },
  { name: "Prismic", slug: "prismic", category: "CMS" },
  { name: "Ghost", slug: "ghost", category: "CMS" },

  // Search
  { name: "Algolia", slug: "algolia", category: "Search" },
  { name: "Meilisearch", slug: "meilisearch", category: "Search" },
  { name: "Typesense", slug: "typesense", category: "Search" },
  { name: "Elasticsearch", slug: "elasticsearch", category: "Search" },

  // Storage
  { name: "AWS S3", slug: "amazons3", category: "Storage" },
  { name: "Cloudflare R2", slug: "cloudflare", category: "Storage" },
  { name: "Backblaze B2", slug: "backblaze", category: "Storage" },
  { name: "DigitalOcean Spaces", slug: "digitalocean", category: "Storage" },

  // CDN
  { name: "Cloudflare", slug: "cloudflare", category: "CDN" },
  { name: "Fastly", slug: "fastly", category: "CDN" },
  { name: "CloudFront", slug: "amazonaws", category: "CDN" },
  { name: "BunnyCDN", slug: "bunny", category: "CDN" },

  // Communication
  { name: "Twilio", slug: "twilio", category: "Communication" },
  { name: "Slack", slug: "slack", category: "Communication" },
  { name: "Discord", slug: "discord", category: "Communication" },
  { name: "Pusher", slug: "pusher", category: "Communication" },

  // Other
  { name: "Convex", slug: "convex", category: "Backend" },
  { name: "PlanetScale", slug: "planetscale", category: "Database" },
  { name: "Neon", slug: "neon", category: "Database" },
  { name: "OpenAI", slug: "openai", category: "AI" },
  { name: "Anthropic", slug: "anthropic", category: "AI" },
  { name: "Replicate", slug: "replicate", category: "AI" },
  { name: "Vercel AI SDK", slug: "vercel", category: "AI" }
];

export const POPULAR_DATABASES: ServiceOption[] = [
  // SQL
  { name: "PostgreSQL", slug: "postgresql", category: "SQL" },
  { name: "MySQL", slug: "mysql", category: "SQL" },
  { name: "MariaDB", slug: "mariadb", category: "SQL" },
  { name: "SQLite", slug: "sqlite", category: "SQL" },
  { name: "CockroachDB", slug: "cockroachlabs", category: "SQL" },
  { name: "PlanetScale", slug: "planetscale", category: "SQL" },
  { name: "Neon", slug: "neon", category: "SQL" },

  // NoSQL
  { name: "MongoDB", slug: "mongodb", category: "NoSQL" },
  { name: "DynamoDB", slug: "amazondynamodb", category: "NoSQL" },
  { name: "Couchbase", slug: "couchbase", category: "NoSQL" },
  { name: "Cassandra", slug: "apachecassandra", category: "NoSQL" },
  { name: "Firebase", slug: "firebase", category: "NoSQL" },
  { name: "Supabase", slug: "supabase", category: "NoSQL" },

  // Cache
  { name: "Redis", slug: "redis", category: "Cache" },
  { name: "Memcached", slug: "memcached", category: "Cache" },
  { name: "Dragonfly", slug: "dragonflybsd", category: "Cache" },
  { name: "Upstash", slug: "upstash", category: "Cache" },

  // Vector
  { name: "Pinecone", slug: "pinecone", category: "Vector" },
  { name: "Weaviate", slug: "weaviate", category: "Vector" },
  { name: "Qdrant", slug: "qdrant", category: "Vector" },
  { name: "Milvus", slug: "milvus", category: "Vector" },
  { name: "Chroma", slug: "chromadb", category: "Vector" },

  // Graph
  { name: "Neo4j", slug: "neo4j", category: "Graph" },
  { name: "ArangoDB", slug: "arangodb", category: "Graph" },

  // Time-series
  { name: "InfluxDB", slug: "influxdb", category: "Time-series" },
  { name: "TimescaleDB", slug: "timescale", category: "Time-series" },

  // Other
  { name: "Elasticsearch", slug: "elasticsearch", category: "Search" },
  { name: "Convex", slug: "convex", category: "Backend" }
];

export const POPULAR_HOSTING: ServiceOption[] = [
  // Platform
  { name: "Vercel", slug: "vercel", category: "Platform" },
  { name: "Netlify", slug: "netlify", category: "Platform" },
  { name: "Railway", slug: "railway", category: "Platform" },
  { name: "Render", slug: "render", category: "Platform" },
  { name: "Fly.io", slug: "flydotio", category: "Platform" },
  { name: "Heroku", slug: "heroku", category: "Platform" },

  // Cloud
  { name: "AWS", slug: "amazonaws", category: "Cloud" },
  { name: "Google Cloud", slug: "googlecloud", category: "Cloud" },
  { name: "Microsoft Azure", slug: "microsoftazure", category: "Cloud" },
  { name: "DigitalOcean", slug: "digitalocean", category: "Cloud" },
  { name: "Linode", slug: "linode", category: "Cloud" },
  { name: "Hetzner", slug: "hetzner", category: "Cloud" },
  { name: "OVH", slug: "ovh", category: "Cloud" },

  // Serverless
  {
    name: "Cloudflare Workers",
    slug: "cloudflareworkers",
    category: "Serverless"
  },
  { name: "AWS Lambda", slug: "awslambda", category: "Serverless" },
  { name: "Supabase", slug: "supabase", category: "Serverless" },
  { name: "Deno Deploy", slug: "deno", category: "Serverless" },

  // Edge
  { name: "Cloudflare Pages", slug: "cloudflarepages", category: "Edge" },
  { name: "Vercel Edge", slug: "vercel", category: "Edge" },

  // Container
  { name: "Docker", slug: "docker", category: "Container" },
  { name: "Kubernetes", slug: "kubernetes", category: "Container" },

  // Other
  { name: "GitHub Pages", slug: "githubpages", category: "Static" },
  { name: "GitLab Pages", slug: "gitlab", category: "Static" },
  { name: "Surge", slug: "surge", category: "Static" }
];

// Helper function to find a service by name
export function findServiceByName(
  name: string,
  options: ServiceOption[]
): ServiceOption | undefined {
  return options.find(
    option => option.name.toLowerCase() === name.toLowerCase()
  );
}

// Helper function to get slug from name
// Returns slug for Simple Icons lookup, or undefined if not found
export function getSlugFromName(
  name: string,
  allOptions: ServiceOption[]
): string | undefined {
  const found = findServiceByName(name, allOptions);
  return found?.slug;
}
