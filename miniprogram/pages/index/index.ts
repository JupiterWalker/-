interface Message {
  type: "user" | "bot";
  text: string;
}

interface ChatPageData {
  inputMessage: string;
  messages: Message[];
  inputAreaBottom: number;
}


Page<ChatPageData>({
  data: {
    inputMessage: "",
    messages: [],
    inputAreaBottom: 0,
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
    const replacedInputMessage = this.data.inputMessage.replace(/\\n/g, '\n')
    const newMessage: Message = { type: "user", text: replacedInputMessage };
    this.setData({
      messages: [...this.data.messages, newMessage],
      inputMessage: "",
    });
    console.log(newMessage["text"])
    const reply_message = newMessage["text"] + " [已完成]"
    this.sendReply(reply_message);
    this.scrollToBottom();
  },

  sendReply: function (text: string) {
    const botReply: Message = { type: "bot", text: text };
    setTimeout(() => {
      this.setData({
        messages: [...this.data.messages, botReply],
      });
      this.scrollToBottom();
    }, 1000);
  },
  scrollToBottom: function () {
    wx.createSelectorQuery()
      .select(".messages")
      .boundingClientRect((rect) => {
        console.log(rect.height)
        wx.pageScrollTo({
          scrollTop: rect.height,
          duration: 300,
        });
      })
      .exec();
  },
  onFocus: function (e) {
    const {height} = e.detail;
    this.setData({
      inputAreaBottom: height,
    });
  },
  
  onBlur: function () {
    this.setData({
      inputAreaBottom: 0,
    });
  },
  
});
