import {getUserFireStore, updateUserFireStore} from "../database/FireBase.js";

export const updateUser = async (user) => {
    try {
        const users = await getUserFireStore(user.id);

        if (Object.keys(users).length === 1) {
            const idKey = Object.keys(users).pop();
            await updateUserFireStore(idKey, user);
            return await getUserFireStore(user.id);
        }

    } catch (e) {
        console.error("Error getting document: ", e);
    }
}

export const requestUser = async (id) => {
    try {
        return await getUserFireStore(id);
    } catch (e) {
        console.error("Error getting document: ", e);
    }
}
