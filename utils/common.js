// 公共js文件
let common = {}

// Deletes an item in an array
common.remove = (arr, val) => {
  var index = arr.indexOf(val);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

// non - empty
common.checketEmpty=(str, notice)=>{
  if (!str) {
   uni.showToast({
      title: notice,
      icon: 'none',
      duration: 1000
    })
    return false;
  }
}

// Test whether it is an 11 - digit mobile phone number
common.checketPhone = (str, notice) => {
  const reg = (/^1(3|4|5|7|8)\d{9}$/.test(str))
  if (reg==false){
   uni.showToast({
      title: notice,
      icon: 'none',
      duration: 1000
    })
    return false;
  }
}

common.userPassword = (str) => {
  if (str.length < 6) {
   uni.showToast({
      title: '密码至少6位！',
      icon: 'none',
      duration: 1000
    })
    return false;
  }
}

export default common