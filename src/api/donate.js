/**
 * 立即捐款
 */
import request from "./request";
function wpDonateCard(data) {
  var params = {
    data: data,
  };
  return request({
    url: `wpDonateCard`,
    data: params,
    method: "post"
  });
}

export default {
  wpDonateCard
};
