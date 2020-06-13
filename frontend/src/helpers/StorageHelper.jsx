class StorageHelper {
    constructor() {

    }

    store(key, value) {
        window.sessionStorage.setItem(key, value)
    }

    get(key, value) {
        window.sessionStorage.getItem(key)
    }
}

export default StorageHelper;