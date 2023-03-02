import songView from "./songView.js";
import Modal from "./modal.js"
export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);
export const music_playlist = $('.music_playlist');
export const songName = $('.infor__song .song__name-main');
export const songAuthor = $('.song__author-main');
export const songImage = $('.song__image-main');
export const audio = $('#audio');
export const startTime = $('.start__time');
export const totalTime = $('.total__time');
const navbarAccount = $('.navbar__account:not(.account__options)');
const boxAccount = $('.box__account');
const modalLayout = $('.modal__layout');
const wrrapContainerMusic = $('#wrrap__container-music');
const containerPlaylist = $('#container__playlist');
const headingQuotes = $('.album__heading--quotes')
const currentTime = $('.currentTime');
const arrowLeft = $('.navbar__arrow--left');
const arrowRight = $('.navbar__arrow--right');
const albumItem = $$('.album__item');
const btnPausePlaylist = $('.btn__pauselist');
const btnPlayPlaylist = $('.btn__playlist');
const togglePausePlay = $('.toggle_btn');
const nextbtn = $('.next__button');
const prevbtn = $('.prev__button');
const shufflebtn = $('.shuffle__button .control__btn');
const repeatBtn = $('.repeat__button .control__btn');
const progress = $('.progress');
const volume = $('.volume');
let playedSong = [];
class App {
  _isPLaySong = false;
  _isShuffleSong = false;
  _isRepeatSong = false;
  constructor() {
    this.showOptionsAccount();
    this.renderPlaylist();
    songView.renderSong();
    songView.loadCurrentSong();
    songView.renderTimeSong();
    this.goBackPlaylist();
    this.goToPlaylist();
    this.handlerEvent();
    this.greetings();
    this.loadActiveSongWhenClick();
  }

  greetings() {
    let date;
    setInterval(() => {
      date = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(new Date())
      const quotes = +date.split(':')[0] < 12 ? 'Chào buổi sáng' : +date.split(':')[0] < 18 ? 'Chào buổi chiều' : 'Chào buổi tối';
      headingQuotes.innerHTML = quotes;
      currentTime.innerHTML = date;
    }, 1000);
  }

  handleShowAcc(el) {
    el.onclick = function () {
      boxAccount.classList.toggle('visible--hidden');
      modalLayout.classList.toggle('visible--hidden');
    }
    boxAccount.addEventListener('click', function (event) {
      event.stopPropagation()
    })
  }

  showOptionsAccount() {
    this.handleShowAcc(navbarAccount);
    this.handleShowAcc(modalLayout);
  }

  goBackPlaylist() {
    arrowLeft.addEventListener('click', function () {
      wrrapContainerMusic.style.display = 'block';
      containerPlaylist.style.display = 'none';
    })
  }

  goToPlaylist() {
    arrowRight.addEventListener('click', function () {
      wrrapContainerMusic.style.display = 'none';
      containerPlaylist.style.display = 'block';
    })
  }

  renderPlaylist() {
    albumItem.forEach(album => {
      album.addEventListener('click', function () {
        wrrapContainerMusic.style.display = 'none';
        containerPlaylist.style.display = 'block';
      })
    })
  }

  handlePausePlaySong() {
    if (!this._isPLaySong) {
      audio.play();
      togglePausePlay.src = './img button/play__toggle.png';
      this._isPLaySong = true;
      btnPausePlaylist.classList.remove('visible--hidden');
      btnPlayPlaylist.classList.add('visible--hidden');
      this.activeSong()
    } else {
      audio.pause();
      togglePausePlay.src = './img button/pause__toggle.png';
      this._isPLaySong = false;
      btnPausePlaylist.classList.add('visible--hidden');
      btnPlayPlaylist.classList.remove('visible--hidden');
    }
  }

  handleNextSong() {
    if (Modal._currentIndex === Modal.songs.length - 1) Modal._currentIndex = 0;
    else Modal._currentIndex++;
    Modal.getCurrentSong();
    songView.loadCurrentSong();
    togglePausePlay.src = './img button/play__toggle.png';
    audio.play();
    this.activeSong();
  }

