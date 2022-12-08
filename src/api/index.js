const apiUrl = localStorage.getItem('dqw_monster_view_api_url')

const fetch_value = async (data) => {
  if (apiUrl == '') return
  console.log(data)
  let res = null
  await fetch(apiUrl, {
    "method": "POST",
    "Content-Type": "application/x-www-form-urlencoded",
    "body": JSON.stringify(data)
  })
    .then(async (response) => {
      await response.json().then(res_data => {
        res = res_data
      })
    })
    .catch((error) => {
      console.log('Fetch エラーです！')
      console.log(error)
    })
  return res
}
// 値を返さない処理の場合はこちら
const fetch_no_value = (data) => {
  if (apiUrl == '') return
  console.log(data)
  fetch(apiUrl, {
    "method": "POST",
    "mode": "no-cors",
    "Content-Type": "application/x-www-form-urlencoded",
    "body": JSON.stringify(data)
  })
}

// ---------------------------------------- //

const get_story = () => {
  if (apiUrl == '') return
  const data = {
    method: "get_story",
    params: {
      // 空
    }
  }
  return fetch_value(data)
}
const update_story = (user, monster) => {
  if (apiUrl == '') return
  const data = {
    method: "update_story",
    params: {
      user: user,
      monster: monster,
    }
  }
  return fetch_no_value(data)
}

// ---------------------------------------- //

const get_additional = (user) => {
  if (apiUrl == '') return
  const data = {
    method: "get_additional",
    params: {
      user: user,
    }
  }
  return fetch_value(data)
}
const delete_additional = (user, monster) => {
  if (apiUrl == '') return
  const data = {
    method: "delete_additional",
    params: {
      user: user,
      monster: monster,
    }
  }
  return fetch_no_value(data)
}
const update_additional = (user, monster) => {
  if (apiUrl == '') return
  const data = {
    method: "update_additional",
    params: {
      user: user,
      monster: monster,
    }
  }
  return fetch_no_value(data)
}
const update_list_additional = (user, monsters) => {
  if (apiUrl == '') return
  const data = {
    method: "update_list_additional",
    params: {
      user: user,
      monsters: monsters,
    }
  }
  return fetch_no_value(data)
}

export default {
  fetch_value,
  fetch_no_value,

  get_story,
  update_story,

  get_additional,
  delete_additional,
  update_additional,
  update_list_additional,
}
