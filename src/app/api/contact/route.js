import { NextResponse } from "next/server";
import AWS from 'aws-sdk';

// Configure AWS Lambda
const lambda = new AWS.Lambda({
  region: process.env.EMAIL_REGION || 'us-east-1',
  accessKeyId: process.env.ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY,
});

// Simple in-memory rate limiting (resets on server restart)
const rateLimitMap = new Map();

function checkRateLimit(identifier) {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 3; // Max 3 requests per minute

  const userRequests = rateLimitMap.get(identifier) || [];
  const recentRequests = userRequests.filter(time => now - time < windowMs);

  if (recentRequests.length >= maxRequests) {
    return false; // Rate limit exceeded
  }

  recentRequests.push(now);
  rateLimitMap.set(identifier, recentRequests);
  return true; // OK
}

// Email templates
const adminEmailTemplate = (formData) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #495057; margin-bottom: 5px; display: block; }
        .value { background: white; padding: 10px; border-radius: 5px; border-left: 4px solid #007bff; }
        .footer { text-align: center; margin-top: 20px; color: #6c757d; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Contact Form Submission</h1>
            <p>Nexcura Healthcare - Contact Form</p>
        </div>
        <div class="content">
            <div class="field">
                <span class="label">👤 Name:</span>
                <div class="value">${formData.name}</div>
            </div>
            <div class="field">
                <span class="label">📧 Email:</span>
                <div class="value">${formData.email}</div>
            </div>
            ${formData.company ? `
            <div class="field">
                <span class="label">🏢 Company:</span>
                <div class="value">${formData.company}</div>
            </div>
            ` : ""}
            ${formData.appointmentDate ? `
            <div class="field">
                <span class="label">📅 Preferred Date:</span>
                <div class="value">${formData.appointmentDate}</div>
            </div>
            ` : ""}
            <div class="field">
                <span class="label">💬 Message:</span>
                <div class="value">${formData.message}</div>
            </div>
        </div>
        <div class="footer">
            <p>This submission was received from the Nexcura Healthcare website.</p>
        </div>
    </div>
</body>
</html>
`;

const userThankYouTemplate = (formData) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .cta { background: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
        .info-box { background: #e9ecef; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 20px; color: #6c757d; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Thank You for Contacting Us!</h1>
            <p>Nexcura Healthcare</p>
        </div>
        <div class="content">
            <h2>Hello ${formData.name},</h2>
            <p>Thank you for reaching out to Nexcura Healthcare. We have received your message and will get back to you within 24 hours.</p>
            
            ${formData.type === "appointment" ? `
            <div class="info-box">
                <h3>Your Demo Request</h3>
                <p>We've noted your interest in scheduling a demo. Our team will contact you soon to arrange a convenient time.</p>
            </div>
            ` : ""}
            
            ${formData.type === "cta-inquiry" ? `
            <div class="info-box">
                <h3>Your Inquiry</h3>
                <p>Thank you for your interest in our services. We'll provide you with detailed information about how Nexcura can help your organization.</p>
            </div>
            ` : ""}

            <div class="info-box">
                <h3>Why Choose Nexcura?</h3>
                <p>While you wait, here's what makes us special:</p>
                <ul>
                    <li>AI-powered healthcare solutions</li>
                    <li>Personalized health insights</li>
                    <li>Secure data management</li>
                    <li>Continuous innovation in healthcare technology</li>
                </ul>
            </div>

            <div style="text-align: center; text-color: white;">
                <a href="https://www.genaihealth.care/" class="cta">Explore Our Platform</a>
            </div>

            <div class="footer">
                <p><strong>Need immediate assistance?</strong></p>
                <p>📧 Email: contact.us@genaihealth.care</p>
                <p>🌐 Visit us at: https://www.genaihealth.care/</p>
                <hr style="margin: 20px 0; border: none; border-top: 1px solid #dee2e6;">
                <p style="font-size: 12px;">This email was sent because you contacted us through our website. If you have any questions, please reply to this email.</p>
            </div>
        </div>
    </div>
</body>
</html>
`;

// Function to verify reCAPTCHA token
async function verifyRecaptcha(token) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.error("reCAPTCHA secret key not configured");
    return { success: false, error: "reCAPTCHA not configured" };
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return { success: false, error: error.message };
  }
}

