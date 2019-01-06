
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
    }
}


export default data

