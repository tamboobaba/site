import { RateLimiterMemory } from 'rate-limiter-flexible';

const opts = {
  points: 5, // 5 points
  duration: 60, // Per 60 seconds
};

const rateLimiter = new RateLimiterMemory(opts);

export default function rateLimit(options = {}) {
  return {
    check: async (request, points = 1) => {
      const ip = request.headers.get('x-forwarded-for') || request.ip;
      try {
        await rateLimiter.consume(ip, points);
      } catch (err) {
        throw new Error('Rate limit exceeded');
      }
    }
  };
}