const getJSON = (url: string) => fetch(url).then(res => res.json());


export const getHolderContent = async (id: string) => await getJSON(`https://manyland.com/j/h/gc/${id}`)
export const getBodyMotions = async (id: string) => await getJSON(`https://manyland.com/j/i/mo/${id}`)
export const getMultiData = async (id: string) => await getJSON(`https://manyland.com/j/t/gt/${id}`)
export const getCreationStats = async (id: string) => await getJSON(`https://manyland.com/j/i/st/${id}`)
