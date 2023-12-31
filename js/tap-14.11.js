const chatMessagesDefault = [];

let chatMessages = [
  { msg: "Ai theo dõi?", typing: 1 },
  { msg: "Thanh đến chưa?", typing: 1 },
  { msg: "Khi nào có thể cho Hoàng liều tiếp theo được?", typing: 1 },
  { msg: "Vì lần mất kiểm soát vừa rồi?" },
  { msg: "Dấu hiệu gì?" },
  { msg: "Cậu tăng liều lên cho Thanh đi!", typing: 1 },
  { msg: "OK" },
  { msg: "Để thử với Thanh trước", typing: 1 },
  { msg: "Với Hoàng sau" },
  { msg: "Một sự đột phá trong Tâm Thức", typing: 1 }
];


const chatModule = ChatModule.getInstance({
  chatMessagesDefault,
  chatMessages,
  notifications: [],
  showChatBox: true,
  chatTo: "GS Trọng",
  activeSender: '#gs_chat'
});
// Wait for the document to be fully loaded before adding the event listener
document.addEventListener('DOMContentLoaded', chatModule.onLoad);