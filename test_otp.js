
const API_URL = 'http://127.0.0.1:3000/auth';
const TEST_EMAIL = 'otp_bypass_test_js@example.com';

async function main() {
    console.log('--- STARTING JS OTP TEST ---');

    // 1. Send OTP
    console.log(`\n📤 Sending OTP to ${TEST_EMAIL}...`);
    try {
        const res = await fetch(`${API_URL}/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: TEST_EMAIL })
        });
        const data = await res.json();
        console.log(`Status: ${res.status}`);
        console.log('Response:', data);
    } catch (e) {
        console.error('❌ Failed to send OTP:', e.message);
        return;
    }

    // 2. Verify WRONG OTP
    const WRONG_OTP = '000000';
    console.log(`\n🕵️ Attempting verification with WRONG OTP: ${WRONG_OTP}...`);

    try {
        const res = await fetch(`${API_URL}/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: TEST_EMAIL, otp: WRONG_OTP })
        });
        const data = await res.json();

        console.log(`Status: ${res.status}`);
        console.log('Response:', data);

        if (data.success) {
            console.error('🚨 CRITICAL FAILURE: Backend registered success with wrong OTP!');
        } else {
            console.log('✅ Backend correctly returned failure.');
        }

    } catch (e) {
        console.error('❌ Request failed:', e.message);
    }
}

main();
