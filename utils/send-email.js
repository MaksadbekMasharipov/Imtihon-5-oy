const nodemailer = require("nodemailer")
const CustomErrorhandler = require("../error/custom-error.handler")

async function sendMessaege(code, email, username, bookName = "") {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "maksadbekmasharipov@gmail.com",
                pass: process.env.GOOGLE_PASS
            }
        })

        await transporter.sendMail({
            subject: "Lesson",
            from: "maksadbekmasharipov@gmail.com",
            to: email,
            html: `
            <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">
      <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:40px auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#4f46e5,#7c3aed); padding:30px; text-align:center; color:#ffffff;">
            <h1 style="margin:0; font-size:24px;">📚 BookVerse</h1>
            <p style="margin:8px 0 0; font-size:14px; opacity:0.9;">Kitoblar olamiga xush kelibsiz</p>
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:30px;">
            <h2 style="margin-top:0; color:#111827;">Salom, ${username} 👋</h2>
            <p style="color:#4b5563; line-height:1.6;">
              Tizimga ro'yxatdan o'tish uchun quyidagi tasdiqlash kodini kiriting:
            </p>

            <div style="text-align:center; margin:30px 0;">
              <div style="display:inline-block; padding:20px 40px; background:linear-gradient(135deg,#4f46e5,#7c3aed); color:#ffffff; border-radius:12px; font-size:32px; font-weight:bold; letter-spacing:8px;">
                ${code}
              </div>
            </div>

            <p style="color:#4b5563; line-height:1.6; text-align:center;">
              Kod 2 daqiqa davomida amal qiladi.
            </p>

            <p style="font-size:13px; color:#9ca3af; margin-top:30px;">
              Agar bu amalni siz bajarmagan bo‘lsangiz, iltimos support bilan bog‘laning.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#6b7280;">
            © ${new Date().getFullYear()} BookVerse. Barcha huquqlar himoyalangan.
          </td>
        </tr>

      </table>
    </body>
    </html> `
        })
    } catch (error) {
        throw CustomErrorhandler.InternalServerError(error.message)
    }
}

module.exports = sendMessaege