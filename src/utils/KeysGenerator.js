export default (module = "", index = 0, key = 36) => {
    return `${module}-${Math.random().toString(key)}-${index}`
};