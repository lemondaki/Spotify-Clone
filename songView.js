import Modal from "./modal.js";
import { music_playlist } from "./controlApp.js";
import { songName, songAuthor, songImage, audio, startTime, totalTime, $, $$ } from "./controlApp.js"
class SongView {
  _data = Modal;
  renderSong() {
    var htmls = this._data.songs.map((song, index) => {
      return ` <div class="box__music--infor" data-index="${index}">
                            <div class="list__number">
                              <span class="list__number--stt">${index += 1}</span>
                              <img src="https://phamhongphuc1403.github.io/spotify/assets/images/main-view/icon-playing.gif" alt="" class="playing__img-gif">
                              <span class="pause-btn">
                                <img src="https://phamhongphuc1403.github.io/spotify/assets/images/main-view/play-this-song.PNG" alt="" class="pause-btn-img">
                              </span>
                            </div>
                            <div class="box__song">
                              <div class="box__song-infor">
                          <img src="${song.image}" alt="" class="song__image-main img-small-size">
                          <div class="infor__song">
                            <span class="song__name-main">${song.name}</span>
                            <span class="song__author-main">${song.singer}</span>
                          </div>
                          </div>
                            </div>
                            <span class="album hide-on-mobile">${song.album}</span>
                            <span class="date hide-on-supper-mobile hide-on-supper-tablet ">30 thg 1, 2023</span>
                            <div class="box__time-tool hide-on-mobile">
                              <div class="icon__heart-song ">
                                <img src="https://phamhongphuc1403.github.io/spotify/assets/images/now-playing/favorite.png" alt="">
                              </div>
                              <audio class="audioTime" src="${song.path}"></audio>
                              <span class="time"></span>
                              <span class="three__dot">
                                <img src="https://phamhongphuc1403.github.io/spotify/assets/images/main-view/see-more.PNG" alt="">
                              </span>
                            </div>
                          </div>`
    })
    music_playlist.innerHTML = htmls.join('');
  }

  loadCurrentSong() {
    Modal.getCurrentSong();
    songName.innerHTML = this._data.currentSong.name
    songAuthor.innerHTML = this._data.currentSong.singer
    songImage.src = this._data.currentSong.image
    audio.src = this._data.currentSong.path;
  }

  formatTime(time) {
    const minutes = `${Math.floor(time / 60)}`.padStart(2, 0);
    const second = `${(time % 60)}`.padStart(2, 0);
    return `${minutes}:${second}`;
  }

  renderTimeSong() {
    const audioTime = $$('.audioTime');
    const timeSpan = $$('.time');
    let timedur;
    timeSpan.forEach((timesp, idx) => {
      audio.addEventListener('loadedmetadata', () => {
        if (idx === Modal._currentIndex) {
          timedur = this.formatTime(Math.floor(audioTime[idx].duration));
          totalTime.innerText = timedur;
        }
        timesp.innerText = this.formatTime(Math.floor(audioTime[idx].duration));
      });
    })
  }

  timeCurrent() {
      const cur = audio.currentTime;
      startTime.innerText = this.formatTime(Math.trunc(cur));
  }

  scrollIntoView() {
    const scroll = $('.active__song')
    scroll?.scrollIntoView({
      behavior: "smooth", block: "center"
    })
  }



}
export default new SongView();
