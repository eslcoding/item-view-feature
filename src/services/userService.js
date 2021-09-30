// const domain = process.env.NODE_ENV === 'production' ? 'https://monday-outlook.herokuapp.com' : 'http://localhost:3030'
const domain = process.env.NODE_ENV === 'production' ? 'https://outaddin-dev.herokuapp.com' : 'http://localhost:3030'
// const domain = 'https://d85e647667cc.ngrok.io'
const BASE_URL = domain + '/api'


async function isUserExist(email) {
    try {
        let res = await fetch(BASE_URL + "/user/isUserExist", {
            method: 'post',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json',
            }
            

        });
        res = await res.json();
        return res


    } catch (err) {
        console.dir(err)
        console.log('ERROR: cannot fetch from server', err);
    }

}

async function setStartItem(email, boardId, groupId, itemId) {
    // console.log('getUserByEmail -> email', email)
    console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

    console.log('email, boardId, groupId, itemId: ', email, boardId, groupId, itemId);

    try {
        let res = await fetch(BASE_URL + "/user/setStartItem", {
            method: 'post',
            body: JSON.stringify({ email, boardId, groupId, itemId }),
            headers: {
                'Content-Type': 'application/json',
            }

        });
        res = await res.json();
        console.log('setStartItem -> res', res)
        return res


    } catch (err) {
        console.dir(err)
        console.log('ERROR: cannot fetch from server', err);
    }
}

export default {
    setStartItem,
    isUserExist
}