  handlePreviousSong() {
    if (Modal._currentIndex === 0) Modal._currentIndex = Modal.songs.length - 1;
    else Modal._currentIndex--;
    Modal.getCurrentSong();
    songView.loadCurrentSong();
    togglePausePlay.src = './img button/play__toggle.png';
    audio.play();
    this.activeSong();
  }

  handleShuffleSong() {
    let randomIndex = Math.floor(Math.random() * Modal.songs.length);
    let check = playedSong.every(index => index !== randomIndex) && randomIndex!==Modal._currentIndex;
    if (playedSong.length === Modal.songs.length) playedSong = [];
    while (!check) {
      randomIndex = Math.floor(Math.random() * Modal.songs.length);
      check = playedSong.every(index => index !== randomIndex);
    }
    console.log(randomIndex);
    playedSong.push(randomIndex);
    Modal._currentIndex = randomIndex;
    Modal.getCurrentSong();
    songView.loadCurrentSong();
    togglePausePlay.src = './img button/play__toggle.png';
    audio.play();
    this.activeSong();
  }

  handleRepeatSong() {
    const songIndex = Modal._currentIndex;
    Modal._currentIndex = songIndex;
    Modal.getCurrentSong();
    togglePausePlay.src = './img button/play__toggle.png';
    audio.play();
    this.activeSong();
  }

  handlerEvent() {
    togglePausePlay.addEventListener('click', () => {
      this.handlePausePlaySong();
    });

    shufflebtn.addEventListener('click', () => {
      this._isShuffleSong = !this._isShuffleSong;
      shufflebtn.classList.toggle('active', this._isShuffleSong)
    })

    nextbtn.addEventListener('click', () => {
      if (!this._isShuffleSong) {
        this.handleNextSong();
      }
      else this.handleShuffleSong();
    })

    prevbtn.addEventListener('click', () => {
      if (!this._isShuffleSong) this.handlePreviousSong();
      else this.handleShuffleSong();
    });
    repeatBtn.addEventListener('click', () => {
      this._isRepeatSong = !this._isRepeatSong;
      repeatBtn.classList.toggle('active', this._isRepeatSong)
    })

    progress.onchange = function (e) {
      const seekTime = Math.floor(e.target.value / 100 * audio.duration);
      audio.currentTime = seekTime;
      console.log(seekTime);
    }

    audio.onended = () => {
      if (this._isShuffleSong) this.handleShuffleSong();
      if (this._isRepeatSong) this.handleRepeatSong();
      else this.handleNextSong();
    }

    audio.ontimeupdate = function (e) {
      let percentChange;
      if (audio.duration) {
        percentChange = Math.floor(audio.currentTime / audio.duration * 100);
        progress.value = percentChange;
      }
      songView.timeCurrent();
    }

    audio.onplay = () => {
      audio.play();
      songView.timeCurrent();
      togglePausePlay.src = './img button/play__toggle.png';
      this._isPLaySong = true;
      btnPausePlaylist.classList.remove('visible--hidden');
      btnPlayPlaylist.classList.add('visible--hidden');
      const songActive = Array.from($$('.box__music--infor')).find(song => +song.dataset.index === Modal._currentIndex);
    }

    audio.onpause = function () {
      $$('.active__song')?.forEach(song => song.classList.remove('active__song'));
    }

    volume.onchange = function (e) {
      const seekVolume = e.target.value / 100;
      console.log(seekVolume);
      audio.volume = seekVolume;
    }
  }

  loadActiveSongWhenClick() {
    music_playlist.addEventListener('click', function (e) {
      if (!e.target) return;
      const nodeSong = e.target.closest('.box__music--infor:not(.active__song)');
      if (nodeSong) {
        $$('.active__song')?.forEach(activeS => activeS.classList.remove('active__song'));
        nodeSong.classList.add('active__song');
        const songIndex = nodeSong.dataset.index;
        Modal._currentIndex = songIndex*1;
        Modal.getCurrentSong();
        songView.loadCurrentSong();
        audio.play();
       }
    })
  }

  activeSong() {
    const songActive = Array.from($$('.box__music--infor')).find(song => +song.dataset.index === Modal._currentIndex);
    $$('.active__song')?.forEach(song => song.classList.remove('active__song'));
    songActive?.classList.add('active__song');
    Modal.getCurrentSong();
    audio.play();
    songView.scrollIntoView();
  }

}
const initApp = new App();