// Test invalid credentials
const invalidLoginTest = {
    "email": "wrong@email.com",
    "password": "wrongpassword",
    "expectedStatus": 500
};

// Test missing fields
const missingFieldsTest = {
    "email": "",
    "password": "",
    "expectedStatus": 400
};

// Test invalid action
const invalidActionTest = {
    "action": "invalid",
    "expectedStatus": 400
};

// Test session persistence
const sessionTest = async () => {
    // 1. Login
    // 2. Get current user
    // 3. Verify user data matches
    // 4. Logout
    // 5. Verify logged out
};
