import { NextResponse } from "next/server";
import AWS from 'aws-sdk';

// Configure AWS Lambda
const lambda = new AWS.Lambda({
  region: process.env.EMAIL_REGION || 'us-east-1',
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

// Email templates
const adminCareerEmailTemplate = (formData) => `
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
        .value { background: white; padding: 10px; border-radius: 5px; border-left: 4px solid #28a745; }
        .footer { text-align: center; margin-top: 20px; color: #6c757d; font-size: 14px; }
        .attachment-info { background: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💼 New Career Application Received</h1>
            <p>Nexcura Healthcare - Career Form</p>
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
            <div class="field">
                <span class="label">📱 Phone:</span>
                <div class="value">${formData.phone}</div>
            </div>
            ${formData.position ? `
            <div class="field">
                <span class="label">💼 Position:</span>
                <div class="value">${formData.position}</div>
            </div>
            ` : ""}
            ${formData.experience ? `
            <div class="field">
                <span class="label">📈 Experience:</span>
                <div class="value">${formData.experience}</div>
            </div>
            ` : ""}
            ${formData.location ? `
            <div class="field">
                <span class="label">📍 Location:</span>
                <div class="value">${formData.location}</div>
            </div>
            ` : ""}
            ${formData.currentCompany ? `
            <div class="field">
                <span class="label">🏢 Current Company:</span>
                <div class="value">${formData.currentCompany}</div>
            </div>
            ` : ""}
            ${formData.expectedSalary ? `
            <div class="field">
                <span class="label">💰 Expected Salary:</span>
                <div class="value">${formData.expectedSalary}</div>
            </div>
            ` : ""}
            <div class="field">
                <span class="label">💬 Message:</span>
                <div class="value">${formData.message}</div>
            </div>
            ${formData.resumeAttached ? `
            <div class="attachment-info">
                <span class="label">📎 Resume Attached:</span>
                <div class="value">
                    <strong>File:</strong> ${formData.resumeFileName}<br>
                    <strong>Size:</strong> ${formData.resumeFileSize}<br>
                    <strong>Type:</strong> ${formData.resumeFileType}
                </div>
            </div>
            ` : ""}
        </div>
        <div class="footer">
            <p>This career application was received from the Nexcura Healthcare website.</p>
        </div>
    </div>
</body>
</html>
`;

const userCareerThankYouTemplate = (formData) => `
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
            <h1>Thank You for Your Application!</h1>
            <p>Nexcura Healthcare</p>
        </div>
        <div class="content">
            <h2>Hello ${formData.name},</h2>
            <p>Thank you for your interest in joining the Nexcura Healthcare team. We have received your application and will review it carefully.</p>
            
            ${formData.position ? `
            <div class="info-box">
                <h3>Your Application</h3>
                <p><strong>Position:</strong> ${formData.position}</p>
                <p>Our HR team will review your qualifications and get back to you within 5-7 business days.</p>
            </div>
            ` : ""}

            <div class="info-box">
                <h3>Why Join Nexcura Healthcare?</h3>
                <p>While we review your application, here's what makes our team special:</p>
                <ul>
                    <li>Cutting-edge AI and healthcare technology</li>
                    <li>Innovation-driven work environment</li>
                    <li>Continuous learning and growth opportunities</li>
                    <li>Making a real impact in healthcare</li>
                    <li>Collaborative and supportive team culture</li>
                    <li>Work-life balance and competitive benefits</li>
                </ul>
            </div>

            <div style="text-align: center;">
                <a href="https://www.genaihealth.care/" class="cta">Learn More About Us</a>
            </div>

            <div class="footer">
                <p><strong>Questions about your application?</strong></p>
                <p>📧 Email: contact.us@genaihealth.care</p>
                <p>🌐 Visit us at: https://www.genaihealth.care/</p>
                <hr style="margin: 20px 0; border: none; border-top: 1px solid #dee2e6;">
                <p style="font-size: 12px;">This email was sent because you submitted a career application through our website. If you have any questions, please reply to this email.</p>
                <p style="font-size: 12px;"><strong>Note:</strong> Please do not reply with additional documents. If you need to update your application, please submit a new one through our website.</p>
            </div>
        </div>
    </div>
</body>
</html>
`;

export async function POST(request) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");
    const position = formData.get("position");
    const experience = formData.get("experience");
    const location = formData.get("location");
    const currentCompany = formData.get("currentCompany");
    const expectedSalary = formData.get("expectedSalary");
    const resume = formData.get("resume");

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, phone, message)" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Prepare form data object for email templates
    const emailFormData = {
      name,
      email,
      phone,
      message,
      position,
      experience,
      location,
      currentCompany,
      expectedSalary,
      resumeAttached: !!resume,
      resumeFileName: resume ? resume.name : null,
      resumeFileSize: resume ? `${(resume.size / 1024).toFixed(2)} KB` : null,
      resumeFileType: resume ? resume.type : null,
    };

    // Validate file if resume is attached
    if (resume) {
      // Validate file type (allow common resume formats)
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ];

      if (!allowedTypes.includes(resume.type)) {
        return NextResponse.json(
          {
            error:
              "Invalid file type. Please upload PDF, DOC, DOCX, or TXT files only.",
          },
          { status: 400 }
        );
      }

      // Validate file size (max 5MB)
      if (resume.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          {
            error: "File size too large. Please upload files smaller than 5MB.",
          },
          { status: 400 }
        );
      }
    }

    // Validate AWS SES configuration
    if (!process.env.ACCESS_KEY_ID || !process.env.SECRET_ACCESS_KEY) {
      console.error("Missing AWS SES environment variables");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const fromEmail = process.env.FROM_EMAIL || 'noreply@genaihealth.care';
    const adminEmail = process.env.ADMIN_EMAIL || fromEmail;

    // Prepare email parameters
    const adminParams = {
      Source: fromEmail,
      Destination: {
        ToAddresses: [adminEmail]
      },
      Message: {
        Subject: {
          Data: `💼 New Career Application from ${name}${position ? ` - ${position}` : ""}`,
          Charset: 'UTF-8'
        },
        Body: {
          Html: {
            Data: adminCareerEmailTemplate(emailFormData),
            Charset: 'UTF-8'
          }
        }
      }
    };

    const userParams = {
      Source: fromEmail,
      Destination: {
        ToAddresses: [email]
      },
      Message: {
        Subject: {
          Data: `Thank you for your application to Nexcura Healthcare!`,
          Charset: 'UTF-8'
        },
        Body: {
          Html: {
            Data: userCareerThankYouTemplate(emailFormData),
            Charset: 'UTF-8'
          }
        }
      }
    };

    // Call Lambda function
    const lambdaFunctionName = process.env.LAMBDA_FUNCTION_NAME || 'sendEmail';
    
    console.log("Calling Lambda function for career application:", lambdaFunctionName);
    
    const lambdaParams = {
      FunctionName: lambdaFunctionName,
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify({
        formData: emailFormData,
        emailType: 'career'
      })
    };

    const lambdaResult = await lambda.invoke(lambdaParams).promise();
    
    if (lambdaResult.StatusCode !== 200) {
      throw new Error(`Lambda function failed with status: ${lambdaResult.StatusCode}`);
    }
    
    const response = JSON.parse(lambdaResult.Payload);
    
    if (response.statusCode !== 200) {
      throw new Error(response.body || 'Lambda function error');
    }
    
    const result = JSON.parse(response.body);
    console.log("Lambda function result for career:", result);

    return NextResponse.json({
      message: "Career application submitted successfully",
      success: true,
      messageIds: result.messageIds
    });

  } catch (error) {
    console.error("Error processing career application:", error);
    return NextResponse.json(
      {
        error: "Failed to process career application",
        details: error.message,
      },
      { status: 500 }
    );
  }
}