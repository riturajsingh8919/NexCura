import { NextResponse } from "next/server";
import AWS from 'aws-sdk';

// Configure AWS Lambda
const lambda = new AWS.Lambda({
  region: process.env.EMAIL_REGION || 'us-east-1',
  accessKeyId: process.env.ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY,
});

// Transaction email templates
const adminTransactionEmailTemplate = (transactionData) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #495057; margin-bottom: 5px; display: block; }
        .value { background: white; padding: 10px; border-radius: 5px; border-left: 4px solid #28a745; }
        .footer { text-align: center; margin-top: 20px; color: #6c757d; font-size: 14px; }
        .order-items { background: #e9ecef; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .order-item { display: flex; justify-content: space-between; margin-bottom: 10px; padding: 8px 0; border-bottom: 1px solid #dee2e6; }
        .order-item:last-child { border-bottom: none; }
        .total-section { background: #d4edda; padding: 15px; border-radius: 5px; margin-top: 15px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Transaction Completed</h1>
            <p>Nexcura Healthcare - Smart Ring Purchase</p>
        </div>
        <div class="content">
            <div class="field">
                <span class="label">👤 Customer Name:</span>
                <div class="value">${transactionData.customerName}</div>
            </div>
            <div class="field">
                <span class="label">📧 Customer Email:</span>
                <div class="value">${transactionData.customerEmail}</div>
            </div>
            <div class="field">
                <span class="label">🆔 Order ID:</span>
                <div class="value">${transactionData.orderId}</div>
            </div>
            <div class="field">
                <span class="label">📅 Order Date:</span>
                <div class="value">${transactionData.orderDate}</div>
            </div>
            <div class="field">
                <span class="label">💳 Payment Status:</span>
                <div class="value" style="color: #28a745; font-weight: bold;">Completed</div>
            </div>
            
            <div class="order-items">
                <h3 style="margin-top: 0; color: #495057;">📦 Order Items:</h3>
                ${transactionData.items.map(item => `
                    <div class="order-item">
                        <div>
                            <strong>${item.name || 'NexCura Smart Ring'}</strong><br>
                            <small>Color: ${item.color || 'Selected'} | Size: ${item.size || 'Selected'} | Qty: ${item.quantity || 1}</small>
                        </div>
                        <div>$${item.price || '0'}</div>
                    </div>
                `).join('')}
                
                <div class="total-section">
                    <div class="order-item" style="border-bottom: 2px solid #28a745;">
                        <div>Total Amount:</div>
                        <div>$${transactionData.totalAmount || '0'}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <p>This transaction was completed through the Nexcura Healthcare website.</p>
            <p><strong>Next Steps:</strong> Process the order and prepare for shipment.</p>
        </div>
    </div>
</body>
</html>
`;

const userTransactionEmailTemplate = (transactionData) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .cta { background: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
        .info-box { background: #e9ecef; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .order-summary { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #28a745; }
        .order-item { display: flex; justify-content: space-between; margin-bottom: 10px; padding: 8px 0; border-bottom: 1px solid #dee2e6; }
        .order-item:last-child { border-bottom: none; }
        .total-section { background: #d4edda; padding: 15px; border-radius: 5px; margin-top: 15px; font-weight: bold; }
        .footer { text-align: center; margin-top: 20px; color: #6c757d; font-size: 14px; }
        .status-badge { background: #28a745; color: white; padding: 5px 15px; border-radius: 20px; font-size: 14px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Thank You for Your Purchase!</h1>
            <p>Nexcura Healthcare - Smart Ring Order Confirmation</p>
        </div>
        <div class="content">
            <h2>Hello ${transactionData.customerName},</h2>
            <p>Thank you for choosing Nexcura Healthcare! Your order has been successfully processed and confirmed.</p>
            
            <div class="info-box">
                <h3>Order Summary</h3>
                <p><strong>Order ID:</strong> ${transactionData.orderId}</p>
                <p><strong>Order Date:</strong> ${transactionData.orderDate}</p>
                <p><strong>Status:</strong> <span class="status-badge">Confirmed</span></p>
            </div>
            
            <div class="order-summary">
                <h3 style="margin-top: 0; color: #495057;">📦 Your Order Items:</h3>
                ${transactionData.items.map(item => `
                    <div class="order-item">
                        <div>
                            <strong>${item.name || 'NexCura Smart Ring'}</strong><br>
                            <small>Color: ${item.color || 'Selected'} | Size: ${item.size || 'Selected'} | Quantity: ${item.quantity || 1}</small>
                        </div>
                        <div>$${item.price || '0'}</div>
                    </div>
                `).join('')}
                
                <div class="total-section">
                    <div class="order-item" style="border-bottom: 2px solid #28a745;">
                        <div>Total Amount:</div>
                        <div>$${transactionData.totalAmount || '0'}</div>
                    </div>
                </div>
            </div>
            
            <div class="info-box">
                <h3>What's Next?</h3>
                <ul>
                    <li>Set up your health profile for personalized insights</li>
                    <li>Learn about your new Smart Ring features</li>
                    <li>Join our community for health tips and support</li>
                </ul>
            </div>
            
            <div style="text-align: center;">
                <a href="https://www.genaihealth.care/" class="cta">Download Nexcura App</a>
            </div>
            
            <div class="footer">
                <p><strong>Questions about your order?</strong></p>
                <p>📧 Email: contact.us@genaihealth.care</p>
                <p>🌐 Visit us at: https://www.genaihealth.care/</p>
                <hr style="margin: 20px 0; border: none; border-top: 1px solid #dee2e6;">
                <p style="font-size: 12px;">This is your order confirmation. Please keep this email for your records.</p>
                <p style="font-size: 12px;">Order ID: ${transactionData.orderId} | Date: ${transactionData.orderDate}</p>
            </div>
        </div>
    </div>
</body>
</html>
`;

export async function POST(request) {
  try {
    console.log("Transaction email API called");

    const transactionData = await request.json();
    console.log("Transaction data received:", JSON.stringify(transactionData, null, 2));
    
    // Validate required fields
    if (!transactionData.customerName || !transactionData.customerEmail || !transactionData.orderId) {
      return NextResponse.json({ 
        error: "Missing required fields: customerName, customerEmail, orderId" 
      }, { status: 400 });
    }

    // Validate AWS credentials
    const accessKeyId = process.env.ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;

    if (!accessKeyId || !secretAccessKey) {
      console.error("AWS credentials missing!");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    // Call Lambda function
    const lambdaFunctionName = process.env.LAMBDA_FUNCTION_NAME || 'sendEmail';
    
    console.log("Calling Lambda function for transaction email:", lambdaFunctionName);
    
    const lambdaParams = {
      FunctionName: lambdaFunctionName,
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify({
        formData: transactionData,
        emailType: 'transaction'
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
      message: "Transaction emails sent successfully",
      success: true,
      messageIds: result.messageIds
    });

  } catch (error) {
    console.error("Error processing transaction email:", error);
    return NextResponse.json(
      {
        error: "Failed to send transaction emails",
        details: error.message,
      },
      { status: 500 }
    );
  }
}