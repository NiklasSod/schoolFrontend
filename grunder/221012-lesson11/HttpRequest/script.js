// console.log(1)
// console.log(2)
// for(let i = 0; i < 3; i++) {  // Synkron
//   console.log('blocking ' + i)
// }
// console.log(3)

// setTimeout(() => {          // Asynkron
//   console.log('timer klar')
// }, 2000)

// console.log(4)
// console.log(5)


/*
    GET     - Hämtar data, okrypterat
    POST    - Skriva data, krypterad i en body
    PUT     - uppdaterar HELA ett objekt, krypterad i en body
    PATCH   - uppdaterar delar av eller hela ett objekt, krypterad i en body
    DELETE  - tar bort ett objekt
*/

const getRequest = (endpoint, cb) => {
  return new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();

    http.addEventListener('readystatechange', () => {
      // console.log(http.readyState)
    
      if(http.status === 200 && http.readyState === 4) {
        // console.log(http.responseText)
        const data = JSON.parse(http.responseText)
        // cb(undefined, data)
        resolve(data)
      }
      else if(http.readyState === 4) {
        // console.log('could not get the data', http.status)
        // cb('could not get the data', undefined)
        reject('could not get the data')
      }
    
    
    })
    
    http.open('GET', endpoint);
    http.send();
  })
}

// getRequest('user.json', (err, data) => {
//   if(err) {
//     console.log(err)
//     return
//   }
//   getRequest('todos.json', (err, data) => {
//     console.log(data)
//   })

//   console.log(data)
// })



// PROMISES

const doStuff = (value) => {
  return new Promise((resolve, reject) => {

    if(value)
      resolve('success!!!')
    else
      reject('Error message')

  })
}


// doStuff(true)
//   .then(data => {
//     console.log(data)
//     return doStuff(false)
//   })
//   .then(data => {
//     console.log(data)
//   })
//   .catch(err => console.log(err))



// getRequest('user.json')
//   .then(data => {
//     console.log(data)
//     return getRequest('todos.json')
//   })
//   .then(todos => {
//     console.log(todos)
//   })
//   .catch(err => console.log(err))



//FETCH

// fetch('user.json')
//   .then(res => {
//     return res.json()
//   })
//   .then(data => {
//     console.log(data)
//     return fetch('todos.json')
//   })
//   .then(res => {
//     return res.json()
//   })
//   .then(todos => {
//     console.log(todos)
//   })
//   .catch(err => {
//     console.log(err)
//   })




// ASYNC AWAIT

// const getJson = async (url) => {
//   const res = await fetch(url)

//   if(res.status !== 200) {
//     throw new Error('cant fetch the data')
//   }

//   const data = await res.json()
//   console.log(data)
//   // return data
// }

// getJson('user.json')
  // .then(data => {
  //   console.log(data)
  // })
  // .catch(err => {
  //   console.log(err.message)
  // })

  const output = document.querySelector('#output')

  const getTodos = async () => {
    const res = await fetch('todos.json')
    const data = await res.json()

    console.log(data)
    data.forEach(todo => {
      // output.innerHTML += `<p>${todo.title}</p>`
      output.insertAdjacentHTML('beforeend', `<p>${todo.title}</p>`)
    })
  }

  getTodos()