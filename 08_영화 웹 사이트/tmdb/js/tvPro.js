const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODQ1NzM4NWMwOWM4ZWI4ODA2NjM3N2QwNmQyYTE5ZiIsIm5iZiI6MTczMDA3NjAyMC4wNjM5NjcsInN1YiI6IjY3MWFlYTYwZTgzM2Q5MmVmMDVmZmJiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XFHr3H0fNoy6dgBl8UHpQ__O7tpn3cOGG5eUQKt2Qnk',
   },
}

const tvUrl = 'https://api.themoviedb.org/3/tv/popular?language=ko-KR&page=1'

const getPlayingTvPro = async (tvUrl) => {
   try {
      const tvPro = await fetch(tvUrl, options)
      const data = await tvPro.json()
      const tv = data.results
      rowsTv = ''
      for (let i = 0; i < 20; i = i + 2) {
         rowsTv += `<div class="row tvRow" style="justify-content: center">`
         for (let j = 0; j < 2; j++) {
            const num = i + j

            const imgSrc = `https://image.tmdb.org/t/p/w500${tv[num].poster_path}`
            rowsTv += `
                 <div class="col-sm-6 p-2">
                 <div class="card tvPro-card" style="display: flex; flex-direction: row">
                 <div class="col-sm-6">
                 <a href="./tvDetail.html?id=${tv[num].id}">
                           <img src="${imgSrc}" class="card-img-left" alt="${tv[num].name}"/>
                           </a>
                        </div>
                        <div class="card-body col-sm-6">
                           <p>${tv[num].name}</p>
                           <p>평점 ${tv[num].vote_average.toFixed(1)}</p>
                        `
            if (tv[num].overview)
               rowsTv += ` 
                           <p class="tv-overview">줄거리<br>${tv[num].overview}</p> 
                    `
            rowsTv += `   </div>
                </div>
             </div>`
         }
         rowsTv += `</div>`
      }
      const container = document.querySelector('main .container')
      container.innerHTML = rowsTv
   } catch (error) {
      console.log(error)
   }
}

getPlayingTvPro(tvUrl)
