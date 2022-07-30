import {getUserFireStore, updateUserFireStore} from "../database/FireBase.js";
import {isNumber} from "../utils/commonUtils.js";

//flag for add up or overwrite values
const OVERWRITE_VALUES = false;

export const updateUser = async (user) => {
    try {
        //get currentUser from FiresSotre
        const currentUser = await getUserFireStore(String(user.id));

        //if user exists make business logic
        if (currentUser instanceof Object) {
            for (const key in currentUser) {
                if (!OVERWRITE_VALUES && key !== 'id' && isNumber(currentUser[key]) && isNumber(user[key])) {
                    user[key] += currentUser[key];
                }
                if (!user[key])
                    user[key] = currentUser[key];
            }
        }

        //update or create user
        await updateUserFireStore(String(user.id), user);

        //return user with new values
        return await getUserFireStore(String(user.id));


    } catch (e) {
        console.error("Error getting document: ", e);
        //return "Error getting document";
        //some logic
    }
}

export const requestUser = async (id) => {

    try {
        return await getUserFireStore(id);
    } catch (e) {
        console.error("Error getting document: ", e);
        //return "Error getting document";
        //some logic
    }
}
