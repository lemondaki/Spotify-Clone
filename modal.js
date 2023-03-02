class Modal {
    _currentIndex = 0;
    songs = [
        {
            name: 'Unstoppable',
            singer: 'Sia',
            path: './mp3/song1.mp3',
            image: './img/img1.jpg',
            album: 'This Is Acting (Target Exclusive)'
        },
        {
            name: 'Older',
            singer: 'Sasha Alex Sloan',
            path: './mp3/song2.mp3',
            image: './img/img2.jpg',
            album: 'Destroyer – Have We Met'
        },
        {
            name: 'Umbrella',
            singer: 'Ember lsland',
            path: './mp3/song3.mp3',
            image: './img/img3.jpg',
            album: 'Selena Gomez – Rare'
        },
        {
            name: 'So Far Away',
            singer: 'Adam Christopher',
            path: './mp3/song4.mp3',
            image: './img/img4.jpg',
            album: 'All the Time'
        },
        {
            name: 'The nights',
            singer: 'Citycreed Cover',
            path: './mp3/song5.mp3',
            image: './img/img5.jpg',
            album: 'I Think I’m Good'
        },
        {
            name: 'Cửu môn hồi ức',
            singer: 'Đẳng Thập Ma Quân',
            path: './mp3/song6.mp3',
            image: './img/img6.jpg',
            album: 'Savage and Metro Boomin'
        },
        {
            name: 'Imagination',
            singer: 'Shawn Mendes',
            path: './mp3/song7.mp3',
            image: './img/img7.jpg',
            album: 'How I’m Feeling Now'
        },
        {
            name: 'Navada',
            singer: 'Vicetone',
            path: './mp3/song8.mp3',
            image: './img/img8.jpg',
            album: 'It Is What It Is'
        },
        {
            name: '2002',
            singer: 'Anne-Marie',
            path: './mp3/song9.mp3',
            image: './img/img9.jpg',
            album: 'Song for Our Daughter'
        },
        {
            name: 'Alone',
            singer: 'Alan Walker',
            path: './mp3/song10.mp3',
            image: './img/img10.jpg',
            album: 'All Fall Down'
        },
        {
            name: 'Way Back Home',
            singer: 'SHAUN',
            path: './mp3/song11.mp3',
            image: './img/img11.jpg',
            album: 'Waxahatchee – Saint Cloud'
        },
        {
            name: 'Always',
            singer: 'lsak Danielson',
            path: './mp3/song12.mp3',
            image: './img/img12.jpg',
            album: 'Big Conspiracy'
        }
    ];

    getCurrentSong() {
        this.currentSong = this.songs[this._currentIndex];
    }
}

export default new Modal();