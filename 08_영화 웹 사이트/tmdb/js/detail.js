const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODQ1NzM4NWMwOWM4ZWI4ODA2NjM3N2QwNmQyYTE5ZiIsIm5iZiI6MTczMDA3NjAyMC4wNjM5NjcsInN1YiI6IjY3MWFlYTYwZTgzM2Q5MmVmMDVmZmJiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XFHr3H0fNoy6dgBl8UHpQ__O7tpn3cOGG5eUQKt2Qnk',
   },
}

// 현재 페이지의 url을 사용하여 URLSearchParams 객체 생성
const urlParam = new URLSearchParams(window.location.search)
// 특정 쿼리 스트링 값 가져오기
const movieId = urlParam.get('movie_id')

const movieDetailUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`
const mainContainer = document.querySelector('main .container')

// 영화 상세정보 바인딩

const getDetailMovie = async (movieDetailUrl) => {
   try {
      const response = await fetch(movieDetailUrl, options)
      const data = await response.json()
      //w300 : poster의 width를 300px로 가져온다
      const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}`
      const rowHtml = `
       <div class="row">
                  <div class="col-sm-3" style="text-align : center">
                     <img src="${imgSrc}" alt="${data.title}" class="poster-detail" style="max-width:100%"/>
                  </div>
                  <div class="col-sm-9">
                     <h2>${data.title}</h2>
                     <ul class="movie-info">
                        <li>개봉일 ${data.release_date}</li>
                        <li>${data.genres.map((genre) => {
                           return genre.name
                        })}</li>
                        <li>${data.runtime}분</li>
                     </ul>
                     <p>${data.vote_average.toFixed(1) == 0.0 ? '미반영' : data.vote_average.toFixed(1) + '점'}</p>
                     <p>${data.overview}</p>
                  </div>
               </div>
       `
      mainContainer.innerHTML += rowHtml
      await getCreditsMovie(movieCreditsUrl)
   } catch (error) {
      console.log('Error : ' + error)
   }
}

getDetailMovie(movieDetailUrl)

// 출연 배우 데이터 바인딩

const movieCreditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`

const getCreditsMovie = async (movieCreditsUrl) => {
   try {
      const response = await fetch(movieCreditsUrl, options)
      const data = await response.json()

      let castRowHtml = `<div class="row" style-"maring-top:30px">`

      for (let i = 0; i < 6; i++) {
         let profileImg = !data.cast[i].profile_path ? './images/person.png' : `https://image.tmdb.org/t/p/w200${data.cast[i].profile_path}`

         castRowHtml += `<div class='col-sm-2 p-3'>
          <div class="card">
             <img src="${profileImg}"
             class="card-img-top"
             alt="${data.cast[i].name}">
             <div class="card-body">
                <p class="card-text">${data.cast[i].name}</p>
             </div>
          </div>
       </div>`
      }
      castRowHtml += '</div>'
      mainContainer.innerHTML += castRowHtml
   } catch (error) {
      console.log(error)
   }
}
