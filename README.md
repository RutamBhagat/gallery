# Gallery App

Hey there! Welcome to my Gallery App project. This is a Next.js-based image gallery application that I built to showcase my skills in modern web development. Let me walk you through what I did and how you can get it up and running.

![Gallery App Screenshot](https://via.placeholder.com/1200x650.png?text=Gallery+App+Screenshot)

**Live Demo:** [https://gallery-omega-eight.vercel.app/](https://gallery-omega-eight.vercel.app/)

## What I Did

In this project, I implemented a bunch of cool features:

1. Built a responsive UI using Next.js and ShadCN
2. Set up a Vercel Postgres database for storing image metadata
3. Implemented user authentication with Clerk
4. Added image upload functionality
5. Created individual image pages with parallel routing
6. Implemented a delete button using server actions
7. Set up error management with Sentry
8. Added analytics using PostHog
9. Implemented rate limiting with Upstash to prevent abuse

I used a variety of modern technologies and practices, including Next.js 13+ features like the App Router and Server Components. It was a great learning experience!

## Getting Started

To get this project running on your machine, follow these steps:

1. First, clone the repository to your local machine.

2. Install the dependencies using Bun:

   ```
   bun install
   ```

3. Set up your environment variables:

   - Copy the `.env.example` file and rename it to `.env`
   - Fill in your own values for each variable

4. Push the database schema and seed it with mock data:

   ```
   bun run db:push
   bun run db:seed
   ```

5. To monitor your database, you can use Drizzle Studio:

   ```
   bun run db:studio
   ```

6. Finally, to run the project locally:
   ```
   bun run dev
   ```

## Available Scripts

Here are some important commands you can use:

- `bun run db:generate`: Generates database migrations
- `bun run db:push`: Pushes the schema to your database
- `bun run db:studio`: Opens Drizzle Studio for database management
- `bun run db:seed`: Seeds your database with mock data
- `bun run dev`: Runs the development server

## What I Learned

Building this project was a great experience. I got to work with some cutting-edge technologies and learned a lot about:

- Next.js 13+ features and best practices
- Database management with Vercel Postgres and Drizzle ORM
- Authentication flows with Clerk
- Error tracking and management with Sentry
- Analytics implementation with PostHog
- Rate limiting strategies using Upstash

## Features

- Responsive image gallery UI
- User authentication with Clerk
- Image upload functionality
- Individual image pages
- Delete image capability
- Analytics tracking
- Error management
- Rate limiting to prevent abuse

## Tech Stack

- **Frontend:** Next.js, React, ShadCN UI
- **Backend:** Next.js API routes, Vercel Serverless Functions
- **Database:** Vercel Postgres
- **Authentication:** Clerk
- **Image Optimization:** Next/Image component
- **Deployment:** Vercel
- **Error Tracking:** Sentry
- **Analytics:** PostHog
- **Rate Limiting:** Upstash

If you have any questions about the project or run into any issues setting it up, feel free to reach out. Happy coding!
