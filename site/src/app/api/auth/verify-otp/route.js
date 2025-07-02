import Otp from '@/app/models/Otp';
import dbConnect from '@/app/lib/dbConnect';

export async function POST(request) {
  const { email, otp } = await request.json();

  try {
    await dbConnect();

    // Find OTP record
    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'OTP not found or expired' 
      }), { status: 404 });
    }

    // Check attempts
    if (otpRecord.attempts >= 5) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Too many attempts. Please request a new OTP.' 
      }), { status: 429 });
    }

    // Check expiry
    if (new Date() > otpRecord.expiresAt) {
      await Otp.deleteOne({ email });
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'OTP expired. Please request a new one.' 
      }), { status: 400 });
    }

    // Verify OTP
    if (otpRecord.otp !== otp) {
      await Otp.updateOne(
        { email },
        { $inc: { attempts: 1 } }
      );
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Invalid OTP' 
      }), { status: 400 });
    }

    // OTP verified - delete the record
    await Otp.deleteOne({ email });

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Email verified successfully'
    }), { status: 200 });

  } catch (error) {
    console.error('OTP Verify Error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Failed to verify OTP' 
    }), { status: 500 });
  }
}