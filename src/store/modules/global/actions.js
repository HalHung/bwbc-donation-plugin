/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

import API from '@/api/';
// eslint-disable-next-line no-unused-vars
import { Store } from 'vuex';
import store from '../..';
import state from './state';

/** 點選主題時 取章節列表 
先嘗試找當前指定的音檔章節id
如果找不到 就選第一首章節內容 
*/
export const getChapterListByData = ({ commit }, data ) => {
  commit('SET_PLAY_DATA',data);
  return new Promise((resolve, reject) => {
    API.data.listAudioChapter(data.dataId).then(res => {
      if (res.status === 200) {
        var list = res.data.data;
        commit(`SET_CHAPTER_LIST`,list);
        if(list.length>0){
          let targetChapterId = list[0].audioChapterId;
          let memoryChapterId = state.audioChapterId;
          if(memoryChapterId > 0 ){
            for(var i=1; i<list.length; i++){
              if(list[i].audioChapterId == memoryChapterId){
                targetChapterId = memoryChapterId;
                break;
              }
            }
          }
          API.data.getAudio(targetChapterId).then(res2 => {
            commit(`SET_AUDIO_CHAPTER`, res2.data.data);
            resolve(res,res2);
          }).catch(error=>{
            reject(error)
          });
        } else {
          resolve(res)
        }
      } else {
        reject(res.status)
      }
    }).catch(error=>{
        reject(error)
    });
  });
};

/** 換首 取章節內容 */
export const getAudioChapterByChapterId = ({ commit }, audioChapterId ) => {
  return new Promise((resolve, reject) => {
    API.data.getAudio(audioChapterId).then(res => {
      if (res.status === 200) {
        commit(`SET_AUDIO_CHAPTER`, res.data.data);
        resolve(res);
      } else {
        resolve(res)
      }
    }).catch(error=>{
      reject(error)
    });
  });
};

/** 播放器大小切換 */
export const setPlayerSize = ({ commit }, sizeType=0) => {
  commit(`SET_PLAYER_SIZE`, sizeType);
  //關閉播放器清空播放列表
  if(sizeType==0) {
    commit(`SET_AUDIO_CHAPTER`, undefined);
    commit(`SET_CHAPTER_LIST`, undefined);
    commit('SET_PLAY_DATA', undefined);
  }
};

/** 播放順序切換 */
export const sortChapterList = ({ commit,state }, sortType) => {
  commit(`SET_SORT_TYPE`, sortType);
  var originalChapterList = state.originalChapterList;
  switch (sortType) {
    case "asc":
      commit(`SET_CHAPTER_LIST`, originalChapterList);
      break;
    case "desc":
      var albumList = [];
      for (let i = originalChapterList.length - 1; i >= 0; i--) {
        albumList.push(originalChapterList[i]);
      }
      commit(`SET_CHAPTER_LIST`, albumList);
      break;
    default:
      break;
  }
};

/** 播放下一章節 */
export const nextAudioChapter = ({ getters,state,dispatch }) => {
  console.log(`nextAudio`);
  let playAudioList = getters.playAudioList;
  let audioChapter = state.audioChapter;
  console.log(`nextAudio audioChapter:${JSON.stringify(playAudioList)}`);
  if(playAudioList==undefined || playAudioList.length==0) return
  let i = playAudioList.findIndex(a => {
    return a.audioChapterId === audioChapter.audioChapterId;
  });
  if (playAudioList.length <= ++i) i = 0;
  dispatch(`getAudioChapterByChapterId`,playAudioList[i].audioChapterId)
};

/** 播放上一章節 */
export const previousAudioChapter = ({ getters,state,dispatch }) => {
  console.log(`previousAudio`);
  let playAudioList = getters.playAudioList;
  let audioChapter = state.audioChapter;
  if(playAudioList==undefined || playAudioList.length==0) return
  let i = playAudioList.findIndex(a => {
    return a.audioChapterId === audioChapter.audioChapterId;
  });
  if (0 > --i) i = playAudioList.length - 1;
  dispatch(`getAudioChapterByChapterId`,playAudioList[i].audioChapterId)
};


export default {
  getChapterListByData,
  getAudioChapterByChapterId,
  setPlayerSize,
  sortChapterList,
  nextAudioChapter,
  previousAudioChapter,
};