import nodemailer from 'nodemailer';
import { generateOTP } from '@/app/lib/otp';
import Otp from '@/app/models/Otp';
import dbConnect from '@/app/lib/dbConnect';
import rateLimit from '@/app/lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

export async function POST(request) {
  const { email } = await request.json();

  try {
    // Rate limiting
    await limiter.check(request, 3); // 3 requests per minute

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Invalid email format' 
      }), { status: 400 });
    }

    await dbConnect();

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiry

    // Store OTP in database (upsert)
    await Otp.findOneAndUpdate(
      { email },
      { 
        otp, 
        expiresAt,
        $inc: { attempts: 0 }, // Reset attempts on new OTP
        $setOnInsert: { createdAt: new Date() }
      },
      { upsert: true, new: true }
    );

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      pool: true,
      rateLimit: true,
      maxConnections: 1,
      maxMessages: 5
    });

await transporter.sendMail({
  from: `"Tamboo Baba" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: 'Your OTP for Brand Alliance Verification',
  html: `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #18181b; color: #fff; max-width: 480px; margin: 0 auto; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 24px #0003;">
    <!-- Header -->
    <div style="background: linear-gradient(90deg, #f59e0b 0%, #111827 100%); padding: 28px 0 18px 0; text-align: center;">
      <img src="https://tamboobaba.com/hero-image.png" alt="Tamboo Baba Logo" style="height: 54px; margin-bottom: 10px;" />
      <h2 style="color: #fff; font-size: 1.5rem; font-weight: bold; margin: 0;">Brand Alliance Email Verification</h2>
    </div>
    <!-- Body -->
    <div style="padding: 32px 28px 24px 28px; background: #23232a;">
      <p style="color: #fde68a; font-size: 1.08rem; margin-bottom: 18px;">
        Your One-Time Password (OTP) for verifying your email with <b>Tamboo Baba</b> is:
      </p>
        <div style="background:#f59e0b22; border-radius:8px; padding:18px 24px; margin:24px auto; text-align:center;">
          <span style="display:block; color:#fbbf24; font-size:2.2rem; font-weight:bold; letter-spacing:0.4rem;">
            ${otp}
          </span>
        </div>

      <p style="color: #e5e7eb; font-size: 0.99rem; margin-bottom: 12px;">
        This code will expire in <b>15 minutes</b>.
      </p>
      <p style="color: #9ca3af; font-size: 0.95rem;">
        If you did not request this, please ignore this email.
      </p>
    </div>
    <!-- Footer -->
    <div style="background: #111827; color: #fde68a; text-align: center; font-size: 0.98rem; padding: 14px 0;">
      <span>Tamboo Baba Systems &bull; ${new Date().getFullYear()}</span>
      <p style="margin: 0; color: #9ca3af; font-size: 0.88rem;">This message was generated automatically by the Tamboo Baba website.</p>
    </div>
  </div>
  `,
});


    return new Response(JSON.stringify({ 
      success: true,
      message: 'OTP sent successfully'
    }), { status: 200 });

  } catch (error) {
    if (error.message === 'Rate limit exceeded') {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Too many requests. Please try again later.' 
      }), { status: 429 });
    }

    console.error('OTP Send Error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Failed to send OTP. Please try again.' 
    }), { status: 500 });
  }
}