export async function POST(request) {
  try {
    console.log("Contact API called");

    const { formData } = await request.json();
    
    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
                request.headers.get('x-real-ip') || 
                'unknown';
    
    // Rate limiting check
    if (!checkRateLimit(ip)) {
      console.log(`Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json({ 
        error: "Too many requests. Please try again later." 
      }, { status: 429 });
    }

    // Check if honeypot was filled (bot detection)
    if (formData.honeypot) {
      console.log("Honeypot triggered - bot detected");
      return NextResponse.json({ 
        error: "Invalid submission" 
      }, { status: 400 });
    }

    // Verify reCAPTCHA
    if (formData.recaptchaToken) {
      const recaptchaResult = await verifyRecaptcha(formData.recaptchaToken);
      
      if (!recaptchaResult.success) {
        console.error("reCAPTCHA verification failed:", recaptchaResult);
        return NextResponse.json({ 
          error: "reCAPTCHA verification failed. Please try again." 
        }, { status: 400 });
      }
      
      // Check reCAPTCHA score if using v3 (optional)
      if (recaptchaResult.score && recaptchaResult.score < 0.5) {
        console.log(`Low reCAPTCHA score: ${recaptchaResult.score}`);
        return NextResponse.json({ 
          error: "Suspicious activity detected. Please try again." 
        }, { status: 400 });
      }
      
      console.log("reCAPTCHA verified successfully");
    } else {
      return NextResponse.json({ 
        error: "reCAPTCHA token missing" 
      }, { status: 400 });
    }

    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Additional spam detection
    const spamKeywords = ['viagra', 'cialis', 'lottery', 'casino', 'crypto', 'bitcoin'];
    const messageText = (formData.message + ' ' + formData.name).toLowerCase();
    if (spamKeywords.some(keyword => messageText.includes(keyword))) {
      console.log("Spam keywords detected");
      return NextResponse.json({ 
        error: "Invalid content detected" 
      }, { status: 400 });
    }

    // Validate AWS credentials
    const accessKeyId = process.env.ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;

    if (!accessKeyId || !secretAccessKey) {
      console.error("AWS credentials missing!");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    // Remove recaptchaToken and timestamp before sending to Lambda (already verified)
    const { recaptchaToken, timestamp, honeypot, ...cleanFormData } = formData;

    // Call Lambda function
    const lambdaFunctionName = process.env.LAMBDA_FUNCTION_NAME || 'sendEmail';
    
    console.log("Calling Lambda function:", lambdaFunctionName);
    console.log("Environment variables:", {
      ACCESS_KEY_ID: !!process.env.ACCESS_KEY_ID,
      SECRET_ACCESS_KEY: !!process.env.SECRET_ACCESS_KEY,
      LAMBDA_FUNCTION_NAME: process.env.LAMBDA_FUNCTION_NAME,
      EMAIL_REGION: process.env.EMAIL_REGION
    });
    
    const lambdaParams = {
      FunctionName: lambdaFunctionName,
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify({
        formData: cleanFormData,
        emailType: 'contact'
      })
    };

    const lambdaResult = await lambda.invoke(lambdaParams).promise();
    
    if (lambdaResult.StatusCode !== 200) {
      throw new Error(`Lambda function failed with status: ${lambdaResult.StatusCode}`);
    }
    
    const response = JSON.parse(lambdaResult.Payload);
    console.log("Lambda response:", response);
    
    if (response.statusCode !== 200) {
      throw new Error(response.body || 'Lambda function error');
    }
    
    const result = JSON.parse(response.body);
    console.log("Lambda function result:", result);

    return NextResponse.json({
      message: "Emails sent successfully",
      success: true,
      messageIds: result.messageIds
    });

  } catch (error) {
    console.error("SES send failed:", error);
    return NextResponse.json({ error: "Failed to send emails", details: error.message }, { status: 500 });
  }
}
