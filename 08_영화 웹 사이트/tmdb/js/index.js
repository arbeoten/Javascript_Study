// 서버에 같이 전달하는 포스트잇 같은 느낌
const options = {
   method: 'GET', // Restful 방식 중 GET 방식으로 요청
   headers: {
      accept: 'application/json', // JSON 객체 형태로 받겠다고 서버에 요청
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODQ1NzM4NWMwOWM4ZWI4ODA2NjM3N2QwNmQyYTE5ZiIsIm5iZiI6MTcyOTgyNTQ4NS4wMDcwMjIsInN1YiI6IjY3MWFlYTYwZTgzM2Q5MmVmMDVmZmJiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SVhAtGE_SxLiaEgO9GC5vwi2bWOQ8zm05bARbrdgM7Q', // 보안을 위해 서버에 전달하는 인증키
   },
}

// fetch : 서버에 request를 요청하는 자바스크립트 제공 함수
// fetch(request 주소, request 할때 서버에 같이 전달하는 옵션)
// 물음표 뒤는 쿼리스트링, 서버에 보내는 값

// fetch는 왜 promise를 사용할까
// promise, async, await -> 비동기
// request 해주는 과정을 비동기로 동작시키고 있다
// 서버에 장애가 있거나 네트워크에 문제가 있을때 동기적으로 실행이 된다면 사용자는 다른 작업을 할 수 없음. 따라서 request 작업은 비동기로 구성되어 있음

const url = 'https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=KR'

const getPlayingMovies = async (url) => {
   try {
      const response = await fetch(url, options) // promise 객체를 리턴
      const data = await response.json() // await를 지정하는 이유 : fetch는 비동기적으로 실행되므로 서버에서 request 해오는 딜레이 시간 중에 실행된다
      console.log(data.results)

      const results = data.results
      const container = document.querySelector('main .container')
      let rowsHtml = ''
      for (let i = 0; i < results.length; i += 4) {
         let rowHtml = '<div class="row">'
         for (let j = 0; j < 4; j++) {
            const index = i + j
            if (index >= results.length) break
            const movie = results[index]
            rowHtml += `
                    <div class="col-sm-3 p-3">
                     <div class="card">
                        <a href="./detail.html?movie_id=${movie.id} ">
                           <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top poster" alt="${movie.title}" />
                        </a>
                        <div class="card-body">
                           <p class="card-text title">${movie.title}</p>
                           <p class="card-text average">${movie.vote_average.toFixed(1)}점</p>
                        </div>
                     </div>
                  </div>
              `
         }
         rowHtml += '</div>'
         rowsHtml += rowHtml
      }
      container.innerHTML = rowsHtml
   } catch (error) {
      console.log(error)
   }
}
getPlayingMovies(url)
/*
   .then((res) => {
      console.log(res) // response 정보 + 데이터
      return res.json() // 실제 데이터만 리턴
   })
   .then((res) => console.log(res))
   .catch((err) => console.error(err)) // request할때 문제 발생시 실행
*/
