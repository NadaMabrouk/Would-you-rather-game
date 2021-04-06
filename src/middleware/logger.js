
const logger = (store) => (next) => (action) => {
    console.group(action)
        console.log('Current Action' , action.type)
        const newRes = next(action)
        console.log('New state is ', store.getState())
    console.groupEnd()
    return newRes
}

export default logger