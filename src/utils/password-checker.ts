/**
 Provide a simple function to check the password and return requirments
 **/
export function checkPassword(password: string): string[] {
    //Size up the return
    let result: string[] = [];

    //If less than size
    if (password.length < 6) {
        result.push("The password must be greater than 5 letters.")
    }


    return result;
}