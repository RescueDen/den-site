
interface ReplacementMessage {
    message:any
    header?:string
}

const data : { [id: string]: ReplacementMessage; } =  {
    "create_user_added":{
        "message":"The user has been added and an activation email sent.  Please check your email for the activation code.",
        "header": "Activation Required"
    },
    "Error: Network Error":{
        "message":"Cannot contact the CAWS server.  Please check you internet connection.  If this problem persists contact it@caws.org.",
        "header": "Network Error"
    },
    "validate_missing_email":{
        "header": "Cannot Create New User Login",
        "message":"An email must be specified when creating a new user."
    },
    "validate_password_insufficient":{
        "header": "Cannot Create New User Login",
        "message":"The specified password does not meet requirements."
    },
    "validate_email_in_use":{
        "header": "Cannot Create New User Login",
        "message":"The user is already in use.  If this is your account, try to login or reset your password."
    },
    "login_invalid_password":{
        "header": "Cannot log in!",
        "message":"Incorrect password."
    },
    "user_not_activated": {
        "header": "User Not Activated!",
        "message": "This user has not been activated. Please activate the user using the activation in email."
    },
    "password_change_success": {
        "message": "Password updated"
    },
    "login_email_not_found": {
        "header": "Can't find Email.",
        "message": "You will need to register this email before you can login or login with gmail or facebook. If this is the first time you have logged in in on the new version of the site, please re-register. "
    },
    "user_password_login_forbidden": {
        "message": "You can't login with a user and name and password for this email because you never set a password.  Please login with gmail or facebook, or perform a password reset. "
    },
    "password_change_request_received": {
        "message": "An email has been sent to the requested email address."
    },
    "activation_forbidden": {
        "header": "Invalid Activation Token",
        "message": "Please check the activation token and try again."
    },
    "user_activated": {
        "header": "User Activated",
        "message": "Please login using your email and password."
    },
    "activation_token_missing_email": {
        "message": "Please provide the email address when activating."
    },
    "activation_token_request_received": {
        "message": "An email has been sent to the requested email address."
    },
    "password_change_forbidden": {
        "message": "Please check the token and email and try again."
    }





}


export default data

