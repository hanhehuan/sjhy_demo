/**
 *本地存储封装模块
 */

export const getItem = name => {
  const data =  window.localStorage.getItem(name)
  //  因为data可能不是json字符串，所以放到try中
  try {
    return JSON.parse(data)
  }catch (err) {
    return data
  }
}

export const setItem = (name,value) => {
  if (typeof value === 'object'){
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name,value);
}

export const removeItem = name => {
  window.localStorage.removeItem(name)
}
