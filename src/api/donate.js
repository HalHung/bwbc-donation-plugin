/**
 * 立即捐款
 */
import request from "./request";
function wpDonateCard(data) {
  data.is3D = true
  var params = {
    data: data,
  };
  return request({
    url: `wpDonateCard`,
    data: params,
    method: "post"
  });
}

function wpDonateCheck(data) {
  var params = {
    data: data,
  };
  return request({
    url: `wpDonateCheck`,
    data: params,
    method: "post"
  });
}

function wpDonateSquare(data) {
  var params = {
    data: data,
  };
  return request({
    url: `wpDonateSquare`,
    data: params,
    method: "post"
  });
}

function wpDonationData(donatxnNo) {
  return request({
    url: `wpDonationData?no=${donatxnNo}`,
    method: "get"
  });
}

export default {
  wpDonateCard,
  wpDonateCheck,
  wpDonateSquare,
  wpDonationData
};
