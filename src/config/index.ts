import dotenv from 'dotenv';
import path from 'path'


dotenv.config({ path: path.join(process.cwd(), '.env') })


export default {
    PORT: process.env.PORT || 5200,
    DATABASE_URL: process.env.DATABASE_URL,
    env: process.env.NODE_ENV,
    // JWT_SECRET: process.env.jWT_ACTIVATION_KEY || '451d5ac7e5b7912fd408310dbccdf0cd49c9f72b58c53af630e421dd580b460ad2ca3f7f344deeb1',
    // JWT_FORGET: process.env.jWT_FORGET_KEY || '451d5ac7e5b7912fd408310dbccdd580b460ad2ca3f7f344deeb1asd65f4a5ds1f8a3f4a68dsf43asdf468as4f8f',
    // SMTP_USERNAME: process.env.GOOGLE_SMTP_MAIL_APP_USERNAME,
    // SMTP_PASSWORD: process.env.GOOGLE_SMTP_MAIL_APP_PASSWORD,
    // CLINT_URL: process.env.CLINT_URL,
}