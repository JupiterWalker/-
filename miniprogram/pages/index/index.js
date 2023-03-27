Page({
  data: {
    inputMessage: "",
    messages: [],
  },

  onInput: function (e) {
    this.setData({
      inputMessage: e.detail.value,
    });
  },

  onSendMessage: function () {
    if (!this.data.inputMessage.trim()) {
      return;
    }
    const newMessage = { type: "user", text: this.data.inputMessage };
    this.setData({
      messages: [...this.data.messages, newMessage],
      inputMessage: "",
    });

    this.sendReply("已完成");
  },

  sendReply: function (text) {
    const botReply = { type: "bot", text: text };
    setTimeout(() => {
      this.setData({
        messages: [...this.data.messages, botReply],
      });
    }, 1000);
  },
});
