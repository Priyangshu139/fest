# Users API Reference - Docs - Appwrite
The Users service allows you to manage your project users. Use this service to search, block, and view your users' info, current sessions, and latest activity logs. You can also use the Users service to edit your users' preferences and personal info.

```
https://cloud.appwrite.io/v1

```


### [List users](#list)

Get a list of all the project's users. You can use the query params to filter your results.

*   Request
    
    *   queries array
        
        Array of query strings generated using the Query class provided by the SDK. [Learn more about queries](https://appwrite.io/docs/queries). Maximum of 100 queries are allowed, each 4096 characters long. You may filter on the following attributes: name, email, phone, status, passwordUpdate, registration, emailVerification, phoneVerification, labels
        
    *   search string
        
        Search term to filter your list results. Max length: 256 chars.
        
    
*   Response
    
    *   200 application/json
        
    

```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.list(
    [], // queries (optional)
    '<SEARCH>' // search (optional)
);

```


### [Create user](#create)

Create a new user.

*   Request
    
    *   userId string
        
        required
        
        User ID. Choose a custom ID or generate a random ID with `ID.unique()`. Valid chars are a-z, A-Z, 0-9, period, hyphen, and underscore. Can't start with a special char. Max length is 36 chars.
        
    *   email string
        
        User email.
        
    *   phone string
        
        Phone number. Format this number with a leading '+' and a country code, e.g., +16175551212.
        
    *   password string
        
        Plain text user password. Must be at least 8 chars.
        
    *   name string
        
        User name. Max length: 128 chars.
        
    
*   Response
    
    *   201 application/json
        
    

```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.create(
    '<USER_ID>', // userId
    'email@example.com', // email (optional)
    '+12065550100', // phone (optional)
    '', // password (optional)
    '<NAME>' // name (optional)
);

```


### [Create user with Argon2 password](#createArgon2User)

Create a new user. Password provided must be hashed with the [Argon2](https://en.wikipedia.org/wiki/Argon2) algorithm. Use the [POST /users](https://appwrite.io/docs/server/users#usersCreate) endpoint to create users with a plain text password.

*   Request
    
    *   userId string
        
        required
        
        User ID. Choose a custom ID or generate a random ID with `ID.unique()`. Valid chars are a-z, A-Z, 0-9, period, hyphen, and underscore. Can't start with a special char. Max length is 36 chars.
        
    *   email string
        
        required
        
        User email.
        
    *   password string
        
        required
        
        User password hashed using Argon2.
        
    *   name string
        
        User name. Max length: 128 chars.
        
    
*   Response
    
    *   201 application/json
        
    

```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.createArgon2User(
    '<USER_ID>', // userId
    'email@example.com', // email
    'password', // password
    '<NAME>' // name (optional)
);

```


### [Create user with bcrypt password](#createBcryptUser)

Create a new user. Password provided must be hashed with the [Bcrypt](https://en.wikipedia.org/wiki/Bcrypt) algorithm. Use the [POST /users](https://appwrite.io/docs/server/users#usersCreate) endpoint to create users with a plain text password.

*   Request
    
    *   userId string
        
        required
        
        User ID. Choose a custom ID or generate a random ID with `ID.unique()`. Valid chars are a-z, A-Z, 0-9, period, hyphen, and underscore. Can't start with a special char. Max length is 36 chars.
        
    *   email string
        
        required
        
        User email.
        
    *   password string
        
        required
        
        User password hashed using Bcrypt.
        
    *   name string
        
        User name. Max length: 128 chars.
        
    
*   Response
    
    *   201 application/json
        
    

```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.createBcryptUser(
    '<USER_ID>', // userId
    'email@example.com', // email
    'password', // password
    '<NAME>' // name (optional)
);

```


### [List identities](#listIdentities)

Get identities for all users.

*   Request
    
    *   queries array
        
        Array of query strings generated using the Query class provided by the SDK. [Learn more about queries](https://appwrite.io/docs/queries). Maximum of 100 queries are allowed, each 4096 characters long. You may filter on the following attributes: userId, provider, providerUid, providerEmail, providerAccessTokenExpiry
        
    *   search string
        
        Search term to filter your list results. Max length: 256 chars.
        
    
*   Response
    
    *   200 application/json
        
    

```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.listIdentities(
    [], // queries (optional)
    '<SEARCH>' // search (optional)
);

```


### [Delete identity](#deleteIdentity)

Delete an identity by its unique ID.

*   Request
    
    *   identityId string
        
        required
        
        Identity ID.
        
    
*   Response
    
    *   204 application/json
        
    

```
DELETE /users/identities/{identityId}

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.deleteIdentity(
    '<IDENTITY_ID>' // identityId
);

```


### [Create user with MD5 password](#createMD5User)

Create a new user. Password provided must be hashed with the [MD5](https://en.wikipedia.org/wiki/MD5) algorithm. Use the [POST /users](https://appwrite.io/docs/server/users#usersCreate) endpoint to create users with a plain text password.

*   Request
    
    *   userId string
        
        required
        
        User ID. Choose a custom ID or generate a random ID with `ID.unique()`. Valid chars are a-z, A-Z, 0-9, period, hyphen, and underscore. Can't start with a special char. Max length is 36 chars.
        
    *   email string
        
        required
        
        User email.
        
    *   password string
        
        required
        
        User password hashed using MD5.
        
    *   name string
        
        User name. Max length: 128 chars.
        
    
*   Response
    
    *   201 application/json
        
    

```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.createMD5User(
    '<USER_ID>', // userId
    'email@example.com', // email
    'password', // password
    '<NAME>' // name (optional)
);

```


### [Create user with PHPass password](#createPHPassUser)

Create a new user. Password provided must be hashed with the [PHPass](https://www.openwall.com/phpass/) algorithm. Use the [POST /users](https://appwrite.io/docs/server/users#usersCreate) endpoint to create users with a plain text password.

*   Request
    
    *   userId string
        
        required
        
        User ID. Choose a custom ID or pass the string `ID.unique()`to auto generate it. Valid chars are a-z, A-Z, 0-9, period, hyphen, and underscore. Can't start with a special char. Max length is 36 chars.
        
    *   email string
        
        required
        
        User email.
        
    *   password string
        
        required
        
        User password hashed using PHPass.
        
    *   name string
        
        User name. Max length: 128 chars.
        
    
*   Response
    
    *   201 application/json
        
    

```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.createPHPassUser(
    '<USER_ID>', // userId
    'email@example.com', // email
    'password', // password
    '<NAME>' // name (optional)
);

```


### [Create user with Scrypt password](#createScryptUser)

Create a new user. Password provided must be hashed with the [Scrypt](https://github.com/Tarsnap/scrypt) algorithm. Use the [POST /users](https://appwrite.io/docs/server/users#usersCreate) endpoint to create users with a plain text password.

*   Request
    
    *   userId string
        
        required
        
        User ID. Choose a custom ID or generate a random ID with `ID.unique()`. Valid chars are a-z, A-Z, 0-9, period, hyphen, and underscore. Can't start with a special char. Max length is 36 chars.
        
    *   email string
        
        required
        
        User email.
        
    *   password string
        
        required
        
        User password hashed using Scrypt.
        
    *   passwordSalt string
        
        required
        
        Optional salt used to hash password.
        
    *   passwordCpu integer
        
        required
        
        Optional CPU cost used to hash password.
        
    *   passwordMemory integer
        
        required
        
        Optional memory cost used to hash password.
        
    *   passwordParallel integer
        
        required
        
        Optional parallelization cost used to hash password.
        
    *   passwordLength integer
        
        required
        
        Optional hash length used to hash password.
        
    *   name string
        
        User name. Max length: 128 chars.
        
    
*   Response
    
    *   201 application/json
        
    

```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.createScryptUser(
    '<USER_ID>', // userId
    'email@example.com', // email
    'password', // password
    '<PASSWORD_SALT>', // passwordSalt
    null, // passwordCpu
    null, // passwordMemory
    null, // passwordParallel
    null, // passwordLength
    '<NAME>' // name (optional)
);

```


### [Create user with Scrypt modified password](#createScryptModifiedUser)

Create a new user. Password provided must be hashed with the [Scrypt Modified](https://gist.github.com/Meldiron/eecf84a0225eccb5a378d45bb27462cc) algorithm. Use the [POST /users](https://appwrite.io/docs/server/users#usersCreate) endpoint to create users with a plain text password.

*   Request
    
    *   userId string
        
        required
        
        User ID. Choose a custom ID or generate a random ID with `ID.unique()`. Valid chars are a-z, A-Z, 0-9, period, hyphen, and underscore. Can't start with a special char. Max length is 36 chars.
        
    *   email string
        
        required
        
        User email.
        
    *   password string
        
        required
        
        User password hashed using Scrypt Modified.
        
    *   passwordSalt string
        
        required
        
        Salt used to hash password.
        
    *   passwordSaltSeparator string
        
        required
        
        Salt separator used to hash password.
        
    *   passwordSignerKey string
        
        required
        
        Signer key used to hash password.
        
    *   name string
        
        User name. Max length: 128 chars.
        
    
*   Response
    
    *   201 application/json
        
    

```
POST /users/scrypt-modified

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.createScryptModifiedUser(
    '<USER_ID>', // userId
    'email@example.com', // email
    'password', // password
    '<PASSWORD_SALT>', // passwordSalt
    '<PASSWORD_SALT_SEPARATOR>', // passwordSaltSeparator
    '<PASSWORD_SIGNER_KEY>', // passwordSignerKey
    '<NAME>' // name (optional)
);

```


### [Create user with SHA password](#createSHAUser)

Create a new user. Password provided must be hashed with the [SHA](https://en.wikipedia.org/wiki/Secure_Hash_Algorithm) algorithm. Use the [POST /users](https://appwrite.io/docs/server/users#usersCreate) endpoint to create users with a plain text password.

*   Request
    
    *   userId string
        
        required
        
        User ID. Choose a custom ID or generate a random ID with `ID.unique()`. Valid chars are a-z, A-Z, 0-9, period, hyphen, and underscore. Can't start with a special char. Max length is 36 chars.
        
    *   email string
        
        required
        
        User email.
        
    *   password string
        
        required
        
        User password hashed using SHA.
        
    *   passwordVersion string
        
        Optional SHA version used to hash password. Allowed values are: 'sha1', 'sha224', 'sha256', 'sha384', 'sha512/224', 'sha512/256', 'sha512', 'sha3-224', 'sha3-256', 'sha3-384', 'sha3-512'
        
    *   name string
        
        User name. Max length: 128 chars.
        
    
*   Response
    
    *   201 application/json
        
    

```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.createSHAUser(
    '<USER_ID>', // userId
    'email@example.com', // email
    'password', // password
    sdk.PasswordHash.Sha1, // passwordVersion (optional)
    '<NAME>' // name (optional)
);

```


### [Get user](#get)

Get a user by its unique ID.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    
*   Response
    
    *   200 application/json
        
    

```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.get(
    '<USER_ID>' // userId
);

```


### [Delete user](#delete)

Delete a user by its unique ID, thereby releasing it's ID. Since ID is released and can be reused, all user-related resources like documents or storage files should be deleted before user deletion. If you want to keep ID reserved, use the [updateStatus](https://appwrite.io/docs/server/users#usersUpdateStatus) endpoint instead.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    
*   Response
    
    *   204 application/json
        
    

```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.delete(
    '<USER_ID>' // userId
);

```


### [Update email](#updateEmail)

Update the user email by its unique ID.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    *   email string
        
        required
        
        User email.
        
    
*   Response
    
    *   200 application/json
        
    

```
PATCH /users/{userId}/email

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.updateEmail(
    '<USER_ID>', // userId
    'email@example.com' // email
);

```


### [Create user JWT](#createJWT)

Use this endpoint to create a JSON Web Token for user by its unique ID. You can use the resulting JWT to authenticate on behalf of the user. The JWT secret will become invalid if the session it uses gets deleted.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    *   sessionId string
        
        Session ID. Use the string 'recent' to use the most recent session. Defaults to the most recent session.
        
    *   duration integer
        
        Time in seconds before JWT expires. Default duration is 900 seconds, and maximum is 3600 seconds.
        
    
*   Response
    
    *   201 application/json
        
    

```
POST /users/{userId}/jwts

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.createJWT(
    '<USER_ID>', // userId
    '<SESSION_ID>', // sessionId (optional)
    0 // duration (optional)
);

```


### [Update user labels](#updateLabels)

Update the user labels by its unique ID.

Labels can be used to grant access to resources. While teams are a way for user's to share access to a resource, labels can be defined by the developer to grant access without an invitation. See the [Permissions docs](https://appwrite.io/docs/permissions) for more info.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    *   labels array
        
        required
        
        Array of user labels. Replaces the previous labels. Maximum of 1000 labels are allowed, each up to 36 alphanumeric characters long.
        
    
*   Response
    
    *   200 application/json
        
    

```
PUT /users/{userId}/labels

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.updateLabels(
    '<USER_ID>', // userId
    [] // labels
);

```


### [List user logs](#listLogs)

Get the user activity logs list by its unique ID.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    *   queries array
        
        Array of query strings generated using the Query class provided by the SDK. [Learn more about queries](https://appwrite.io/docs/queries). Only supported methods are limit and offset
        
    
*   Response
    
    *   200 application/json
        
    

```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.listLogs(
    '<USER_ID>', // userId
    [] // queries (optional)
);

```


### [List user memberships](#listMemberships)

Get the user membership list by its unique ID.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    
*   Response
    
    *   200 application/json
        
    

```
GET /users/{userId}/memberships

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.listMemberships(
    '<USER_ID>' // userId
);

```


### [Update MFA](#updateMfa)

Enable or disable MFA on a user account.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    *   mfa boolean
        
        required
        
        Enable or disable MFA.
        
    
*   Response
    
    *   200 application/json
        
    

```
PATCH /users/{userId}/mfa

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.updateMfa(
    '<USER_ID>', // userId
    false // mfa
);

```


### [Delete authenticator](#deleteMfaAuthenticator)

Delete an authenticator app.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    *   type string
        
        required
        
        Type of authenticator.
        
    
*   Response
    
    *   200 application/json
        
    

```
DELETE /users/{userId}/mfa/authenticators/{type}

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.deleteMfaAuthenticator(
    '<USER_ID>', // userId
    sdk.AuthenticatorType.Totp // type
);

```


### [List factors](#listMfaFactors)

List the factors available on the account to be used as a MFA challange.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    
*   Response
    
    *   200 application/json
        
    

```
GET /users/{userId}/mfa/factors

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.listMfaFactors(
    '<USER_ID>' // userId
);

```


### [Get MFA recovery codes](#getMfaRecoveryCodes)

Get recovery codes that can be used as backup for MFA flow by User ID. Before getting codes, they must be generated using [createMfaRecoveryCodes](about:/docs/references/cloud/client-web/account#createMfaRecoveryCodes) method.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    
*   Response
    
    *   200 application/json
        
    

```
GET /users/{userId}/mfa/recovery-codes

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.getMfaRecoveryCodes(
    '<USER_ID>' // userId
);

```


### [Regenerate MFA recovery codes](#updateMfaRecoveryCodes)

Regenerate recovery codes that can be used as backup for MFA flow by User ID. Before regenerating codes, they must be first generated using [createMfaRecoveryCodes](about:/docs/references/cloud/client-web/account#createMfaRecoveryCodes) method.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    
*   Response
    
    *   200 application/json
        
    

```
PUT /users/{userId}/mfa/recovery-codes

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.updateMfaRecoveryCodes(
    '<USER_ID>' // userId
);

```


### [Create MFA recovery codes](#createMfaRecoveryCodes)

Generate recovery codes used as backup for MFA flow for User ID. Recovery codes can be used as a MFA verification type in [createMfaChallenge](about:/docs/references/cloud/client-web/account#createMfaChallenge) method by client SDK.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    
*   Response
    
    *   201 application/json
        
    

```
PATCH /users/{userId}/mfa/recovery-codes

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.createMfaRecoveryCodes(
    '<USER_ID>' // userId
);

```


### [Update name](#updateName)

Update the user name by its unique ID.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    *   name string
        
        required
        
        User name. Max length: 128 chars.
        
    
*   Response
    
    *   200 application/json
        
    

```
PATCH /users/{userId}/name

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.updateName(
    '<USER_ID>', // userId
    '<NAME>' // name
);

```


### [Update password](#updatePassword)

Update the user password by its unique ID.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    *   password string
        
        required
        
        New user password. Must be at least 8 chars.
        
    
*   Response
    
    *   200 application/json
        
    

```
PATCH /users/{userId}/password

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.updatePassword(
    '<USER_ID>', // userId
    '' // password
);

```


### [Update phone](#updatePhone)

Update the user phone by its unique ID.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    *   number string
        
        required
        
        User phone number.
        
    
*   Response
    
    *   200 application/json
        
    

```
PATCH /users/{userId}/phone

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.updatePhone(
    '<USER_ID>', // userId
    '+12065550100' // number
);

```


### [Get user preferences](#getPrefs)

Get the user preferences by its unique ID.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    
*   Response
    
    *   200 application/json
        
    

```
GET /users/{userId}/prefs

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.getPrefs(
    '<USER_ID>' // userId
);

```


### [Update user preferences](#updatePrefs)

Update the user preferences by its unique ID. The object you pass is stored as is, and replaces any previous value. The maximum allowed prefs size is 64kB and throws error if exceeded.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    *   prefs object
        
        required
        
        Prefs key-value JSON object.
        
    
*   Response
    
    *   200 application/json
        
    

```
PATCH /users/{userId}/prefs

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.updatePrefs(
    '<USER_ID>', // userId
    {} // prefs
);

```


### [List user sessions](#listSessions)

Get the user sessions list by its unique ID.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    
*   Response
    
    *   200 application/json
        
    

```
GET /users/{userId}/sessions

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.listSessions(
    '<USER_ID>' // userId
);

```


### [Create session](#createSession)

Creates a session for a user. Returns an immediately usable session object.

If you want to generate a token for a custom authentication flow, use the [POST /users/{userId}/tokens](https://appwrite.io/docs/server/users#createToken) endpoint.

*   Request
    
    *   userId string
        
        required
        
        User ID. Choose a custom ID or generate a random ID with `ID.unique()`. Valid chars are a-z, A-Z, 0-9, period, hyphen, and underscore. Can't start with a special char. Max length is 36 chars.
        
    
*   Response
    
    *   201 application/json
        
    

```
POST /users/{userId}/sessions

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.createSession(
    '<USER_ID>' // userId
);

```


### [Delete user sessions](#deleteSessions)

Delete all user's sessions by using the user's unique ID.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    
*   Response
    
    *   204 application/json
        
    

```
DELETE /users/{userId}/sessions

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.deleteSessions(
    '<USER_ID>' // userId
);

```


### [Delete user session](#deleteSession)

Delete a user sessions by its unique ID.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    *   sessionId string
        
        required
        
        Session ID.
        
    
*   Response
    
    *   204 application/json
        
    

```
DELETE /users/{userId}/sessions/{sessionId}

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.deleteSession(
    '<USER_ID>', // userId
    '<SESSION_ID>' // sessionId
);

```


### [Update user status](#updateStatus)

Update the user status by its unique ID. Use this endpoint as an alternative to deleting a user if you want to keep user's ID reserved.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    *   status boolean
        
        required
        
        User Status. To activate the user pass `true` and to block the user pass `false`.
        
    
*   Response
    
    *   200 application/json
        
    

```
PATCH /users/{userId}/status

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.updateStatus(
    '<USER_ID>', // userId
    false // status
);

```


### [List user targets](#listTargets)

List the messaging targets that are associated with a user.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    *   queries array
        
        Array of query strings generated using the Query class provided by the SDK. [Learn more about queries](https://appwrite.io/docs/queries). Maximum of 100 queries are allowed, each 4096 characters long. You may filter on the following attributes: name, email, phone, status, passwordUpdate, registration, emailVerification, phoneVerification, labels
        
    
*   Response
    
    *   200 application/json
        
    

```
GET /users/{userId}/targets

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.listTargets(
    '<USER_ID>', // userId
    [] // queries (optional)
);

```


### [Create user target](#createTarget)

Create a messaging target.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    *   targetId string
        
        required
        
        Target ID. Choose a custom ID or generate a random ID with `ID.unique()`. Valid chars are a-z, A-Z, 0-9, period, hyphen, and underscore. Can't start with a special char. Max length is 36 chars.
        
    *   providerType string
        
        required
        
        The target provider type. Can be one of the following: `email`, `sms` or `push`.
        
    *   identifier string
        
        required
        
        The target identifier (token, email, phone etc.)
        
    *   providerId string
        
        Provider ID. Message will be sent to this target from the specified provider ID. If no provider ID is set the first setup provider will be used.
        
    *   name string
        
        Target name. Max length: 128 chars. For example: My Awesome App Galaxy S23.
        
    
*   Response
    
    *   201 application/json
        
    

```
POST /users/{userId}/targets

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.createTarget(
    '<USER_ID>', // userId
    '<TARGET_ID>', // targetId
    sdk.MessagingProviderType.Email, // providerType
    '<IDENTIFIER>', // identifier
    '<PROVIDER_ID>', // providerId (optional)
    '<NAME>' // name (optional)
);

```


### [Get user target](#getTarget)

Get a user's push notification target by ID.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    *   targetId string
        
        required
        
        Target ID.
        
    
*   Response
    
    *   200 application/json
        
    

```
GET /users/{userId}/targets/{targetId}

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.getTarget(
    '<USER_ID>', // userId
    '<TARGET_ID>' // targetId
);

```


### [Update user target](#updateTarget)

Update a messaging target.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    *   targetId string
        
        required
        
        Target ID.
        
    *   identifier string
        
        The target identifier (token, email, phone etc.)
        
    *   providerId string
        
        Provider ID. Message will be sent to this target from the specified provider ID. If no provider ID is set the first setup provider will be used.
        
    *   name string
        
        Target name. Max length: 128 chars. For example: My Awesome App Galaxy S23.
        
    
*   Response
    
    *   200 application/json
        
    

```
PATCH /users/{userId}/targets/{targetId}

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.updateTarget(
    '<USER_ID>', // userId
    '<TARGET_ID>', // targetId
    '<IDENTIFIER>', // identifier (optional)
    '<PROVIDER_ID>', // providerId (optional)
    '<NAME>' // name (optional)
);

```


### [Delete user target](#deleteTarget)

Delete a messaging target.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    *   targetId string
        
        required
        
        Target ID.
        
    
*   Response
    
    *   204 application/json
        
    

```
DELETE /users/{userId}/targets/{targetId}

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.deleteTarget(
    '<USER_ID>', // userId
    '<TARGET_ID>' // targetId
);

```


### [Create token](#createToken)

Returns a token with a secret key for creating a session. Use the user ID and secret and submit a request to the [PUT /account/sessions/token](https://appwrite.io/docs/references/cloud/client-web/account#createSession) endpoint to complete the login process.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    *   length integer
        
        Token length in characters. The default length is 6 characters
        
    *   expire integer
        
        Token expiration period in seconds. The default expiration is 15 minutes.
        
    
*   Response
    
    *   201 application/json
        
    

```
POST /users/{userId}/tokens

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.createToken(
    '<USER_ID>', // userId
    4, // length (optional)
    60 // expire (optional)
);

```


### [Update email verification](#updateEmailVerification)

Update the user email verification status by its unique ID.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    *   emailVerification boolean
        
        required
        
        User email verification status.
        
    
*   Response
    
    *   200 application/json
        
    

```
PATCH /users/{userId}/verification

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.updateEmailVerification(
    '<USER_ID>', // userId
    false // emailVerification
);

```


### [Update phone verification](#updatePhoneVerification)

Update the user phone verification status by its unique ID.

*   Request
    
    *   userId string
        
        required
        
        User ID.
        
    *   phoneVerification boolean
        
        required
        
        User phone verification status.
        
    
*   Response
    
    *   200 application/json
        
    

```
PATCH /users/{userId}/verification/phone

```


```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new sdk.Users(client);

const result = await users.updatePhoneVerification(
    '<USER_ID>', // userId
    false // phoneVerification
);

```
