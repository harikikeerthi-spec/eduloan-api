
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();
const API_URL = 'http://127.0.0.1:3000/auth';
const TEST_EMAIL = 'otp_bypass_test@example.com';

async function main() {
    console.log('--- STARTING OTP BYPASS INVESTIGATION ---');

    // 1. Clean up potential previous test user
    await prisma.user.deleteMany({ where: { email: TEST_EMAIL } });
    console.log(`✅ Cleaned up user ${TEST_EMAIL}`);

    // 2. Request OTP
    console.log(`\n📤 Sending OTP to ${TEST_EMAIL}...`);
    try {
        await axios.post(`${API_URL}/send-otp`, { email: TEST_EMAIL });
        console.log('✅ OTP Sent successfully');
    } catch (e: any) {
        console.error('❌ Failed to send OTP:', e.message);
        process.exit(1);
    }

    // 3. Attempt Verify with WRONG OTP
    const WRONG_OTP = '000000'; // Assume this is wrong unless by astronomical chance it matches
    console.log(`\n🕵️ Attempting verification with WRONG OTP: ${WRONG_OTP}...`);

    try {
        const response = await axios.post(`${API_URL}/verify-otp`, {
            email: TEST_EMAIL,
            otp: WRONG_OTP
        });

        console.log('⚠️ UNEXPECTED SUCCESS RESPONSE:', response.data);
        if (response.data.success) {
            console.error('🚨 CRITICAL FAILURE: Backend registered success with wrong OTP!');
        } else {
            console.log('✅ Backend correctly returned failure in response body.');
        }
    } catch (e: any) {
        console.error('❌ Request failed:', e.message);
        if (e.response) {
            console.log(`✅ Backend returned error status: ${e.response.status}`);
            console.log('Response data:', e.response.data);
        }
    }

    // 4. Check Database for User Creation
    console.log('\n🔎 Checking Database for User Creation...');
    const user = await prisma.user.findUnique({ where: { email: TEST_EMAIL } });

    if (user) {
        console.error('🚨 CRITICAL FAILURE: User WAS created despite wrong OTP!');
        console.error('User details:', user);
    } else {
        console.log('✅ PASS: User was NOT created.');
    }

    console.log('-----------------------------------------');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
