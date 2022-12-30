const setting = JSON.parse(localStorage.getItem('dqw_monster_view_setting'))
let api_url = ''
if (setting) {
  api_url = setting.api_url
}

const fetch_value = async (data) => {
  if (api_url == '') return
  console.log(data)
  let res = null
  await fetch(api_url, {
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
  if (api_url == '') return
  console.log(data)
  fetch(api_url, {
    "method": "POST",
    "mode": "no-cors",
    "Content-Type": "application/x-www-form-urlencoded",
    "body": JSON.stringify(data)
  })
}

// ---------------------------------------- //

const get_story = () => {
  if (api_url == '') return
  const data = {
    method: "get_story",
    params: {
      // 空
    }
  }
  return fetch_value(data)
}
const get_monster = () => {
  if (api_url == '') return
  const data = {
    method: "get_monster",
    params: {
      // 空
    }
  }
  return fetch_value(data)
}
const update_story = (user, monster) => {
  if (api_url == '') return
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
  if (api_url == '') return
  const data = {
    method: "get_additional",
    params: {
      user: user,
    }
  }
  return fetch_value(data)
}
const delete_additional = (user, monster) => {
  if (api_url == '') return
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
  if (api_url == '') return
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
  if (api_url == '') return
  const data = {
    method: "update_list_additional",
    params: {
      user: user,
      monsters: monsters,
    }
  }
  return fetch_no_value(data)
}

// ---------------------------------------- //

const get_region_monster = () => {
  if (api_url == '') return
  const data = {
    method: "get_region_monster",
    params: {
      // 空
    }
  }
  return fetch_value(data)
}

export default {
  fetch_value,
  fetch_no_value,

  get_story,
  get_monster,
  update_story,

  get_additional,
  delete_additional,
  update_additional,
  update_list_additional,

  get_region_monster,
}
