# MY SIMPLE LOGIN APPLICATION - TIEN THANH LE

## The structure of my project
### Frontend

The folder called `client` holds my React frontend application.

I defined three routes that are used to navigate to the login page, the validate page, and the not found page.

Furthermore, the `layouts` folder holds "Login Layout" to wrap the login page, and the validate page. The `pages` folder holds the design of the login page, the validate page, and the not found page.

Besides that, in the `components` folder, there is the `GlobalStyles` component which holds some common styles in the whole website.

### Backend and Database

The folder called `functions` holds the backend API endpoints which are used to make requests from the frontend application.

In the `utils` folder, I made some initialization to make use of the firebase firestone database and exported it to use from everywhere in the project.

The `controllers` folder holds some functions defined to process the request and response to the frontend. Besides that, the `auth.js` file in the root of the `functions` folder uses express router to define endpoints.

## How to run it
> Due to the trial account from firebase and Twilio, I have some notices:
> * We have to change some code lines to run the project.
> * Due to the free firebase account, I cannot deploy API endpoints for the frontend. You have to create your own Cloud Firestone Database to use the database with the instruction below.
> * Due to the free Twilio phone number, the message containing the access code may not be sent globally. In this case, there is an access code printed on the terminal screen (From Git Bash run the backend API) to illustrate the process.

1. Open Git Bash in the root of the project.
    - Run the command `cd functions`.
    - Then run the command `npm run serve` to run the backend API. 
    - When the terminal screen looks like this, copy the link in the line pointed by the cursor.
    !['backend Git Bash' screen](./screenshots/backendAPI.png)
    - Open `axiosConfig.js` in the `src` folder in the `client` folder and paste the link in `baseURL` like the following code.
    ```javascript
    import axios from 'axios'

    export const axiosInstance = axios.create({
        baseURL: 'http://127.0.0.1:5001/login-application-tien/us-central1/app/',
    })
    ```

2. Create a '.env' in the root of the `functions` folder and paste the your TWILIO ACCOUNT SID and TWILIO AUTH TOKEN.

3. Open `auth.js` in the `controllers` folder in the `functions` folder.
    - Paste your twilio phone number in the property "from" in the line 59.

4. To use the database:
    - Create a project on firebase
    - Create Cloud Firestone Database
    - Then choose Settings -> Project settings -> Service accounts -> Generate new private key
    - Copy content from downloaded file
    - Paste it in the `firebase-adminsdk.json` file in the `functions` folder to use the database

5. Open other Git Bash in the root of the project.
    - Run the command `cd client`.
    - Then run the command `npm start` to run the frontend application.