class Store {
    open = $state(false)
    editProfileModal: {
        open: boolean,
        profileName: string
    } = $state({
        open: false,
        profileName: "" 
    })
}
export const options = new Store();