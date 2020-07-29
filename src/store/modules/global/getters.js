/* ============
 * Getters for the global module
 * ============
 *
 * The getters that are available on the
 * global module.
 */
 
export const user = (state) => {
    return state.user
  }
  export const playAudioList = (state) => {
    var type = state.sortType;
    // console.log(`playAudioList : ${JSON.stringify(state.chapterList)}`)
    if(type=="asc") return state.chapterList;
    else {
      let list =[]
      for(let i = state.chapterList.length-1;i >= 0;i--){
        list.push(state.chapterList[i]);
      }
      return list;
    }
  }

  export default {
    user,
    playAudioList
  }