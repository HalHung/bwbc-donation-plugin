export default {
    ['SET_TOKEN'] (state, token) {
      state.token = token;
    },
    ['SET_USER'] (state, user) {
      state.user = user;
    },
    /** 播放相關 start */
    ['SET_PLAY_DATA'](state, data) {
      state.playData = data;
    },
    ['GET_PLAY_DATA'](state) {
      return state.playData;
    },
    ['SET_CHAPTER_LIST'](state, list) {
      state.chapterList = list;
    },
    ['SET_AUDIO_CHAPTER'](state, chapterData) {
      state.audioChapter = chapterData;
    },
    ['SET_CHOOSE_AUDIO_CHAPTER_ID'] (state, audioChapterId) {
      state.audioChapterId = audioChapterId;
    },
    ['SET_PLAYER_SIZE'](state, sizeType) {
    /** 播放器大小 
     * 0:關閉
     * 1:小
     * 2:全屏
     */
      state.playerSize = sizeType;
    },
    ['SET_SORT_TYPE'](state, sortType) {
      state.sortType = sortType;
    }
    ,
    ['SET_PLAY_AUDIO_TIME'](state, time) {
      state.playAudioNowTime = time;
    },
    /**
     * 循環方式
     * 單曲不循環=0
     * 單曲循環=1
     * 循環播放列表=2
     */
    ['SET_LOOP_TYPE'](state, loopType) {
      state.loopType = loopType;
    },
    /** 倍速 */
    ['SET_SPEED'](state, speed) {
      state.speed = speed;
    },
    /** 音量 */
    ['SET_VOLUE'](state, volume) {
      state.volume = volume;
    },
    /** 播放相關 end */

    /** 控制關於頁面是否開啟 */
    ['SET_ABOUT_PAGE_OPEN'](state, isAboutOpen) {
      state.isAboutOpen = isAboutOpen;
    },

    /** 紀錄當前選擇的標籤 */
    ['SET_NAVIGATION_INDEX'](state, navigationIndex) {
      state.navigationIndex = navigationIndex;
    },

  };