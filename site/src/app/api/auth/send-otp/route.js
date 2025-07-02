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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f59e0b;">Tamboo Baba Brand Alliance Verification</h2>
          <p>Your OTP code is:</p>
          <h1 style="font-size: 2.5rem; color: #f59e0b; letter-spacing: 0.5rem;">${otp}</h1>
          <p>This code will expire in 15 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <hr style="border: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #777;">Tamboo Baba Event Management</p>
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