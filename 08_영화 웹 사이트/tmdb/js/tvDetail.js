const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODQ1NzM4NWMwOWM4ZWI4ODA2NjM3N2QwNmQyYTE5ZiIsIm5iZiI6MTczMDA3NjAyMC4wNjM5NjcsInN1YiI6IjY3MWFlYTYwZTgzM2Q5MmVmMDVmZmJiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XFHr3H0fNoy6dgBl8UHpQ__O7tpn3cOGG5eUQKt2Qnk',
   },
}

const param = new URLSearchParams(window.location.search)
const id = param.get('id')
const tvDetailUrl = `https://api.themoviedb.org/3/tv/${id}?language=ko-KR`
const mainContainer = document.querySelector('main .container')
const getTvDetail = async (tvDetailUrl) => {
   try {
      const response = await fetch(tvDetailUrl, options)
      const data = await response.json()
      const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}`
      // 국가코드를 한국어로 변환
      let languageName = new Intl.DisplayNames(['ko-KR'], { type: 'language' })

      let rowHtml = `
       <div class="row tvDetail-pro p-3 mb-3">
         <div class="col-sm-3" style="text-align : center">
            <img src="${imgSrc}" alt="${data.name}" class="poster-detail" style="max-width:100%"/>
         </div>
         <div class="col-sm-9">
            <h2>${data.name}</h2>
            <p>원제 ${data.original_name}, ${languageName.of(data.original_language)}</p>
               <p>${data.vote_average.toFixed(1)}점</p>
               <p>최근방영일 ${data.last_air_date}</p>
               <p>처음방영일 ${data.first_air_date}</p>
            `
      if (data.overview != '') {
         rowHtml += `
            <p>줄거리</p>
            <p>${data.overview}</p>
           `
      }
      rowHtml += `
         </div>
      </div>
       `
      rowHtml += `<div class="row tvDetail-pro p-3">`
      let episode = 0
      for (season of data.seasons) {
         episode++
         rowHtml += `<p>시즌${episode}(평점 ${season.vote_average != 0 ? season.vote_average : '미등록'}) 보러가기`
         rowHtml +=
            season.air_date == null
               ? ``
               : ` - 
         ${season.air_date} 방영</p >`
      }
      rowHtml += `</div>`

      mainContainer.innerHTML += rowHtml
   } catch (error) {
      console.log(error)
   }
}

getTvDetail(tvDetailUrl)
