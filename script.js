const songData = [
    {
        name: "Naa Ready",
        movie: "Leo",
        src:"Naa Ready.mp3"
    },
    {
        name: "Bloody Sweet",
        movie: "Leo1",
        src:"Bloody Sweet.mp3"
    },
    {
        name: "Ratata",
        movie: "Leo2",
        src:"Ratata.mp3"
    }
]

const container = document.querySelector(".container")
const songName= document.querySelector(".song-name")
const songMovie= document.querySelector(".song-movie")
const cover= document.querySelector(".cover")
const playPauseBtn= document.querySelector(".player-btn.play-pause")
const prevBtn= document.querySelector(".prev-btn")
const nextBtn= document.querySelector(".next-btn")
const audio= document.querySelector(".audio")
const songTime = document.querySelector(".song-time")
const songProgress= document.querySelector(".song-progress")
const coverName= document.querySelector(".cover span:nth-child(2)")
const coverMovie= document.querySelector(".cover span:nth-child(1)")

let songIndex = 0

window.addEventListener('load', () =>{
    loadSong(songIndex)
})

const loadSong = (index) => {
    coverName.textContent = songData[index].name
    coverMovie.textContent = songData[index].movie
    songName.textContent = songData[index].name
    songMovie.textContent = songData[index].movie
    audio.src=`music/${songData[index].src}`
}

const playSong =() =>{
    container.classList.add('pause')
    playPauseBtn.firstElementChild.className='fa-solid fa-pause'
    audio.play()
    cover.classList.add('rotate')
}

const pauseSong =() =>{
    container.classList.remove('pause')
    playPauseBtn.firstElementChild.className='fa-solid fa-play'
    audio.pause()
    cover.classList.remove('rotate')
}

playPauseBtn.addEventListener('click', () => {
    if(container.classList.contains('pause')){
        pauseSong()
    }
    else{
        playSong()
    }
})

const prevSong = () =>{
    songIndex--
    if(songIndex < 0){
        songIndex = songData.length - 1
    }
    loadSong(songIndex)
    playSong()
}

const nextSong = () =>{
    songIndex++
    if(songIndex > songData.length - 1){
        songIndex = 0
    }
    loadSong(songIndex)
    playSong()
}

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', (e) =>{
    const currentTime = e.target.currentTime
    const duration = e.target.duration
    let currentTimeWidth = (currentTime / duration) * 100
    songProgress.style.width = `${currentTimeWidth}%`

    let songCurrentTime = document.querySelector('.time span:nth-child(1)')
    let songDuration = document.querySelector('.time span:nth-child(2)')

    audio.addEventListener('loadeddata', ()=> {
        let audioDuration = audio.duration

        let totalMinutes = Math.floor(audioDuration / 60)
        let totalSeconds = Math.floor(audioDuration % 60)

        if(totalSeconds <10){
            totalSeconds = `0${totalSeconds}`
        }

        songDuration.textContent = `${totalMinutes}:${totalSeconds}`
    })

    let currentMinutes = Math.floor(currentTime / 60)
    let currentSeconds = Math.floor(currentTime % 60)

    if(currentSeconds <10){
            currentSeconds = `0${currentSeconds}`
        }

        songCurrentTime.textContent = `${currentMinutes}:${currentSeconds}`

})

songTime.addEventListener('click', (e) =>{
    let progressWidth = songTime.clientWidth
    let clickedOffsetX = e.offsetX
    let songDuration = audio.duration
    audio.currentTime = (clickedOffsetX / progressWidth) * songDuration
    playSong()
})

audio.addEventListener('ended', nextSong)

